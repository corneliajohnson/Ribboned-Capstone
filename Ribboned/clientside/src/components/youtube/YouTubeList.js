import React, { useContext, useEffect, useState } from "react";
import { Card, CardImg, CardSubtitle, Button } from "reactstrap";
import { YouTubeContext } from "../../providers/YouTubeProvider";
import { useHistory } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const YouTubeList = () => {
  const { searchTerms, videos, getVideos, setYouTubeAdd } = useContext(
    YouTubeContext
  );

  const history = useHistory();

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
    getVideos(searchTerms);
  }, [searchTerms]);

  const handleAdd = (e) => {
    e.preventDefault(e);
    setYouTubeAdd({
      title: video.snippet.title,
      decription: video.snippet.description,
      sourceId: 2,
      url: `https://youtu.be/${video.id.videoId}`,
      thumbnail: video.snippet.thumbnails.high.url,
      categoryId: 0,
      isActive: true,
      isPublic: false,
    });
    history.push(`/ribbon/create`);
  };

  //for carousel
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (!videos) return null;

  return (
    <Carousel responsive={responsive}>
      {videos.map((video) => {
        return (
          <Card key={video.etag}>
            <CardImg top width="100%" src={video.snippet.thumbnails.high.url} />
            <CardSubtitle
              tag="h6"
              className="my-2 text-muted "
              style={{ height: "50px" }}
            >
              {video.snippet.title}
            </CardSubtitle>
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleAdd(video);
              }}
            >
              Add Ribbon
            </Button>
          </Card>
        );
      })}
    </Carousel>
  );
};
