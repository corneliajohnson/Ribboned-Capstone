import React from "react";
import { Input } from "reactstrap";

export const YouTubeSearch = () => {
  return (
    <>
      <div className="my-3">
        <Input
          type="text"
          className="w-100 input--wide"
          placeholder="YoutTube Search... "
        />
      </div>
    </>
  );
};
