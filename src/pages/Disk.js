import React from "react";
import Files from "../components/Files";
import Uploads from "../components/Uploads";
import DeleteToolbar from "../components/DeleteToolbar";

const Disk = () => {
  const accessToken = localStorage.getItem('accessToken');

  return (
    <>
      <DeleteToolbar accessToken={accessToken}/>
      <div className="disk__container">
        <Uploads accessToken={accessToken}/>
        <Files accessToken={accessToken}/>
      </div>
    </>
  )
};

export default Disk;