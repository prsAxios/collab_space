"use client"
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { LayoutGrid, AlignLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import WorkspaceItemList from './WorkspaceItemList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firbaseConfig';


function CollabSpace() {
    const { user } = useUser();
    const { orgId } = useAuth();
    const [workSpaceList, setWorkSpaceList] = useState([]);

    // if(!user){
    //     return <div>Loading...</div>
    // }    

    useEffect(() => {
        user && getWorkspaceList()
    }, [orgId, user])

    const getWorkspaceList = async () => {
        const q = query(collection(db, 'Workspace'), where('orgId', '==', orgId ? orgId : user?.primaryEmailAddress?.emailAddress))
        const querySnapshot = await getDocs(q);
        setWorkSpaceList([]);
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            setWorkSpaceList(prev => [...prev, doc.data()])
        });
    };

    return (
        <div className='my-10 p-10 md:px-24 lg:px-36 xl:px-52'>


            <div className='flex justify-between'>
                <h2 className='font-semibold'>Hello, {user?.fullName}</h2>
                <Link href={'/CreateWorkSpace'}>
                    <Button className='bg-green-400'>+</Button>
                </Link>
            </div>


            <div className='mt-10 flex justify-between'>
                <div>
                    <h2 className='font-medium text-purple-700'>CollabSpaces</h2>
                </div>
                <div className='flex gap-2'>
                    <LayoutGrid />
                    <AlignLeft />
                </div>
            </div>

            {workSpaceList?.length == 0
                ?
                <div className='flex flex-col justify-center items-center my-10'>
                    <Image src={'/logo.png'} width={200} height={200} alt='work logo' />
                    <h2>Create a new workspace</h2>
                    <Link href={'/CreateWorkSpace'}>
                        <Button variant="outline" className="my-3">Add new workspace</Button>
                    </Link>
                </div>
                :
                <div>
                    <WorkspaceItemList workSpaceItemList={workSpaceList} />
                </div>

            }

        </div>
    )
}

export default CollabSpace