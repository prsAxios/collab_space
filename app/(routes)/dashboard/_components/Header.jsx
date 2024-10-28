"use client"
import React,{useEffect} from 'react'
import Logo from '@/app/_components/Logo'
import { OrganizationSwitcher, useAuth, UserButton, useUser } from '@clerk/nextjs'
import { setDoc, doc } from "firebase/firestore"; // Import Firestore functions
import { db } from "@/config/firbaseConfig";

function Header() {
    const { user } = useUser();

    useEffect(()=>{
        user && saveUserData();
    },[user]);


    // use to save user data
    const saveUserData = async () => {
        const docId = user?.primaryEmailAddress?.emailAddress
        try {
            await setDoc(doc(db, 'collabCaseUsers', docId), {
                name: user?.fullName,
                avatar: user?.imageUrl,
                email: user?.primaryEmailAddress?.emailAddress
            })
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className='flex justify-between items-center p-3 shadow-lg'>
            <Logo />
            <OrganizationSwitcher
                afterLeaveOrganizationUrl={'/dashboard'}
                afterCreateOrganizationUrl={'/dashboard'} />
            <UserButton />
        </div>
    )
}

export default Header