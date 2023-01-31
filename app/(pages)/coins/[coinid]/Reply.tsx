"use client";

import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import convertDate from "../../../../util/convertDate";

const Reply = ({ reply, handleAltReplyClick }: any) => {
  const [commentDisplayName, setCommentDisplayName] = useState("unkown");
  const [showAltInput, setShowAltInput] = useState(false);
  const [response, setResponse] = useState("");

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
      <span className="ml-4">
        {reply.data.timestamp
          ? convertDate(reply.data.timestamp.toDate())
          : "0 sec ago"}
      </span>
      <button className="ml-6" onClick={() => setShowAltInput(true)}>
        reply
      </button>
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
        >
          <input
            type="text"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
          <button type="submit">add</button>
        </form>
      )}
    </li>
  );
};

export default Reply;
