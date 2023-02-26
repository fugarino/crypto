"use client";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { db } from "../../../../firebase";
import convertDate from "../../../../util/convertDate";

const Reply = ({
  coinid,
  comment,
  reply,
}: {
  coinid: string;
  comment: any;
  reply: any;
}) => {
  const [commentDisplayName, setCommentDisplayName] = useState("unkown");
  const [showAltInput, setShowAltInput] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentLength, setCurrentLength] = useState(0);
  const { currentUser }: any = useAuth();
  const [response, setResponse] = useState("");
  const textareaRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    const coinRef = doc(db, "users", reply.data.userId);

    const unsubscribe = onSnapshot(coinRef, (coin) => {
      if (coin.exists()) {
        setCommentDisplayName(coin.data().displayName);
        setCurrentImage(coin.data().currentPhotoURL);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [reply.data.userId]);

  useEffect(() => {
    if (showAltInput) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [showAltInput, response]);

  const handleAltReplyClick = async (
    userId: string,
    name: string,
    response: string
  ) => {
    try {
      const { id } = await addDoc(
        collection(db, "comments", coinid, "messages", comment.id, "comments"),
        {
          at: name,
          reply: response,
          userId: currentUser?.uid,
          displayName: currentUser.displayName,
          timestamp: serverTimestamp(),
        }
      );
      await addDoc(collection(db, "users", userId, "notifications"), {
        notification: `${currentUser?.displayName} replied to your comment`,
        comment: id,
        coin: coinid,
        userId: userId,
        read: false,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLength = (e: any) => {
    setCurrentLength(e.target.value.length);
  };

  const showInputField = async () => {
    if (!currentUser) {
      router.push("/signin");
    } else {
      if (showAltInput) {
        setShowAltInput(false);
      } else {
        setShowAltInput(true);
        if (currentUser.emailVerified) return;
        const docRef = doc(db, "users", currentUser.uid);
        await updateDoc(docRef, {
          displayName: currentUser.displayName,
        });
      }
    }
  };

  return (
    <li
      id={reply.id}
      className="px-4 sm:px-[2.85rem] py-1 relative w-full mb-2 last:mb-0"
    >
      <div className="flex md:flex-col">
        <div className="md:absolute w-8 h-8">
          <picture>
            <img
              src={currentImage ? currentImage : "/Untitled (5).svg"}
              alt="profile image"
              className="w-full h-full object-cover rounded-full overflow-hidden"
            />
          </picture>
        </div>
        <div className="flex items-end md:items-start h-8 md:h-6 pl-2 md:pl-[2.6rem]">
          <span className="font-bold text-[0.85rem]">{commentDisplayName}</span>
          <span className="ml-2 text-[0.85rem] text-[#8C8C8C]">
            {reply.data.timestamp
              ? convertDate(reply?.data?.timestamp.toDate())
              : "0 sec ago"}
          </span>
        </div>
      </div>
      <div className="text-[0.95rem] pt-[4px] pb-0 md:py-0 md:pl-10 max-w-[950px]">
        <span className="font-semibold">
          {reply.data.at && `@${reply.data.at} `}
        </span>
        <span className="text-black">{reply.data.reply}</span>
      </div>
      <div className="md:pl-10">
        <button
          onClick={showInputField}
          className="text-[0.9rem] font-semibold"
        >
          {!showAltInput ? "reply" : "cancel"}
        </button>
      </div>
      {showAltInput && (
        <form
          onSubmit={() => {
            handleAltReplyClick(
              reply.data.userId,
              commentDisplayName,
              response
            );
            setShowAltInput(false);
          }}
          className="border-2 rounded-lg border-[#ECECEC] mt-2"
        >
          <textarea
            placeholder="add reply.."
            ref={textareaRef}
            onChange={(e) => {
              setResponse(e.target.value);
              handleLength(e);
            }}
            className="w-full h-auto resize-none outline-none py-[25px] px-4 xs:px-8 rounded-xl"
          />
          <div className="flex items-center justify-between mb-3 mx-4 xs:mx-8">
            <span
              style={{
                color: response.length > 240 ? "#b82619" : "black",
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
      )}
    </li>
  );
};

export default Reply;
