"use client";

import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { db } from "../../../../firebase";
import convertDate from "../../../../util/convertDate";

const Reply = ({ reply, handleAltReplyClick }: any) => {
  const [commentDisplayName, setCommentDisplayName] = useState("unkown");
  const [showAltInput, setShowAltInput] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const { currentUser }: any = useAuth();
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

  useEffect(() => {
    const coinRef = doc(db, "users", reply.data.userId);

    const unsubscribe = onSnapshot(coinRef, (coin) => {
      if (coin.exists()) {
        setCurrentImage(coin.data().currentPhotoURL);
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
    <li id={reply.id} className="mb-6 flex">
      <div className="mt-[3px]">
        <picture>
          <img
            src={
              currentImage
                ? currentImage
                : reply.data.userId === currentUser.uid
                ? currentUser.photoURL
                : "/Untitled (5).svg"
            }
            alt="profile image"
            className="w-8 h-8 object-cover rounded-full overflow-hidden"
          />
        </picture>
      </div>
      <div className="ml-3">
        <div>
          <div>
            <span className="font-bold">{commentDisplayName}</span>
            <span className="ml-2 text-[0.9rem] text-[#8C8C8C]">
              {reply.data.timestamp
                ? convertDate(reply.data.timestamp.toDate())
                : "0 sec ago"}
            </span>
          </div>
          <div>
            <span className="text-slate-600">{reply.data.reply}</span>
          </div>
        </div>
        <button onClick={() => setShowAltInput(true)}>reply</button>
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
