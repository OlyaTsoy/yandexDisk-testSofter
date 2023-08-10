import React from "react";
import axios from "axios";
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from "react-redux";
import { setFiles } from "../slice/filesSlice";
import Progressbar from "./Progressbar";
import { setUploadsFiles, setUploadStatus } from "../slice/uploadsFilesSlice";

const Uploads = ({ accessToken }) => {
  const uploadFiles = useSelector((state) => state.uploadsFiles.uploadsFiles);

  const dispatch = useDispatch();

  // Функция для загрузки файла на Яндекс.Диск
  const uploadFile = async (url, file) => {
    await axios({
      method: 'PUT',
      url,
      data: {
        file: file.fileData,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        dispatch(setUploadStatus({ path: file.fileData.path, status: progressEvent.progress }))
      }
    });
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
    });
    if (uploadResponse.status === 200) {
      dispatch(setFiles(uploadResponse.data.items));
    }
  };

  const getUploadUrl = () => {
    uploadFiles.forEach(async (file) => {
      const response = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/upload`,
        params: {
          path: file.fileData.path,
          overwrite: true,
        },
        headers: {
          Authorization: `OAuth ${accessToken}`,
        },
      });

      const uploadUrl = response.data.href;
      await uploadFile(uploadUrl, file);
      await getFilesData();
    });
  };

  // Функция обработки выбранного файла
  const handleFileChange = (acceptedFiles) => {
    dispatch(setUploadsFiles(acceptedFiles.map((obj) => {
      return { status: 0, fileData: obj }
    })));
  };

  return (
    <div className="uploads">
      <h2>Загрузить файл</h2>
      <Dropzone onDrop={handleFileChange}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: 'dropzone' })}>
            <input type="file" multiple {...getInputProps()} />
            <p>Перетащите файл сюда или кликните, чтобы выбрать файл</p>
          </div>
        )}
      </Dropzone>
      <Progressbar />
      <button className="btn" onClick={getUploadUrl}>
        Загрузить на Яндекс.Диск
      </button>
    </div>
  );
};

export default Uploads;