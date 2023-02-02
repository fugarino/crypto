"use client";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
// import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useFavoriteCoins } from "../../../../contexts/FavoritesContext";
import { db } from "../../../../firebase";
import convertDate from "../../../../util/convertDate";
import Reply from "./Reply";

const Comment = ({ coinid, comment }: any) => {
  const [showInput, setShowInput] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  const [replies, setReplies] = useState<any[]>([]);
  const [repliesLength, setRepliesLength] = useState(0);
  const [currentImage, setCurrentImage] = useState("");
  const [commentDisplayName, setCommentDisplayName] = useState("unkown");
  const { currentUser }: any = useAuth();
  const notiRef = useRef<any>();
  const { handleNotificationClick, setHandleNotificationClick }: any =
    useFavoriteCoins();
  // const searchParams = useSearchParams();

  useEffect(() => {
    if (replies.length > 0 && handleNotificationClick !== "") {
      const comments = notiRef?.current?.children;
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === handleNotificationClick) {
          comments[i].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          comments[i].classList.add("hioo");
          const timer = setTimeout(() => {
            comments[i].classList.remove("hioo");
            setHandleNotificationClick("");
          }, 2000);
          // setHandleNotificationClick("");
          return () => {
            clearTimeout(timer);
          };
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleNotificationClick, replies]);

  useEffect(() => {
    const coinRef = doc(db, "users", comment.data.userId);

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

  useEffect(() => {
    setRepliesLength(replies.length);
  }, [replies]);

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

  useEffect(() => {
    const coinRef = doc(db, "users", comment.data.userId);

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
          displayName: currentUser.displayName,
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

  const handleUpvote = async (prevUpvotes: number, id: string) => {
    try {
      const docRef = doc(db, "comments", coinid, "messages", id);
      await updateDoc(docRef, {
        upvotes: prevUpvotes + 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownvote = async (prevUpvotes: number, id: string) => {
    try {
      const docRef = doc(db, "comments", coinid, "messages", id);
      await updateDoc(docRef, {
        upvotes: prevUpvotes - 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAltReplyClick = async (
    userId: string,
    name: string,
    response: string
  ) => {
    try {
      const { id } = await addDoc(
        collection(db, "comments", coinid, "messages", comment.id, "comments"),
        {
          reply: `@${name} ${response}`,
          userId: currentUser?.uid,
          displayName: currentUser.displayName,
          timestamp: serverTimestamp(),
        }
      );
      await addDoc(collection(db, "users", userId, "notifications"), {
        notification: `${currentUser?.displayName} replied to your comment`,
        comment: id,
        coin: coinid,
        timestamp: serverTimestamp(),
      });
      // await setDoc(doc(db, "notifications", comment.data.userId), {
      //   notifications: notifications
      //     ? [...notifications, "You got a noti"]
      //     : ["You got a noti"],
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li key={comment.id} className="mx-10 mb-10">
      <div className="flex mb-6">
        <div className="mt-[2px]">
          <picture>
            <img
              src={
                currentImage
                  ? currentImage
                  : currentUser.photoURL
                  ? currentUser.photoURL
                  : "/Untitled (5).svg"
              }
              alt="profile image"
              className="w-10 h-10 object-cover rounded-full overflow-hidden"
            />
          </picture>
        </div>
        <div className="ml-3">
          <div>
            <span className="font-bold">{commentDisplayName}</span>
            <span className="ml-2 text-[0.9rem] text-[#8C8C8C]">
              {comment.data.timestamp
                ? convertDate(comment?.data?.timestamp.toDate())
                : "0 sec ago"}
            </span>
            <div className="text-slate-600 max-w-[750px]">
              {comment?.data.comment}
            </div>
          </div>
          <div>
            <button
              className="mr-1"
              onClick={() => handleUpvote(comment?.data.upvotes, comment?.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
            <span className="text-[0.9rem]">{comment?.data.upvotes}</span>
            <button
              className="ml-1"
              onClick={() => handleDownvote(comment?.data.upvotes, comment?.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <span className="ml-4 inline-flex items-center justify-center">
              <span className="text-[0.9rem] font-semibold">{`replies (${repliesLength})`}</span>
            </span>
            <button
              className="ml-6 cursor-pointer text-[0.9rem] font-semibold"
              onClick={() => {
                // setShowReplies(true);
                setShowInput(true);
              }}
            >
              reply
            </button>
          </div>
        </div>
      </div>
      {/* <button onClick={handleClick}>view replies</button> */}
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
      <ul className="ml-16 mt-3" ref={notiRef}>
        {[...replies]
          .sort((a, b) => {
            const currentDate: any = new Date();
            try {
              const firstCommentDate: any = a?.data.timestamp.toDate();
              const secondCommentDate: any = b?.data.timestamp.toDate();
              const firstTimeDifference = currentDate - firstCommentDate;
              const secondTimeDifference = currentDate - secondCommentDate;
              return secondTimeDifference - firstTimeDifference;
            } catch (error) {
              return 0 - 0;
            }
          })
          .map((reply) => (
            <Reply
              key={reply.id}
              reply={reply}
              handleAltReplyClick={handleAltReplyClick}
            />
          ))}
      </ul>
      {/* <span>{comment.id}</span> */}
    </li>
  );
};

export default Comment;
