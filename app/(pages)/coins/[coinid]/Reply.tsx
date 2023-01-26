const Reply = ({ comment }: any) => {
  return (
    <li id={comment.id} className="text-slate-600 border-2">
      <span className="font-bold">{comment.data.userId}</span>
      <span className="ml-4">{comment.data.reply}</span>
    </li>
  );
};

export default Reply;
