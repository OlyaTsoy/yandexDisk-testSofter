import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deselectAll } from "../slice/currentSelectedFilesSlice";
import { setFiles } from "../slice/filesSlice";
import axios from "axios";

const DeleteToolbar = ({accessToken}) => {
  const currentSelected = useSelector((state) => state.currentSelected.currentSelectedFiles);

  const dispatch = useDispatch();

  const deselectFiles = () => {
    dispatch(deselectAll())
  };

  const getFilesData = async () => {
      const uploadResponse = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/files`,
        params: {
          limit: 100,
          media_type: "audio, book, image, compressed, development, flash, font, text, unknown, video, web",
          preview_size: "S",
          preview_crop: true,
        },
        headers: {
          Authorization: `OAuth ${accessToken}`,
        },
      })
      if (uploadResponse.status === 200) {
        dispatch(setFiles(uploadResponse.data.items));
      }
  };

  const deleteFiles = () => {
    currentSelected.forEach(async (filePath) => {
      await axios({
      method: 'DELETE',
      url: process.env.REACT_APP_API_URL,
      params: {
        path: filePath
        },
      headers: {
        Authorization: `OAuth ${accessToken}`,
        },
      })
      await getFilesData();
    })
    deselectFiles();
  };

  return (
    <div className={`delete ${currentSelected.length > 0 ? "" : "hidden"}`}>
      <span>{`Выбрано файлов: ${currentSelected.length}`}</span>
      <div>
        <button className="delete__btn" onClick={deleteFiles}>Удалить</button>
        <button className="deselect__btn" onClick={deselectFiles}>Х</button>
      </div>
    </div>
  )
};

export default DeleteToolbar;