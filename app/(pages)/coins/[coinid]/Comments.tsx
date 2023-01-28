"use client";

import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { db } from "../../../../firebase";
import Comment from "./Comment";

const Comments = ({ coinid }: any) => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentLength, setCurrentLength] = useState(0);
  // const [nestedComments, setNestedComments] = useState<any[]>([]);
  // const [test, setTest] = useState(false);
  const { currentUser }: any = useAuth();
  const textareaRef = useRef<any>(null);

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

  // const getMovies = (commentId: any) => {
  //   setTest(true);
  //   getDocs(
  //     collection(db, "comments", coinid, "messages", commentId, "comments")
  //   )
  //     .then((res) => {
  //       const movs = res.docs.map((doc) => ({ data: doc.data(), id: doc.id }));
  //       setNestedComments(movs);
  //     })
  //     .catch((err) => console.log(err.message));
  // };

  // const handleViewMore = async (commentId: any) => {
  //   try {
  //     await addDoc(
  //       collection(db, "comments", coinid, "messages", commentId, "comments"),
  //       {
  //         comment: "waassupl",
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
        photoURL: currentUser?.photoURL,
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
          {/* <span className="flex items-center ml-12 font-medium">
            <span className="mr-1">latest</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3.5}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span> */}
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
              {/* <input
                type="text"
                value={commentInput}
                className="py-10 px-6 m-[2px] w-[99%]"
                onChange={(e) => setCommentInput(e.target.value)}
              /> */}
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
        <ul style={{ listStyle: "none" }} className="py-10">
          {[...comments]
            .sort((a: any, b: any) => {
              if (sortBy === "latest") {
                const currentDate: any = new Date();
                try {
                  const firstCommentDate: any = a?.data.timestamp.toDate();
                  const secondCommentDate: any = b?.data.timestamp.toDate();
                  const firstTimeDifference = currentDate - firstCommentDate;
                  const secondTimeDifference = currentDate - secondCommentDate;
                  return firstTimeDifference - secondTimeDifference;
                } catch (error) {
                  return 0 - 0;
                }
              } else {
                return b?.data.upvotes - a?.data.upvotes;
              }
            })
            .map((comment) => (
              <div key={comment.id}>
                <Comment comment={comment} coinid={coinid} />
              </div>
              // <li
              //   key={comment.id}
              //   style={{ border: "2px solid gray", marginBottom: "10px" }}
              // >
              //   {comment.data.userId}
              //   {comment.data.comment}
              //   <span className="text-red-200">{comment.data.id}</span>
              //   <button onClick={() => handleViewMore(comment.id)}>
              //     reply
              //   </button>
              //   <button className="ml-10" onClick={() => getMovies(comment.id)}>
              //     view all comments
              //   </button>
              //   {test && (
              //     <ul>
              //       {nestedComments.map((comment) => (
              //         <span key={comment.id}>hi{comment.data.comment}</span>
              //       ))}
              //     </ul>
              //   )}
              //   <span>{comment.id}</span>
              // </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Comments;
