"use client";

import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useMemo, useRef, useState } from "react";
import { useUserData } from "../../../../contexts/UserDataContext";
import { db } from "../../../../firebase";
import convertDate from "../../../../util/convertDate";
import sortTime from "../../../../util/sortTime";
import CommentBtns from "./CommentBtns";
import CommentForm from "./CommentForm";
import Reply from "./Reply";

const Comment = ({ coinid, comment }: { coinid: string; comment: any }) => {
  const [replies, setReplies] = useState<any[]>([]);

  const [replyValue, setReplyValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [commentDisplayName, setCommentDisplayName] = useState("unkown");

  const { handleNotificationClick, setHandleNotificationClick } = useUserData();
  const notiRef = useRef<any>();

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
  }, [coinid, comment.id]);

  useEffect(() => {
    if (replies.length > 0 && handleNotificationClick !== "") {
      const comments = notiRef?.current?.children;
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === handleNotificationClick) {
          comments[i].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          comments[i].classList.add("notification-highlight");
          const timer = setTimeout(() => {
            comments[i].classList.remove("notification-highlight");
            setHandleNotificationClick("");
          }, 2000);
          return () => {
            clearTimeout(timer);
          };
        }
      }
    }
  }, [handleNotificationClick, setHandleNotificationClick, replies]);

  const sortedReplies = useMemo(() => {
    return [...replies].sort((a, b) => sortTime(a, b, true));
  }, [replies]);

  useEffect(() => {
    const userRef = doc(db, "users", comment.data.userId);
    const unsubscribe = onSnapshot(userRef, (user) => {
      if (user.exists()) {
        setCurrentImage(user.data().currentPhotoURL);
        setCommentDisplayName(user.data().displayName);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [comment.data.userId]);

  return (
    <li id={comment.id} className="relative w-full p-6 last:mb-0">
      <div className="flex md:flex-col">
        <div className="md:absolute w-10 h-10">
          <picture>
            <img
              src={currentImage ? currentImage : "/Untitled (5).svg"}
              alt="profile image"
              className="w-full h-full object-cover rounded-full overflow-hidden"
            />
          </picture>
        </div>
        <div className="flex items-end md:items-start h-10 md:h-6 pl-2 md:pl-12">
          <span className="font-bold text-[0.9rem]">{commentDisplayName}</span>
          <span className="ml-2 text-[0.9rem] text-[#8C8C8C]">
            {comment.data.timestamp
              ? convertDate(comment?.data?.timestamp.toDate())
              : "0 sec ago"}
          </span>
        </div>
      </div>
      <div className="py-2 md:pl-12">
        <div className="max-w-[900px]">{comment?.data.comment}</div>
      </div>
      <div className="md:pl-12">
        <CommentBtns
          coinid={coinid}
          comment={comment}
          replies={replies}
          showInput={showInput}
          setShowInput={setShowInput}
        />
      </div>
      {showInput && (
        <CommentForm
          coinid={coinid}
          comment={comment}
          showInput={showInput}
          setShowInput={setShowInput}
          replyValue={replyValue}
          setReplyValue={setReplyValue}
        />
      )}
      <div>
        <ul className="mt-3" ref={notiRef}>
          {sortedReplies.map((reply) => (
            <Reply
              key={reply.id}
              coinid={coinid}
              comment={comment}
              reply={reply}
            />
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Comment;
