"use client";

import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useUserData } from "../../../../contexts/UserDataContext";
import { db } from "../../../../firebase";
import sortTime from "../../../../util/sortTime";
import Comment from "./Comment";
import CommentsForm from "./CommentsForm";
import CommentsHeader from "./CommentsHeader";

const Comments = ({ coinid }: { coinid: string }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("top");

  const [commentInput, setCommentInput] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [loading, setLoading] = useState(true);

  const { trendingComment, setTrendingComment } = useUserData();
  const { currentUser } = useAuth();
  const commentRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "comments", coinid, "messages"),
      (snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
        setLoading(false);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [coinid]);

  useEffect(() => {
    if (comments.length > 0 && trendingComment !== "") {
      const comments = commentRef?.current?.children;
      for (let i = 0; i < comments!.length; i++) {
        if (comments![i].id === trendingComment) {
          comments![i].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          comments![i].classList.add("notification-highlight");
          const timer = setTimeout(() => {
            comments![i].classList.remove("notification-highlight");
            setTrendingComment("");
          }, 2000);
          return () => {
            clearTimeout(timer);
          };
        }
      }
    }
  }, [trendingComment, setTrendingComment, comments]);

  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) =>
      sortBy === "latest" ? sortTime(a, b) : b.data.upvotes - a.data.upvotes
    );
  }, [comments, sortBy]);

  const showInput = async () => {
    if (!currentUser) {
      router.push("/signin");
    } else {
      setShowCommentInput(true);
      if (currentUser.emailVerified) return;
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, {
        displayName: currentUser.displayName,
      });
    }
  };

  return (
    <section className="mb-4 xs:my-10 mt-14 md:mt-10">
      <CommentsHeader
        coinid={coinid}
        showInput={showInput}
        setSortBy={setSortBy}
        showCommentInput={showCommentInput}
        setShowCommentInput={setShowCommentInput}
      />
      <div className="bg-white overflow-hidden min-h-[20rem] xs:min-h-[30rem] mt-1 rounded-lg shadow-md">
        {showCommentInput && (
          <CommentsForm
            coinid={coinid}
            setSortBy={setSortBy}
            commentInput={commentInput}
            setCommentInput={setCommentInput}
            showCommentInput={showCommentInput}
            setShowCommentInput={setShowCommentInput}
          />
        )}
        <ul
          ref={commentRef}
          style={{ listStyle: "none" }}
          className="md:p-4 md:py-6"
        >
          {!loading && (
            <>
              {comments.length > 0 ? (
                sortedComments.map((comment) => (
                  <Comment key={comment.id} comment={comment} coinid={coinid} />
                ))
              ) : (
                <div className="w-full h-[20rem] xs:h-[30rem] flex flex-col justify-center items-center">
                  <h3 className="font-semibold text-[1.3rem] xs:text-[1.5rem] leading-[18px] xs:leading-5">
                    No comments yet.
                  </h3>
                  <p className="font-light text-[0.9rem] xs:text-[1rem]">
                    Be the first to comment.
                  </p>
                </div>
              )}
            </>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Comments;
