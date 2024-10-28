"use client";
import React,{ useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Loader2Icon, SmilePlus } from 'lucide-react'
import { Input } from "@/components/ui/input"
import CoverPicker from '@/app/_components/CoverPicker';
import EmojiPickerComponent from '@/app/_components/EmojiPicker';
import { useUser,useAuth } from '@clerk/nextjs';
import { setDoc,doc } from 'firebase/firestore';
import { db } from '@/config/firbaseConfig';
import {useRouter} from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';


function CreateWorkSpace() {
  const [coverImage,setCoverImage] = useState('/wall.png');
  const [workspaceName,setWorkspaceName] = useState('');
  const [emojiIcon,setEmojiIcon] = useState('');
  const [loading,setLoading]=useState(false);
  const {user} = useUser();
  const {orgId} = useAuth();
  const router = useRouter();



  /* we are using to create a new workspace and saving in database */
  const onCreateWorkspace=async()=>{
        setLoading(true);
        const workspaceId = Date.now();
            const result = await setDoc(doc(db,'Workspace',workspaceId.toString()),
        {
            workspaceName:workspaceName,
            emojiIcon:emojiIcon,
            coverImage:coverImage,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            id:workspaceId,
            orgId: orgId ? orgId : user?.primaryEmailAddress?.emailAddress
        });
        
        const docId = uuidv4();
        await setDoc(doc(db,'workspaceDocuments',docId.toString()),{
            workspaceId:workspaceId,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            coverImage:null,
            emojiIcon:null,
            id:docId,
            documentName:'untitiled document',
            documentOutput:[]
        })

        await setDoc(doc(db,'documentOutput',docId.toString()),{
          docId:docId,
          Output:[]
        });

        setLoading(false);
        router.replace('/workspace/'+workspaceId+'/'+docId);
        console.log("Data Inserted");
  }

  return (
    <div className='p-10 md:px-36 lg:px-64 xl:px-96 py-28'>
      <div className='shadow-2xl rounded-2xl'>
         {/*this is the cover image*/}
         <CoverPicker setNewCover={(v)=>setCoverImage(v)}>
         <div className='relative group cursor-pointer'>
        <h2 className='hidden absolute 
          p-4 w-full h-full
          items-center justify-center flex
            group-hover:flex
         '>Change Cover</h2>
        <div className='group-hover:opacity-40'>
          <Image className='w-full h-[180px] object-cover rounded-t-xl' 
          src={coverImage} width={500} height={500} 
          />
        </div>
        </div>
        </CoverPicker>
     

        {/*Input Section */}
        <div className='p-12'>
              <h2 className='font-medium text-xl' >Create a new workspace</h2>
              <h2 className='text-sm mt-2'>This is a shared space where you can collaborate with your team
                You can always rename it later.
              </h2>
              <div className='mt-8 flex gap-2 items-center'>
                <EmojiPickerComponent setEmojiIcon={(value)=>setEmojiIcon(value)}>
                  <Button variant='outline'>
                      {emojiIcon ? emojiIcon : <SmilePlus/> }
                  </Button>
                  </EmojiPickerComponent>
                  <Input placeholder='Workspace Name'
                    onChange={(e)=>{setWorkspaceName(e.target.value)}}
                  />
                 
              </div>

              <div className='mt-7 flex justify-end gap-2'>
                  <Button disabled={!workspaceName?.length||loading}
                    onClick={onCreateWorkspace}
                  >Create {loading && <Loader2Icon className='animate-spin ml-2'/>}</Button>
                  <Button variant='outline'>Cancel</Button>
              </div>
        </div>

        
      </div>

      
    </div>
  )
}

export default CreateWorkSpace