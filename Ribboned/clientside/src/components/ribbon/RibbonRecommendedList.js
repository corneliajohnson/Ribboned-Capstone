import React, { useContext, useEffect, useState } from "react";
import { Card, CardImg, CardSubtitle, Button } from "reactstrap";
import { RibbonContext } from "../../providers/RibbonProvider";
import { useHistory } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const RibbonRecommendedList = () => {
  const { getRecommendedRibbons } = useContext(RibbonContext);
  const user = JSON.parse(localStorage.getItem("userProfile"));
  const [videos, setVideos] = useState([]);

  const history = useHistory();

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
    getRecommendedRibbons(user.id).then((res) => setVideos(res));
  }, []);

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
          <Card key={video.id}>
            <CardImg top width="100%" src={video.thumbnail} />
            <CardSubtitle
              tag="h6"
              className="my-2 text-muted "
              style={{ height: "50px" }}
            >
              {video.title}
            </CardSubtitle>
            <Button>Add Ribbon</Button>
          </Card>
        );
      })}
    </Carousel>
  );
};
