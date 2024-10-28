import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from '@/components/ui/button'

function DocumentHeader(){
    return(
        <div className='flex items-center justify-between p-3 px-7 shadow-lg'>
        
            <OrganizationSwitcher/>

            <div className='flex gap-2'>
                <Button className='bg-green-400'>share</Button>
                <UserButton/>
            </div>
        </div>
    )
}

export default DocumentHeader