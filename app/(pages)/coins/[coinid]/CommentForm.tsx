"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { db } from "../../../../firebase";

interface ICommentForm {
  coinid: string;
  comment: any;
  showInput: boolean;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  replyValue: string;
  setReplyValue: React.Dispatch<React.SetStateAction<string>>;
}

const CommentForm = ({
  coinid,
  comment,
  showInput,
  setShowInput,
  replyValue,
  setReplyValue,
}: ICommentForm) => {
  const [currentLength, setCurrentLength] = useState(0);
  const textareaRef = useRef<any>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (showInput) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [replyValue, showInput]);

  const handleLength = (e: any) => {
    setCurrentLength(e.target.value.length);
  };

  const handleReply = async (e: any) => {
    e.preventDefault();
    if (!replyValue) return;
    try {
      const { id } = await addDoc(
        collection(db, "comments", coinid, "messages", comment.id, "comments"),
        {
          reply: replyValue,
          userId: currentUser?.uid,
          displayName: currentUser?.displayName,
          timestamp: serverTimestamp(),
        }
      );
      await addDoc(
        collection(db, "users", comment.data.userId, "notifications"),
        {
          notification: `${currentUser?.displayName} replied to your comment`,
          comment: id,
          coin: coinid,
          timestamp: serverTimestamp(),
          userId: comment.data.userId,
          read: false,
        }
      );
    } catch (error) {
      console.log(error);
    }
    setReplyValue("");
    setShowInput(false);
  };

  return (
    <form
      onSubmit={(e) => handleReply(e)}
      className="border-2 rounded-lg border-[#ECECEC] mt-2"
    >
      <textarea
        placeholder="add reply.."
        ref={textareaRef}
        onChange={(e) => {
          setReplyValue(e.target.value);
          handleLength(e);
        }}
        className="w-full h-auto resize-none outline-none py-[25px] px-4 xs:px-8 rounded-xl"
      />
      <div className="flex items-center justify-between mb-3 mx-4 xs:mx-8">
        <span
          style={{
            color: replyValue.length > 240 ? "#b82619" : "black",
          }}
          className="text-[0.9rem]"
        >{`max: ${currentLength}/240`}</span>
        <button
          type="submit"
          className="bg-black px-6 py-2 rounded-md text-white"
        >
          reply
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
