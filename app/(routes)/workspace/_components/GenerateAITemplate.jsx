import React, { useState } from 'react'
import { LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { chatSession } from '@/config/GoogleAIModel';
import { Loader2 } from 'lucide-react';


function GenerateAITemplate({setGenerateAIOutput}) {
    const [userInput,setUserInput] = useState();
    const [loading,setLoading] = useState(false);
    const [open,setOpen] = useState(false);


    const GenerateFromAI=async ()=>{
        setLoading(true);
        const PROMPT='Generate template for editor.js in JSON for'+userInput
    const result = await chatSession.sendMessage(PROMPT);
    console.log(result.response.text());
    try{
        const output=JSON.parse(result.response.text());
        setGenerateAIOutput(output)
    }catch(err){
        console.log(err);
        setLoading(false);
    }
    setLoading(false);
    setOpen(false);
    }
    return (
        <div>
                
    <Button variant='outline' className='flex gap-2'
    onClick={()=>setOpen(true)}>
                <LayoutGrid />Generate AI Template</Button>
            <Dialog open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Generate AI Template</DialogTitle>
                        <DialogDescription>
                            <label>what you want to write in document?</label>
                            <Input placeholder="Ex. Project Idea" 
                                onChange={(event)=>setUserInput(event?.target.value)}
                            />
                            <div className='mt-5 flex gap-2 justify-end'>
                                <Button variant='ghost' onClick={()=>setOpen(false)}>Cancel</Button>
                                <Button variant='' 
                                disabled={!userInput || loading}
                                onClick={()=>GenerateFromAI()}>
                                    {loading?<Loader2 className='animate-spin'/>:'Generate'}</Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default GenerateAITemplate