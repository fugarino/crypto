"use client";

import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFavoriteCoins } from "../../contexts/FavoritesContext";
import { db } from "../../firebase";

const Testing = () => {
  const [displayCoin, setDisplayCoin] = useState({
    coin: "",
    displayName: "",
    photo: "",
    comment: "",
    upvotes: 0,
    timestamp: "",
    repliesLength: 0,
    commentId: "",
  });
  const { setTrendingComment }: any = useFavoriteCoins();
  const router = useRouter();

  useEffect(() => {
    // db.collection("trending")
    //   .get()
    //   .then((snapshot: any) => {
    //     let maxValue = 0;
    //     let maxDocument: any = null;
    //     snapshot.forEach((doc: any) => {
    //       const data = doc.data();
    //       if (data.trending > maxValue) {
    //         maxValue = data.yourField;
    //         maxDocument = doc;
    //       }
    //     });

    //     console.log(maxDocument.id, "has the highest value of", maxValue);
    //   })
    //   .catch((error: any) => {
    //     console.error(error);
    //   });
    const getData = async () => {
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
      if (maxDocument !== null) {
        setDisplayCoin(() => ({
          photo: maxDocument.data().photo,
          displayName: maxDocument.data().comment.data.displayName,
          coin: maxDocument.data().coin,
          comment: maxDocument.data().comment.data.comment,
          upvotes: maxDocument.data().upvotes + 1,
          timestamp: maxDocument.data().timestamp,
          repliesLength: maxDocument.data().repliesLength,
          commentId: maxDocument.data().commentId,
        }));
      }
    };
    getData();
  }, []);

  const handleClick = () => {
    setTrendingComment(displayCoin.commentId);
    router.push(`/coins/${displayCoin.coin}`);
  };

  return (
    <div
      className="flex cursor-pointer p-10 bg-white shadow-md rounded-lg
    outline-[#dedede] hover:outline hover:outline-[2px] hover:outline-[#dedede]
	  hover:bg-[#f9f9f9] transition-all duration-150 ease-out"
      onClick={handleClick}
    >
      <picture>
        <img
          src={displayCoin.photo}
          alt="profile picture"
          className="w-10 h-10 mt-[3px] object-cover rounded-full overflow-hidden"
        />
      </picture>
      <div className="flex flex-col ml-3">
        <div className="flex">
          <div className="font-bold text-[0.9rem]">
            {displayCoin.displayName}
          </div>
          <div className="ml-2 text-[0.9rem] text-[#8C8C8C]">
            {displayCoin.timestamp}
          </div>
        </div>
        <div>
          <div className="max-w-[850px] pb-[3px]">{displayCoin.comment}</div>
          <div className="flex">
            <div className="flex items-center space-x-1">
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
              <span className="text-[0.9rem]">{displayCoin.upvotes}</span>
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
            </div>
            <span className="ml-4 text-[0.9rem] font-semibold">{`replies(${displayCoin.repliesLength})`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testing;
