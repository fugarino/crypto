"use client";

import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { db } from "../../../../firebase";

interface ICommentBtns {
  coinid: string;
  comment: any;
  replies: any[];
  showInput: boolean;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentBtns = ({
  coinid,
  comment,
  replies,
  showInput,
  setShowInput,
}: ICommentBtns) => {
  const [repliesLength, setRepliesLength] = useState(0);
  const [userLikeStatus, setUserLikeStatus] = useState("");
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setRepliesLength(replies.length);
  }, [replies]);

  useEffect(() => {
    if (currentUser) {
      const docRef = doc(
        db,
        "comments",
        coinid,
        "messages",
        comment.id,
        "upvotes",
        currentUser.uid
      );
      const unsubscribe = onSnapshot(docRef, (coin) => {
        if (coin.exists()) {
          setUserLikeStatus(coin.data().upvote);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [coinid, comment.id, currentUser]);

  const handleUpvote = async (prevUpvotes: number, id: string) => {
    try {
      // testing
      if (currentUser) {
        const docRef = doc(db, "comments", coinid, "messages", id);
        await updateDoc(docRef, {
          upvotes:
            userLikeStatus === ""
              ? prevUpvotes + 1
              : userLikeStatus === "downvoted"
              ? prevUpvotes + 2
              : prevUpvotes - 1,
        });

        const upvoteDocRef = doc(
          db,
          "comments",
          coinid,
          "messages",
          comment.id,
          "upvotes",
          currentUser.uid
        );
        await setDoc(upvoteDocRef, {
          upvote:
            userLikeStatus === "" || userLikeStatus === "downvoted"
              ? "upvoted"
              : "",
        });

        // trending comment
        const altDocRef = doc(db, "trending", id);
        const docSnap = await getDoc(altDocRef);
        if (docSnap.exists()) {
          setDoc(altDocRef, {
            upvotes:
              userLikeStatus === ""
                ? docSnap.data().upvotes + 1
                : userLikeStatus === "upvoted"
                ? docSnap.data().upvotes - 1
                : docSnap.data().upvotes + 2,
            coin: coinid,
            commentId: id,
          });
        } else {
          setDoc(altDocRef, {
            upvotes:
              userLikeStatus === "" ? 1 : userLikeStatus === "upvoted" ? -1 : 2,
            coin: coinid,
            commentId: id,
          });
        }
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownvote = async (prevUpvotes: number, id: string) => {
    try {
      if (currentUser) {
        const docRef = doc(db, "comments", coinid, "messages", id);
        await updateDoc(docRef, {
          upvotes:
            userLikeStatus === ""
              ? prevUpvotes - 1
              : userLikeStatus === "upvoted"
              ? prevUpvotes - 2
              : prevUpvotes + 1,
        });

        const downVoteDocRef = doc(
          db,
          "comments",
          coinid,
          "messages",
          comment.id,
          "upvotes",
          currentUser.uid
        );
        await setDoc(downVoteDocRef, {
          upvote:
            userLikeStatus === "" || userLikeStatus === "upvoted"
              ? "downvoted"
              : "",
        });

        // trending comment
        const altDocRef = doc(db, "trending", id);
        const docSnap = await getDoc(altDocRef);
        if (docSnap.exists()) {
          setDoc(altDocRef, {
            upvotes:
              userLikeStatus === ""
                ? docSnap.data().upvotes - 1
                : userLikeStatus === "upvoted"
                ? docSnap.data().upvotes - 2
                : docSnap.data().upvotes + 1,
            coin: coinid,
            commentId: id,
          });
        } else {
          setDoc(altDocRef, {
            upvotes:
              userLikeStatus === "" ? 1 : userLikeStatus === "upvoted" ? -1 : 2,
            coin: coinid,
            commentId: id,
          });
        }
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showInputField = async () => {
    if (!currentUser) {
      router.push("/signin");
    } else {
      if (showInput) {
        setShowInput(false);
      } else {
        setShowInput(true);
        if (currentUser.emailVerified) return;
        const docRef = doc(db, "users", currentUser.uid);
        await updateDoc(docRef, {
          displayName: currentUser.displayName,
        });
      }
    }
  };

  return (
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
          style={{
            color: userLikeStatus === "upvoted" ? "#000" : "#8C8C8C",
          }}
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
          style={{
            color: userLikeStatus === "downvoted" ? "#000" : "#8C8C8C",
          }}
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
        onClick={showInputField}
      >
        {!showInput ? "reply" : "cancel"}
      </button>
    </div>
  );
};

export default CommentBtns;
