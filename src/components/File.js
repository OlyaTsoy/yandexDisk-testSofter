import React from "react";
import { selectFile } from "../slice/currentSelectedFilesSlice";
import { useSelector, useDispatch } from "react-redux";

const File = ({ file }) => {
  const currentSelected = useSelector((state) => state.currentSelected.currentSelectedFiles);

  const dispatch = useDispatch();

  const toggleSelection = () => {
    dispatch(selectFile(file.path));
  };

  return (
    <div className={`file__container ${currentSelected.includes(file.path) ? "file__selected" : ""}`} onClick={toggleSelection}>
      <img src={file.preview || 'https://placehold.co/100x100'}></img>
      <span className="file__name">{file.name}</span>
    </div>
  )
};

export default File;