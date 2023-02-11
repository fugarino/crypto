"use client";

import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFavoriteCoins } from "../../contexts/FavoritesContext";
import { db } from "../../firebase";
import convertDate from "../../util/convertDate";

const Testing = () => {
  const [displayCoin, setDisplayCoin] = useState<any>({
    coin: "",
    commentId: "",
    comment: "",
    timestamp: null,
    userId: "",
  });
  const [upvotes, setUpvotes] = useState(0);
  const [displayCoinProfile, setDisplayCoinProfile] = useState({
    profileImage: "",
    displayName: "",
  });
  const { setTrendingComment }: any = useFavoriteCoins();
  const router = useRouter();

  useEffect(() => {
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
        setUpvotes(maxDocument.data().upvotes);
        const coin = maxDocument.data().coin;
        const commentId = maxDocument.data().commentId;
        const docRef = doc(db, "comments", coin, "messages", commentId);

        const unsubscribe = onSnapshot(docRef, (coinI) => {
          if (coinI.exists()) {
            setDisplayCoin({
              coin: coin,
              commentId: commentId,
              comment: coinI.data().comment,
              timestamp: coinI.data().timestamp,
              upvotes: coinI.data().upvotes,
              userId: coinI.data().userId,
            });
          } else {
            console.log("No items in watchlist");
          }
        });

        return () => {
          unsubscribe();
        };
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (displayCoin.userId !== "") {
      const docRef = doc(db, "users", displayCoin.userId);
      const unsubscribe = onSnapshot(docRef, (coinI) => {
        if (coinI.exists()) {
          setDisplayCoinProfile({
            profileImage: coinI.data().currentPhotoURL
              ? coinI.data().currentPhotoURL
              : coinI.data().photoURL,
            displayName: coinI.data().displayName,
          });
        } else {
          console.log("No items in watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [displayCoin.userId]);

  const handleClick = () => {
    setTrendingComment(displayCoin.commentId);
    router.push(`/coins/${displayCoin.coin}`);
  };

  return (
    <div
      className="cursor-pointer col-span-8 p-14 pb-6 pl-12 bg-white shadow-md rounded-lg
    outline-[#dedede] hover:outline hover:outline-[2px] hover:outline-[#dedede]
	  hover:bg-[#f9f9f9] transition-all duration-150 ease-out"
      onClick={handleClick}
    >
      <div className="flex">
        <picture>
          <img
            src={displayCoinProfile.profileImage}
            alt="profile picture"
            className="w-10 h-10 mt-[3px] object-cover rounded-full overflow-hidden"
          />
        </picture>
        <div className="flex flex-col ml-3">
          <div className="flex">
            <div className="font-bold text-[0.9rem]">
              {displayCoinProfile.displayName}
            </div>
            <div className="ml-2 text-[0.9rem] text-[#8C8C8C]">
              {displayCoin.timestamp &&
                convertDate(displayCoin.timestamp.toDate())}
            </div>
          </div>
          <div className="max-w-[900px] pb-[3px]">{displayCoin.comment}</div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div></div>
        <div className="flex items-center space-x-6">
          <div>
            <span className="text-[#67676d] text-[0.9rem] mr-1">
              commented on:
            </span>
            <span className="font-bold">{displayCoin.coin}</span>
          </div>
          <div>
            <span className="text-[#67676d] text-[0.9rem] mr-1">
              today&apos;s upvotes:
            </span>
            <span className="font-bold">{upvotes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testing;
