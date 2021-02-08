import React, { useContext, useState } from "react";
import { Input, Button } from "reactstrap";
import { YouTubeContext } from "../../providers/YouTubeProvider";

export const YouTubeSearch = () => {
  const { setSearchTerms } = useContext(YouTubeContext);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerms(search);
  };

  return (
    <>
      <div className="my-3 row justify-content-center">
        <Input
          type="text"
          className="w-75"
          placeholder="YoutTube Search... "
          onChange={(event) => setSearch(event.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </>
  );
};
