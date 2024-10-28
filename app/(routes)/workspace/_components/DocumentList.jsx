import React from 'react'
import { FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import DocumentOption from './DocumentsOption'
import { deleteDoc ,doc} from 'firebase/firestore';
import { db } from '@/config/firbaseConfig';
import { toast } from 'sonner';
import Image from 'next/image';

function DocumentList(props){
    const router = useRouter();

    const DeleteDocument=async (docId)=>{
        await deleteDoc(doc(db,"workspaceDocuments",docId));
        toast('Document deleted succesfully');
    }

    return(
        <div>
            {props.documentList.map((doc,index)=>(
                    <div key={index} onClick={()=>router.push('/workspace/'+props.params?.workspaceid+"/"+doc?.id)}
                    className={`mt-3 p-2 px-3 hover:bg-blue-200 
                        rounded-lg cursor-pointer shadow-xl flex justify-between items-center
                         ${doc.id==props.params?.documentid&&'bg-white'}`}>
                     
                    <div className='flex items-center justify-between'>
                        {!doc.emoji&& <FileText/> }
                        <h2 className='flex gap-2'>{doc?.emoji}{doc.documentName}</h2>  
                    </div>  

                    <DocumentOption doc={doc} deleteDocument={(docId)=>DeleteDocument(docId)}/>
                </div>
            ))}
        </div>
    )
}

export default DocumentList