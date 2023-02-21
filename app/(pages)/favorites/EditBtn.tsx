import React from "react";

const EditBtn = ({
  edit,
  setEdit,
}: {
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      className={`absolute right-0 -top-10 flex items-center justify-center w-9 h-9
              rounded-full hover:bg-[#d7d7d7] cursor-pointer`}
      onClick={() => setEdit((prevState) => !prevState)}
    >
      {!edit ? (
        <picture>
          <img src="/Edit_filledit.svg" alt="edit" />
        </picture>
      ) : (
        <picture>
          <img src="/Close_roundx.svg" alt="edit" />
        </picture>
      )}
    </button>
  );
};

export default EditBtn;
