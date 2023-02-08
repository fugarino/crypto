"use client";

import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useFavoriteCoins } from "../../../../contexts/FavoritesContext";
import { db } from "../../../../firebase";
import Comment from "./Comment";

const Comments = ({ coinid }: any) => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentLength, setCurrentLength] = useState(0);
  const { trendingComment, setTrendingComment }: any = useFavoriteCoins();
  // const [nestedComments, setNestedComments] = useState<any[]>([]);
  // const [test, setTest] = useState(false);
  const { currentUser }: any = useAuth();
  const textareaRef = useRef<any>(null);
  const commentRef = useRef<any>();

  useEffect(() => {
    if (comments.length > 0 && trendingComment !== "") {
      const comments = commentRef?.current?.children;
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === trendingComment) {
          comments[i].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          comments[i].classList.add("hioo");
          const timer = setTimeout(() => {
            comments[i].classList.remove("hioo");
            setTrendingComment("");
          }, 2000);
          return () => {
            clearTimeout(timer);
          };
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trendingComment, comments]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "comments", coinid, "messages"),
      (snapshot) => {
        setComments(
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
    if (showCommentInput) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [currentValue, showCommentInput]);

  const handleLength = (e: any) => {
    setCurrentLength(e.target.value.length);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!commentInput) return;
    try {
      await addDoc(collection(db, "comments", coinid, "messages"), {
        comment: commentInput,
        userId: currentUser?.uid,
        displayName: currentUser?.displayName,
        timestamp: serverTimestamp(),
        upvotes: 0,
      });
      setShowCommentInput(false);
    } catch (error) {
      console.log(error);
    }
    setCommentInput("");
  };

  return (
    <section className="my-10">
      <div className="flex items-center justify-between px-4">
        <h3 className="font-bold text-[1.4rem]">Comments</h3>
        <div className="flex relative top-[2px]">
          <span className="text-[#75757B]">
            How are you feeling about{" "}
            <span className="font-bold">{coinid}</span> today?
          </span>
          <button
            className="ml-4 font-bold"
            onClick={() => setShowCommentInput(true)}
          >
            add a comment
          </button>
          <select
            name="sort"
            id="sort-comments"
            className="ml-12 font-medium bg-inherit outline-none cursor-pointer"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="latest">latest</option>
            <option value="top">top</option>
          </select>
        </div>
      </div>
      <div className="bg-white min-h-[30rem] mt-1 rounded-lg shadow-md">
        {showCommentInput && (
          <div className="flex justify-between p-10 pb-0">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="border-2 rounded-lg border-[#ECECEC] w-[80%]"
            >
              <textarea
                placeholder="add comment here..."
                ref={textareaRef}
                onChange={(e) => {
                  setCommentInput(e.target.value);
                  setCurrentValue(e.target.value);
                  handleLength(e);
                }}
                className="w-full h-auto resize-none outline-none py-[25px] px-8 rounded-xl"
              ></textarea>
              <div className="flex items-center justify-between mb-3 mx-8">
                <span className="text-[0.9rem]">{`max: ${currentLength}/240`}</span>
                <button
                  type="submit"
                  className="bg-black px-6 py-2 rounded-md text-white"
                >
                  comment
                </button>
              </div>
            </form>
            <button
              className="flex font-bold"
              onClick={() => setShowCommentInput(false)}
            >
              cancel
            </button>
          </div>
        )}
        <ul ref={commentRef} style={{ listStyle: "none" }} className="py-10">
          {comments.length > 0 &&
            comments
              .sort((a: any, b: any) => {
                if (sortBy === "latest") {
                  const currentDate: any = new Date();
                  try {
                    const firstCommentDate: any = a?.data.timestamp.toDate();
                    const secondCommentDate: any = b?.data.timestamp.toDate();
                    const firstTimeDifference = currentDate - firstCommentDate;
                    const secondTimeDifference =
                      currentDate - secondCommentDate;
                    return firstTimeDifference - secondTimeDifference;
                  } catch (error) {
                    return 0 - 0;
                  }
                } else {
                  return b?.data.upvotes - a?.data.upvotes;
                }
              })
              .map((comment) => (
                <Comment key={comment.id} comment={comment} coinid={coinid} />
              ))}
        </ul>
      </div>
    </section>
  );
};

export default Comments;
