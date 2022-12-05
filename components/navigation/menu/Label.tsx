interface ILabelProps {
  text: string;
}

const Label = ({ text }: ILabelProps) => {
  return (
    <div className="absolute left-[47px] bg-white px-4 py-1 shadow-md rounded-[5px] text-gray-600">
      <div className="absolute top-3 -left-1 bg-white p-1 rotate-45 shadow-md"></div>
      {text}
    </div>
  );
};

export default Label;
