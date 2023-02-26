interface ICommentsHeader {
  coinid: string;
  showInput: () => Promise<void>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  showCommentInput: boolean;
  setShowCommentInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentsHeader = ({
  coinid,
  showInput,
  setSortBy,
  showCommentInput,
  setShowCommentInput,
}: ICommentsHeader) => {
  return (
    <div className="flex items-center justify-between px-4">
      <h3 className="font-bold text-[1.4rem]">Comments</h3>
      <div className="flex relative top-[2px]">
        <span className="hidden md1:block text-[#75757B]">
          How are you feeling about <span className="font-bold">{coinid}</span>{" "}
          today?
        </span>
        <button
          style={{
            display: showCommentInput ? "none" : "inline-block",
          }}
          className="ml-4 font-bold text-[0.95rem] xs:text-[1rem]"
          onClick={showInput}
        >
          add a comment
        </button>
        <button
          style={{
            display: showCommentInput ? "inline-block" : "none",
          }}
          className="ml-4 font-bold text-[0.95rem] xs:text-[1rem]"
          onClick={() => setShowCommentInput(false)}
        >
          cancel
        </button>
        <select
          name="sort"
          id="sort-comments"
          className="ml-4 md:ml-12 font-medium bg-inherit outline-none cursor-pointer text-[0.95rem] xs:text-[1rem]"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="top">top</option>
          <option value="latest">latest</option>
        </select>
      </div>
    </div>
  );
};

export default CommentsHeader;
