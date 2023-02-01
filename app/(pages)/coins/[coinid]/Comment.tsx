"use client";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
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
  const [replies, setReplies] = useState<any[]>([]);
  const [repliesLength, setRepliesLength] = useState(0);
  const [currentImage, setCurrentImage] = useState("");
  const [commentDisplayName, setCommentDisplayName] = useState("unkown");
  const { currentUser }: any = useAuth();
  const notiRef = useRef<any>();
  const searchParams = useSearchParams();

  // const storage = getStorage();
  // const spaceRef = ref(storage, comment.userId);

  // getDownloadURL(spaceRef)
  //   .then((url) => {
  //     setCurrentImage(url);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

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
    <li
      key={comment.id}
      className="mx-10"
      style={{ border: "2px solid gray", marginBottom: "10px" }}
    >
      <div>
        <div className="flex items-center">
          <div className="rounded-full overflow-hidden">
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
                className="w-7 h-7 object-cover"
              />
            </picture>
          </div>
          <span className="font-bold ml-2">{commentDisplayName}</span>
          <span className="ml-2 text-[0.9rem] text-[#8C8C8C]">
            {comment.data.timestamp
              ? convertDate(comment?.data?.timestamp.toDate())
              : "0 sec ago"}
          </span>
        </div>
        <div className="text-slate-600 mt-1">{comment?.data.comment}</div>
        <div>
          <button
            className="mr-2"
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
          <span>{comment?.data.upvotes}</span>
          <button
            className="ml-2"
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
          <span className="ml-6 inline-flex items-center justify-center">
            <span>{`replies (${repliesLength})`}</span>
          </span>
          <button
            className="ml-10 cursor-pointer"
            onClick={() => {
              // setShowReplies(true);
              setShowInput(true);
            }}
          >
            reply
          </button>
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
      <ul className="ml-10" ref={notiRef}>
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
