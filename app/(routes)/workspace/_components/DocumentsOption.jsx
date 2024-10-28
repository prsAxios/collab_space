import { MoreVertical, PenBox, Trash2Icon } from 'lucide-react'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Link2Icon}  from 'lucide-react'
  

function DocumentOption({doc,deleteDocument}){
    return(
        <div>
                <DropdownMenu >
                    <DropdownMenuTrigger><MoreVertical/></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>settings</DropdownMenuLabel>
                             <DropdownMenuSeparator />
                            <DropdownMenuItem className='flex gap-2'><Link2Icon className='w-5 h-5'/>Share Link</DropdownMenuItem>
                            <DropdownMenuItem className='flex gap-2'><PenBox  className='w-5 h-5 text-green-500'/>Rename</DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={()=>deleteDocument(doc?.id)}
                            className='flex gap-2'><Trash2Icon className='w-5 h-5 text-red-500'/>Delete</DropdownMenuItem>
                         </DropdownMenuContent>
                 </DropdownMenu>
        </div>


    )
}

export default DocumentOption