"use client";

import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";

const Reply = ({ reply, handleAltReplyClick }: any) => {
  const [commentDisplayName, setCommentDisplayName] = useState("unkown");

  useEffect(() => {
    const coinRef = doc(db, "users", reply.data.userId);

    const unsubscribe = onSnapshot(coinRef, (coin) => {
      if (coin.exists()) {
        setCommentDisplayName(coin.data().displayName);
      } else {
        console.log("No items in watchlist");
      }
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <li id={reply.id} className="text-slate-600 border-2">
      <span className="font-bold">{commentDisplayName}</span>
      <span className="ml-4">{reply.data.reply}</span>
      <button
        className="ml-6"
        onClick={() =>
          handleAltReplyClick(reply.data.userId, commentDisplayName)
        }
      >
        reply
      </button>
    </li>
  );
};

export default Reply;
