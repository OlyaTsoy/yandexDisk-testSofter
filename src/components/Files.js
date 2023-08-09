import React from "react";
import axios from "axios";
import File from "./File";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFiles } from "../slice/filesSlice";

const Files = ({ accessToken }) => {
  const files = useSelector((state) => state.files.files);

  const dispatch = useDispatch();

  useEffect(() => {
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
    getFilesData();
  }, []);

  return (
    <section className="files">
      <h2>Файлы</h2>
      <div className="files__grid">
        {files?.map((file) => {
          return <File key={file.resource_id} file={file} />
        })}
      </div>
    </section>
  )
};

export default Files;