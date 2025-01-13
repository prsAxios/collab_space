"use client";
import CoverPicker from "@/app/_components/CoverPicker";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SmilePlus } from "lucide-react";
import EmojiPickerComponent from "@/app/_components/EmojiPicker";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firbaseConfig";
import { toast } from "sonner";

function DocumentBody({ params }) {
  const [coverImage, setCoverImage] = useState("/wall.png");
  const [emojiIcon, setEmojiIcon] = useState();
  const [documentInfo, setDocumentInfo] = useState();

  useEffect(() => {
    params && GetDocumentInfo();
  }, [params]);

  const GetDocumentInfo = async () => {
    const docRef = doc(db, "workspaceDocuments", params?.documentid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDocumentInfo(docSnap.data());
      setEmojiIcon(docSnap.data()?.emoji);
      setCoverImage(docSnap.data()?.coverImage || "/wall.png");
    } else {
      console.log("No such document");
    }
  };

  const updateDocumentInfo = async (key, value) => {
    const docRef = doc(db, "workspaceDocuments", params?.documentid);
    try {
      await updateDoc(docRef, {
        [key]: value,
      });
      toast("Document Updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  if (!documentInfo) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div>
      {/* Cover */}
      <CoverPicker
        setNewCover={(cover) => {
          setCoverImage(cover);
          updateDocumentInfo("coverImage", cover);
        }}
      >
        <div className="relative group cursor-pointer">
          <h2 className="hidden absolute p-4 w-full h-full items-center justify-center group-hover:flex">
            Change Cover
          </h2>
          <div className="group-hover:opacity-40">
            <Image
              className="w-full h-[200px] object-cover rounded-t-xl"
              src={coverImage}
              width={500}
              height={500}
              alt="cover image"
            />
          </div>
        </div>
      </CoverPicker>

      {/* Emoji Picker */}
      <div className="absolute ml-10 mt-[-25px] cursor-pointer">
        <EmojiPickerComponent
          setEmojiIcon={(value) => {
            setEmojiIcon(value);
            updateDocumentInfo("emoji", value);
          }}
        >
          <div>
            {emojiIcon ? (
              <span className="text-5xl">{emojiIcon}</span>
            ) : (
              <SmilePlus className="h-10 w-10 text-green-300" />
            )}
          </div>
        </EmojiPickerComponent>
      </div>

      {/* File Name */}
      <div className="mt-10 p-10">
        <input
          className="text-4xl font-bold outline-none"
          type="text"
          placeholder="Untitled Document"
          defaultValue={documentInfo?.documentName} // Controlled input
          onChange={(event) => {
            const newValue = event.target.value;
            setDocumentInfo((prev) => ({ ...prev, documentName: newValue }));
            updateDocumentInfo("documentName", newValue);
          }}
        />
      </div>
    </div>
  );
}

export default DocumentBody;
