"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'



function WorkspaceItemList({ workSpaceItemList }) {

    const router = useRouter();
    const OnClickWorkspaceItem = (workspaceid) => {
        router.push('/workspace/' + workspaceid);
    }

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {workSpaceItemList &&
                workSpaceItemList.map((item, index) => (
                    <div key={index} className='p-2 shadow-xl rounded-xl m-1 hover:scale-105 transition-all cursor-pointer'
                        onClick={() => OnClickWorkspaceItem(item.id)}
                        >
                        <Image src={item?.coverImage}
                            width={400} height={200} alt='coverimage'
                            className='h-[150px] object-cover rounded-t-xl'
                        />
                        <div className='p-4 rounded-b-xl'>
                            <h2 className='flex gap-2'>
                                {item?.emojiIcon}{item?.workspaceName}</h2>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default WorkspaceItemList