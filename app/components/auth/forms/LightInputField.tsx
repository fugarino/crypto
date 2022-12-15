interface ILightInputFieldProps {
  labelText: string;
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  defaultValue?: string;
  // eslint-disable-next-line
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LightInputField = ({
  labelText,
  type,
  name,
  placeholder,
  defaultValue,
  onChange,
}: ILightInputFieldProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text=[#171b2f] font-medium">
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="border-2 rounded-[7px] py-2 px-3 mb-5 outline-[#6b6e87]"
        onChange={onChange}
      />
    </div>
  );
};

export default LightInputField;
