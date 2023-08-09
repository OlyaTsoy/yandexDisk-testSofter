import React from "react";
import axios from "axios";
import { useState } from "react";
import Dropzone from 'react-dropzone';
import { useDispatch } from "react-redux";
import { setFiles } from "../slice/filesSlice";

const Uploads = ({ accessToken }) => {
  const [uploadFiles, setUploadFiles] = useState([]);

  const dispatch = useDispatch();

  // Функция для загрузки файла на Яндекс.Диск
  const uploadFile = async (url, file) => {
    const uploadResponse = await axios({
      method: 'PUT',
      url,
      data: {
        file,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return uploadResponse;
  }

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

  const getUploadUrl = () => {
    uploadFiles.forEach(async (file) => {
      const response = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/upload`,
        params: {
          path: file.path,
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
    setUploadFiles([]);
  };

  // Функция обработки выбранного файла
  const handleFileChange = (acceptedFiles) => {
    setUploadFiles(acceptedFiles);
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
        {uploadFiles.length > 0 ? uploadFiles.map((file) => {
          if (uploadFiles.length === 1) {
            return (
              <p>Выбранный файл: {file.name}</p>
            )
          }
            return (
              <p>Выбранные файлы: {file.name}</p>
            )
        }) : ''}
      <button className="btn" onClick={getUploadUrl}>
        Загрузить на Яндекс.Диск
      </button>
    </div>
  );
};

export default Uploads;