import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  return (
    <div>
      <div className="overflow-x-auto whitespace-nowrap no-scrollbar">
        <ButtonList />
      </div>
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
