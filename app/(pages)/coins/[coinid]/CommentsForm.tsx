"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { db } from "../../../../firebase";

interface CommentsForm {
  coinid: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  commentInput: string;
  setCommentInput: React.Dispatch<React.SetStateAction<string>>;
  showCommentInput: boolean;
  setShowCommentInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentForm = ({
  coinid,
  setSortBy,
  commentInput,
  setCommentInput,
  showCommentInput,
  setShowCommentInput,
}: CommentsForm) => {
  const [currentLength, setCurrentLength] = useState(0);
  const { currentUser } = useAuth();
  const textareaRef = useRef<any>(null);

  useEffect(() => {
    if (showCommentInput) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [showCommentInput, commentInput]);

  const handleLength = (e: any) => {
    setCurrentLength(e.target.value.length);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!commentInput) return;
    if (commentInput.length > 240) return;
    try {
      await addDoc(collection(db, "comments", coinid, "messages"), {
        comment: commentInput,
        userId: currentUser?.uid,
        displayName: currentUser?.displayName,
        timestamp: serverTimestamp(),
        upvotes: 0,
      });
      setShowCommentInput(false);
    } catch (error) {
      console.log(error);
    }
    setCommentInput("");
    setSortBy("latest");
  };

  return (
    <div className="flex justify-between p-4 pb-1 md:p-10 md:pb-2">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="border-2 rounded-lg border-[#ECECEC] w-full"
      >
        <textarea
          placeholder="add comment here..."
          ref={textareaRef}
          onChange={(e) => {
            setCommentInput(e.target.value);
            handleLength(e);
          }}
          className="w-full h-auto resize-none outline-none py-[25px] px-4 xs:px-8 rounded-xl"
        ></textarea>
        <div className="flex items-center justify-between mb-3 mx-4 xs:mx-8">
          <span
            style={{
              color: commentInput.length > 240 ? "#b82619" : "black",
            }}
            className="text-[0.9rem]"
          >{`max: ${currentLength}/240`}</span>
          <button
            type="submit"
            className="bg-black px-6 py-2 rounded-md text-white"
          >
            comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
