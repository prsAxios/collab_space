"use client"
import React, { useEffect, useState } from 'react'
import Logo from '@/app/_components/Logo'
import { Bell, Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { onSnapshot, QuerySnapshot, query, collection, count } from 'firebase/firestore'
import { db } from '@/config/firbaseConfig'
import { where } from 'firebase/firestore'
import DocumentList from './DocumentList'
import { setDoc, doc } from 'firebase/firestore'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { Progress } from "@/components/ui/progress"
import { toast } from 'sonner'
import NotificationBox from './NotificationBox'

const Max_File = process.env.NEXT_PUBLIC_MAX_FILE_COUNT || 5;


function SideNav({ params }) {

    const [documentList, setDocumentList] = useState([]);
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
   
    useEffect(() => {
        params && GetDocumentList();
    }, [params])

    /*
        function used to get the document list
    */

    const GetDocumentList = () => {
        const q = query(collection(db, 'workspaceDocuments'),
            where('workspaceId', '==', Number(params?.workspaceid)));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setDocumentList([]);
            querySnapshot.forEach((doc) => {
                setDocumentList(documentList => [...documentList, doc.data()])
            })

        })
    }


    // Create New Document we will use this method
    const createNewDocument = async () => {

        if (documentList?.length >= Max_File) {
            toast("upgrade to add new file", {
                description: "you have reached max file",
                action: {
                    label: "Upgrade",
                    onClick: () => console.log("undo"),
                },
            });
            return;
        }

        setLoading(true);

        const docId = uuidv4();

        await setDoc(doc(db, 'workspaceDocuments', docId.toString()), {
            workspaceId: Number(params?.workspaceid),
            createdBy: user?.primaryEmailAddress?.emailAddress,
            coverImage: null,
            emojiIcon: null,
            id: docId,
            documentName: 'untitled Document',
            documentOutput: []
        })

        await setDoc(doc(db, 'documentOutput', docId.toString()), {
            docId: docId,
            output: []
        })

        setLoading(false);

        router.replace('/workspace/' + params?.workspaceid + '/' + docId);
    }

    return (
        <div className='h-screen fixed 
        md:w-72 
        hidden md:block
         bg-blue-50 p-5 shadow-2xl'>
            <div className='flex items-center justify-between'>
                <Logo />
                <NotificationBox> 
                <Bell className='h-5 w-5 text-gray-500' />
                </NotificationBox>
            </div>

            <hr className='my-5' />

            <div className='flex justify-between items-center'>
                <h2 className='font-medium'>Workspace Name</h2>
                {(documentList.length < 5) ?
                    <Button size='sm' onClick={createNewDocument}>
                        {loading ? <Loader2Icon className='h-4 w-4 animate-spin' /> : '+'}</Button> : ''}
            </div>



            {/* Document List */}
            <DocumentList documentList={documentList} params={params} />

            {/* progress bar */}
            <div className='absolute bottom-10 w-[80%] '>
                <Progress value={(documentList.length / 5) * 100} />
                <h2 className='text-sm text-center mt-2'><strong>{documentList.length}</strong>out of <strong>5</strong> files used</h2>
            </div>

        </div>
    )
}

export default SideNav