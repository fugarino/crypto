interface ISignInButtonProps {
  disabled: boolean;
  text: string;
}

const SubmitFormBtn = ({ disabled, text }: ISignInButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="block border-2 font-medium border-[#171b2f] bg-[#171b2f] w-full text-white p-2 rounded-[7px] mb-4 hover:bg-white hover:text-[#171b2f] transition-all duration-150 ease-out"
    >
      {text}
    </button>
  );
};

export default SubmitFormBtn;
