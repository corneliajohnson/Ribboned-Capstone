import React, { useState, createContext } from "react";

export const YouTubeContext = createContext();

export const YouTubeProvider = (props) => {
  const [searchTerms, setSearchTerms] = useState("tutorial");
  const [videos, setVideos] = useState([]);
  const [youTubeAdd, setYouTubeAdd] = useState({});
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  console.log(apiKey);

  const getVideos = (searchTerms) => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerms}&maxResults=10&key=${apiKey}`,
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
      value={{
        getVideos,
        videos,
        searchTerms,
        setSearchTerms,
        youTubeAdd,
        setYouTubeAdd,
      }}
    >
      {props.children}
    </YouTubeContext.Provider>
  );
};
