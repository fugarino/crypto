"use client";

import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { db } from "../../../../firebase";

const Comment = ({ coinid, comment }: any) => {
  const [showInput, setShowInput] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<any[]>([]);
  const { currentUser }: any = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "comments", coinid, "messages", comment.id, "comments"),
      (snapshot) => {
        setReplies(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // const getMovies = (commentId: any) => {
  //   setShowReplies(true);
  //   getDocs(
  //     collection(db, "comments", coinid, "messages", commentId, "comments")
  //   )
  //     .then((res) => {
  //       const movs = res.docs.map((doc) => ({ data: doc.data(), id: doc.id }));
  //       setReplies(movs);
  //     })
  //     .catch((err) => console.log(err.message));
  // };

  const handleClick = () => {
    setShowReplies((prevState) => !prevState);
    // if (!showReplies) getMovies(comment.id);
  };

  const handleReply = async (e: any) => {
    e.preventDefault();
    if (!replyValue) return;
    try {
      await addDoc(
        collection(db, "comments", coinid, "messages", comment.id, "comments"),
        {
          reply: replyValue,
          userId: currentUser?.uid,
          timestamp: serverTimestamp(),
        }
      );
      await addDoc(
        collection(db, "notifications", comment.data.userId, "notis"),
        {
          notification: `${currentUser?.uid} replied to your comment`,
          comment: comment.id,
          timestamp: serverTimestamp(),
        }
      );
      // await setDoc(doc(db, "notifications", comment.data.userId), {
      //   notifications: notifications
      //     ? [...notifications, "You got a noti"]
      //     : ["You got a noti"],
      // });
    } catch (error) {
      console.log(error);
    }
    setReplyValue("");
    setShowInput(false);
  };

  return (
    <li
      key={comment.id}
      style={{ border: "2px solid gray", marginBottom: "10px" }}
    >
      <div>
        <span className="font-bold">{comment.data.userId}</span>
        <span className="text-slate-600 ml-4">{comment.data.comment}</span>
      </div>
      <button onClick={handleClick}>view replies</button>
      <span
        className="ml-10 cursor-pointer"
        onClick={() => {
          setShowReplies(true);
          setShowInput(true);
        }}
      >
        reply
      </span>
      {showInput && (
        <form onSubmit={(e) => handleReply(e)}>
          <input
            type="text"
            placeholder="add reply.."
            value={replyValue}
            onChange={(e) => setReplyValue(e.target.value)}
          />
          <button type="submit">add reply</button>
        </form>
      )}
      {/* <button onClick={() => handleViewMore(comment.id)}>reply</button> */}
      {showReplies && (
        <ul>
          {replies.map((comment) => (
            <div key={comment.id} className="text-slate-600 border-2">
              <span className="font-bold">{comment.data.userId}</span>
              <span className="ml-4">{comment.data.reply}</span>
            </div>
          ))}
        </ul>
      )}
      {/* <span>{comment.id}</span> */}
    </li>
  );
};

export default Comment;
