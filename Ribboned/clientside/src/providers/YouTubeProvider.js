import React, { useState, createContext } from "react";

export const YouTubeContext = createContext();

export const YouTubeProvider = (props) => {
  const [searchTerms, setSearchTerms] = useState("news");
  const [videos, setVideos] = useState([]);

  const getVideos = (searchTerms) => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerms}&maxResults=10&key=AIzaSyBiR8YF9ewxIipKT5zhIthW5xp4_XqcGDU`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((videos) => {
        setVideos(videos.items);
      });
  };

  return (
    <YouTubeContext.Provider
      value={{ getVideos, videos, searchTerms, setSearchTerms }}
    >
      {props.children}
    </YouTubeContext.Provider>
  );
};
