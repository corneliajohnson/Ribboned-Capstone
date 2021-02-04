import React, { useContext, useEffect, useState } from "react";
import { Card, CardImg, CardSubtitle, CardDeck } from "reactstrap";
import { YouTubeContext } from "../../providers/YouTubeProvider";

export const YouTubeList = () => {
  const { searchTerms, videos, getVideos } = useContext(YouTubeContext);

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
    getVideos(searchTerms);
  }, [searchTerms]);

  if (!videos) return null;

  return (
    <div className="row">
      {videos.map((video) => {
        return (
          <Card className="col-lg-3 m-1">
            <CardImg top width="100%" src={video.snippet.thumbnails.high.url} />
            <CardSubtitle tag="h6" className="my-2 text-muted">
              {video.snippet.title}
            </CardSubtitle>
          </Card>
        );
      })}
    </div>
  );
};
