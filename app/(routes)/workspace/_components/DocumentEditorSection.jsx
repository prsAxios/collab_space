"use client"
import React ,{ useState } from 'react';
import DocumentHeader from './DocumentHeader';
import DocumentBody from './DocumentBody';
import RichDocumentEditor from './RichDocumentEditor';
import { MessageCircle,X} from 'lucide-react';
import { Button } from '@/components/ui/button';
import CommentBox from './CommentBox';

function DocumentEditorSection({ params }) {
    const [openComment,setOpenComment] =  useState(false);
    return (
        <div className='relative'>
            {/* Header */}
            <DocumentHeader />

            {/* Document information */}
            <DocumentBody params={params} />

            {/* Rich Text Editor */}
            <RichDocumentEditor params={params} />

            <div className='fixed right-5 bottom-5'>
                <Button onClick={()=>setOpenComment(!openComment)}>
                    {openComment?<X/>:<MessageCircle/>}
                </Button>
                    {openComment&&<CommentBox/>}
            </div>
        </div>
    );
}

export default DocumentEditorSection;
