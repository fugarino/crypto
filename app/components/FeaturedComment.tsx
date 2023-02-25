"use client";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { db } from "../../firebase";
import convertDate from "../../util/convertDate";

const FeaturedComment = () => {
  const [displayCoin, setDisplayCoin] = useState<any>({
    coin: "",
    commentId: "",
    comment: "",
    timestamp: null,
    userId: "",
    profileImage: "",
    displayName: "",
  });
  const [upvotes, setUpvotes] = useState(0);
  const { setTrendingComment } = useUserData();
  const router = useRouter();

  useEffect(() => {
    getFeaturedCommentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfileInfo = async (uid: string) => {
    const profileRef = doc(db, "users", uid);
    const profileSnap: any = await getDoc(profileRef);
    if (profileSnap.exists()) {
      setDisplayCoin((prevState: any) => {
        return {
          ...prevState,
          profileImage: profileSnap.data()?.currentPhotoURL,
          displayName: profileSnap.data()?.displayName,
        };
      });
    }
  };

  const handleMaxDocument = async (document: any) => {
    if (document !== null) {
      setUpvotes(document.data().upvotes);
      const coin = document.data().coin;
      const commentId = document.data().commentId;
      let uid = "";
      const docRef = doc(db, "comments", coin, "messages", commentId);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDisplayCoin({
          coin: coin,
          commentId: commentId,
          comment: docSnap.data().comment,
          timestamp: docSnap.data().timestamp,
          userId: docSnap.data().userId,
        });
        uid = docSnap.data().userId;
      }

      if (uid) getProfileInfo(uid);
    }
  };

  const getFeaturedCommentData = async () => {
    const docRef = collection(db, "trending");
    const docSnap = await getDocs(docRef);

    let maxValue = 0;
    let maxDocument: any = null;
    docSnap.forEach((doc) => {
      if (doc.data().upvotes > maxValue) {
        maxValue = doc.data().upvotes;
        maxDocument = doc;
      }
    });

    handleMaxDocument(maxDocument);
  };

  const handleClick = () => {
    setTrendingComment(displayCoin.commentId);
    router.push(`/coins/${displayCoin.coin}`);
  };

  return (
    <main>
      {displayCoin.coin === "" ? (
        <div className="bg-white rounded-lg shadow-md h-[200px] xs:h-[240px] flex flex-col items-center justify-center">
          <h3 className="font-semibold text-[1.1rem] xs:text-[1.3rem] leading-[18px] xs:leading-5">
            No featured comment yet.
          </h3>
          <p className="font-light text-[0.9rem] xs:text-[1rem]">
            Be the first to upvote today.
          </p>
        </div>
      ) : (
        <div
          className="cursor-pointer col-span-8 p-8 py-10 xs:py-10 sm:p-14 sm:pb-6 sm:pl-12 bg-white shadow-md rounded-lg
          border-[2px] border-white transition-colors duration-150 ease-out cardHover"
          onClick={handleClick}
        >
          <div className="flex">
            <picture>
              <img
                src={
                  displayCoin.profileImage
                    ? displayCoin.profileImage
                    : "/Untitled (5).svg"
                }
                alt="profile picture"
                className="w-10 h-10 mt-[3px] object-cover rounded-full overflow-hidden"
              />
            </picture>
            <div className="flex flex-col ml-3">
              <div className="flex">
                <div className="font-bold text-[0.9rem] truncate">
                  {displayCoin.displayName}
                </div>
                <div className="ml-2 text-[0.9rem] min-w-fit text-[#8C8C8C]">
                  {displayCoin.timestamp &&
                    convertDate(displayCoin.timestamp.toDate())}
                </div>
              </div>
              <div className="max-w-[900px] pb-[3px]">
                {displayCoin.comment}
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex"></div>
            <div className="flex items-center space-x-6">
              <div>
                <span className="text-[#67676d] text-[0.9rem] mr-1">
                  upvotes:
                </span>
                <span className="font-bold">{upvotes}</span>
              </div>
              <div>
                <span className="text-[#67676d] text-[0.9rem] mr-1">
                  commented on:
                </span>
                <span className="font-bold">{displayCoin.coin}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default FeaturedComment;
