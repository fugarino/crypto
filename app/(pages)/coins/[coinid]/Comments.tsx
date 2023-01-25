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
import Comment from "./Comment";

const Comments = ({ coinid }: any) => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  // const [nestedComments, setNestedComments] = useState<any[]>([]);
  // const [test, setTest] = useState(false);
  const { currentUser }: any = useAuth();

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!commentInput) return;
    try {
      await addDoc(collection(db, "comments", coinid, "messages"), {
        comment: commentInput,
        userId: currentUser?.uid,
        timestamp: serverTimestamp(),
      });
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
          <span className="flex items-center ml-10 font-bold">
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
          </span>
        </div>
      </div>
      <div className="bg-white h-[30rem] mt-1 rounded-lg shadow-md">
        {currentUser ? (
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button type="submit">add comment</button>
          </form>
        ) : (
          <div>log in / sign up</div>
        )}
        <ul style={{ listStyle: "none" }}>
          {comments
            .sort((a, b) => b.data.likes - a.data.likes)
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
