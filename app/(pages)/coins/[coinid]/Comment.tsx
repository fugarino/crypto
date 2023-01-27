"use client";

import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { db } from "../../../../firebase";
import convertDate from "../../../../util/convertDate";
import Reply from "./Reply";

const Comment = ({ coinid, comment }: any) => {
  const [showInput, setShowInput] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  // const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<any[]>([]);
  const { currentUser }: any = useAuth();
  const notiRef = useRef<any>();
  const searchParams = useSearchParams();

  useEffect(() => {
    const comments = notiRef.current.children;
    if (replies.length > 0) {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === searchParams.get("id")) {
          comments[i].scrollIntoView({ behavior: "smooth" });
          comments[i].classList.add("hioo");
          const timer = setTimeout(
            () => comments[i].classList.remove("hioo"),
            2000
          );
          return () => {
            clearTimeout(timer);
          };
        }
      }
    }
  }, [searchParams, replies]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // const handleClick = () => {
  //   setShowReplies((prevState) => !prevState);
  // };

  const handleReply = async (e: any) => {
    e.preventDefault();
    if (!replyValue) return;
    try {
      const { id } = await addDoc(
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
          comment: id,
          coin: coinid,
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
      className="mx-10"
      style={{ border: "2px solid gray", marginBottom: "10px" }}
    >
      <div>
        <div className="flex items-center">
          <div className="w-7 h-7 rounded-full overflow-hidden">
            <picture>
              <img src={comment.data.photoURL} alt="profile image" />
            </picture>
          </div>
          <span className="font-bold ml-2">{comment.data.displayName}</span>
          <span className="ml-2 text-[0.9rem] text-[#8C8C8C]">
            {convertDate(comment.data.timestamp.toDate())}
          </span>
        </div>
        <div className="text-slate-600 mt-1">{comment.data.comment}</div>
      </div>
      {/* <button onClick={handleClick}>view replies</button> */}
      <span
        className="ml-10 cursor-pointer"
        onClick={() => {
          // setShowReplies(true);
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
      {/* <ul ref={notiRef}>
        <li id="2uCNoKszkF9ouhLUHS2X">hiiii</li>
      </ul> */}
      <ul className="ml-10" ref={notiRef}>
        {replies.map((comment) => (
          <Reply key={comment.id} comment={comment} />
        ))}
      </ul>
      {/* <span>{comment.id}</span> */}
    </li>
  );
};

export default Comment;
