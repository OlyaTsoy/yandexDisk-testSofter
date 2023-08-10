import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUploadsFiles } from "../slice/uploadsFilesSlice";

const Progressbar = () => {
  const uploadFiles = useSelector((state) => state.uploadsFiles.uploadsFiles);
  const [totalPercentLoaded, setTotalPercentLoaded] = useState(0);
  const [collapse, setCollapse] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let totalSize = 0;
    let totalLoadedSize = 0;
    uploadFiles.forEach((file) => {
      totalSize += file.fileData.size
      totalLoadedSize += (file.fileData.size * file.status)
    });
    setTotalPercentLoaded(Math.round(totalLoadedSize / (totalSize / 100)));
  }, [uploadFiles]);

  const closeWindowProgressbar = () => {
    dispatch(setUploadsFiles([]));
  };

  const collapseWindowProgressbar = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    if (uploadFiles.length > 0) {
      setCollapse(false);
    }
  }, [uploadFiles]);

  return (
    <div className={`progressbar ${uploadFiles.length > 0 ? "" : "progressbar-hidden"}`}>
      <div className="progressbar__header">
        <div className="progressbar__loaded progressbar__loaded-total" style={{
          width: `${totalPercentLoaded}%`,
        }}></div>
        <span>{`Загрузка ${totalPercentLoaded}%`}</span>
        <div className="progressbar__btn">
          <div className="progressbar__collapse" onClick={collapseWindowProgressbar}>{!collapse ? "Свернуть" : "Развернуть"}</div>
          <div className="progressbar__close" onClick={closeWindowProgressbar}>X</div>
        </div>
        </div>
      <div className={`progressbar__wrapper ${!collapse ? "" : "progressbar__wrapper-collapsed"}`}>
          {uploadFiles.length > 0 ? uploadFiles.map((file) => {
            return (
              <div key={file.fileData.path} className="progressbar__upload">
                <span className="progressbar__file">{file.fileData.name}</span>
                <div className="progressbar__loadingBar">
                  <div className="progressbar__loaded" style={{
                    width: `${file.status * 100}%`,
                  }}></div>
                </div>
              </div>
            )
          }) : ''}
      </div>
    </div>
  )
};

export default Progressbar;