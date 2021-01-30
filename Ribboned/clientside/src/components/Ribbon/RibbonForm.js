import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import { SourceContext } from "../../providers/SourceProvider";
import { RibbonContext } from "../../providers/RibbonProvider";
import { useParams, useHistory } from "react-router-dom";
import "./Ribbon.css";

export const RibbonForm = (props) => {
  const { getCategories, categories } = useContext(CategoryContext);
  const { getSources, sources } = useContext(SourceContext);
  const { getRibbonById } = useContext(RibbonContext);
  const [isMakedPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ribbon, setRibbon] = useState({});
  const [isUrl, setIsUrl] = useState(true);
  const { ribbonId } = useParams();
  const defaultCategory = JSON.parse(localStorage.getItem("userProfile"))
    .uncategorizedId;

  //toggle public and private
  const handlePrivacy = () => {
    !isMakedPublic ? setIsPublic(true) : setIsPublic(false);
  };

  //return thubnail based on youtube Id
  const getYoubeVideoId = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    console.log(match && match[7].length == 11 ? match[7] : null);
    return match && match[7].length == 11
      ? `http://img.youtube.com/vi/${match[7]}/hqdefault.jpg`
      : null;
  };

  const getChoosenSource = (event) => {
    const source = parseInt(event.target.value);

    if (source === 3) {
      setIsUrl(false);
    } else {
      setIsUrl(true);
    }
  };

  // Get categories and sources. If ribbonId is in the URL, getRibbonById
  useEffect(() => {
    getSources();
    getCategories();
    if (ribbonId) {
      getRibbonById(ribbon).then((ribbon) => {
        setRibbon(ribbon);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  //when field changes, update state. This causes a re-render and updates the view.
  //Controlled component
  const handleControlledInputChange = (event) => {
    const newRibbon = { ...ribbon };
    newRibbon[event.target.name] = event.target.value;
    setRibbon(newRibbon);
  };

  const handleSaveRibbon = (e) => {
    e.preventDefault();
    //disable the button - no extra clicks
    setIsLoading(true);
    if (ribbonId) {
      //PUT - update
      console.log({
        id: ribbon.id,
        title: ribbon.title,
        decription: ribbon.decription,
        sourceId: parseInt(ribbon.sourceId),
        url: ribbon.url,
        thumbnail:
          parseInt(ribbon.sourceId) === 2 ? getYoubeVideoId(ribbon.url) : null,
        categoryId: ribbon.categoryId ? ribbon.categoryId : defaultCategory,
        isActive: true,
        isPublic: isMakedPublic,
      });
    } else {
      //POST - add
      console.log({
        title: ribbon.title,
        decription: ribbon.decription,
        sourceId: parseInt(ribbon.sourceId),
        url: ribbon.url,
        thumbnail:
          parseInt(ribbon.sourceId) === 2 ? getYoubeVideoId(ribbon.url) : null,
        categoryId: ribbon.categoryId ? ribbon.categoryId : defaultCategory,
        isActive: true,
        isPublic: isMakedPublic,
      });
    }
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto p-4">
        <Form className="border p-5" onSubmit={handleSaveRibbon}>
          <h2 className="text-center">New Ribbon</h2>
          <FormGroup row>
            <Label htmlFor="title" lg={2}>
              Title
            </Label>
            <Col lg={10}>
              <Input
                type="text"
                name="title"
                onChange={handleControlledInputChange}
                required="required"
              />
            </Col>
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup row>
                <Label htmlFor="category" lg={2}>
                  Category
                </Label>
                <Col lg={10}>
                  <Input
                    type="select"
                    name="categoryId"
                    onChange={handleControlledInputChange}
                    required="required"
                  >
                    <option value="0"></option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Input>
                </Col>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup row>
                <Label htmlFor="source" lg={2}>
                  Source
                </Label>
                <Col lg={10}>
                  <Input
                    type="select"
                    name="sourceId"
                    onChange={(e) => {
                      handleControlledInputChange(e);
                      getChoosenSource(e);
                    }}
                    required="required"
                  >
                    <option value="0"></option>
                    {sources.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.type}
                      </option>
                    ))}
                  </Input>
                </Col>
              </FormGroup>
            </Col>
          </Row>
          {isUrl ? (
            <FormGroup row>
              <Label htmlFor="url" lg={2}>
                URL
              </Label>
              <Col gl={10}>
                <Input
                  type="url"
                  name="url"
                  onChange={handleControlledInputChange}
                />
              </Col>
            </FormGroup>
          ) : (
            <FormGroup row>
              <Label htmlFor="url" lg={2}>
                Upload File
              </Label>
              <Col gl={10}>
                <Input
                  type="file"
                  name="url"
                  onChange={handleControlledInputChange}
                />
              </Col>
            </FormGroup>
          )}

          <FormGroup row>
            <Label htmlFor="decription" lg={2}>
              Decription
            </Label>
            <Col lg={10}>
              <Input
                type="textarea"
                name="decription"
                onChange={handleControlledInputChange}
                required="required"
              />
            </Col>
          </FormGroup>
          <Label>Public</Label>
          <div>
            <input
              type="checkbox"
              hidden="hidden"
              id="username"
              checked={isMakedPublic}
              onChange={handlePrivacy}
            />
            <label className="switch" htmlFor="username"></label>
          </div>
          <Button className="btn btn-success float-right" disabled={isLoading}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};
