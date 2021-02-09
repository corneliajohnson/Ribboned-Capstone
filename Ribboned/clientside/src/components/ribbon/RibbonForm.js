import React, { useState, useEffect, useContext } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Progress,
} from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import { SourceContext } from "../../providers/SourceProvider";
import { RibbonContext } from "../../providers/RibbonProvider";
import { YouTubeContext } from "../../providers/YouTubeProvider";
import { useParams, useHistory } from "react-router-dom";
import "./Ribbon.css";
import { storage } from "../../firebase";
import Logo from "../../img/RibbonedWordOnly.png";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RibbonForm = (props) => {
  const { getCategories, categories } = useContext(CategoryContext);
  const { youTubeAdd, setYouTubeAdd } = useContext(YouTubeContext);
  const { getSources, sources } = useContext(SourceContext);
  const {
    getRibbonById,
    addRibbon,
    updateRibbon,
    recommendedAdd,
    setRecommendedAdd,
  } = useContext(RibbonContext);
  const [isMakedPublic, setIsPublic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [disablePublic, setDisablePublic] = useState(true);
  const [ribbon, setRibbon] = useState({});
  const [isUrl, setIsUrl] = useState(true);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const history = useHistory();

  //TODO set loading for file to wait on url
  const [fileLoading, setFileLoading] = useState(false);

  const { ribbonId } = useParams();

  const defaultCategory = JSON.parse(localStorage.getItem("userProfile"))
    .uncategorizedId;

  //image upload
  const handleUploadChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileLoading(true);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`videos/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        setFileLoading(false);
      },
      () => {
        storage
          .ref("videos")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            setFileLoading(false);
          });
      }
    );
  };

  //toggle public and private
  const handlePrivacy = () => {
    !isMakedPublic ? setIsPublic(true) : setIsPublic(false);
  };

  //return thumbnail based on youtube Id
  const getYoubeVideoId = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11
      ? `http://img.youtube.com/vi/${match[7]}/hqdefault.jpg`
      : null;
  };

  //based on souce set input fields and public field
  const getChoosenSource = (event) => {
    const source = parseInt(event.target.value);
    if (source === 3) {
      setIsUrl(false);
      setRibbon({ ...ribbon, sourceId: 3, url: "" });
    } else {
      setIsUrl(true);
      setUrl("");
    }

    if (source === 2) {
      setDisablePublic(false);
      setIsUrl(true);
    } else {
      setIsPublic(false);
      setDisablePublic(true);
    }
  };

  // Get categories and sources. If ribbonId is in the URL, getRibbonById
  useEffect(() => {
    getSources();
    getCategories();
    if (Object.keys(recommendedAdd).length !== 0) {
      //recommended videos
      setRibbon(recommendedAdd);
      setIsLoading(false);
    } else if (Object.keys(youTubeAdd).length !== 0) {
      //youtub video
      setRibbon(youTubeAdd);
      setIsLoading(false);
    } else if (ribbonId) {
      //edit
      getRibbonById(ribbonId).then((ribbon) => {
        //user entry
        setRibbon(ribbon);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
      //clear flieds
      setRibbon({
        title: "",
        decription: "",
        sourceId: 0,
        url: "",
        thumbnail: "",
        isActive: true,
        isPublic: false,
      });
    }
  }, [ribbonId]);

  //when field changes, update state. This causes a re-render and updates the view.
  //Controlled component
  const handleControlledInputChange = (event) => {
    const newRibbon = { ...ribbon };
    newRibbon[event.target.name] = event.target.value;
    setRibbon(newRibbon);
  };

  const handleSaveRibbon = (e) => {
    e.preventDefault();
    if (file != null) {
      handleUpload();
    }

    if (!fileLoading) {
      //disable the button - no extra clicks
      setIsLoading(true);
      if (ribbonId) {
        //PUT - update
        updateRibbon({
          id: ribbon.id,
          title: ribbon.title,
          decription: ribbon.decription,
          sourceId: parseInt(ribbon.sourceId),
          url: url || ribbon.url,
          thumbnail:
            parseInt(ribbon.sourceId) === 2
              ? getYoubeVideoId(ribbon.url)
              : null,
          categoryId: ribbon.categoryId ? ribbon.categoryId : defaultCategory,
          isActive: true,
          isPublic: parseInt(ribbon.sourceId) === 2 ? ribbon.isPublic : false,
          dateCreated: ribbon.dateCreated,
        })
          .then(() => history.push(`/ribbon/${ribbon.id}`))
          .then(() =>
            toast.dark("Ribbon Updated", {
              position: "bottom-right",
              hideProgressBar: true,
            })
          );
      } else {
        //POST - add
        addRibbon({
          title: ribbon.title,
          decription: ribbon.decription,
          sourceId: parseInt(ribbon.sourceId),
          url: parseInt(ribbon.sourceId) === 3 ? url : ribbon.url,
          thumbnail:
            parseInt(ribbon.sourceId) === 2
              ? getYoubeVideoId(ribbon.url)
              : null,
          categoryId: ribbon.categoryId ? ribbon.categoryId : defaultCategory,
          isActive: true,
          isPublic: !isMakedPublic
            ? false
            : parseInt(ribbon.sourceId) === 2
            ? isMakedPublic
            : false,
        })
          .then(() =>
            toast.dark("Ribbon Added", {
              position: "bottom-right",
              hideProgressBar: true,
            })
          )
          .then(() => setYouTubeAdd({}))
          .then(() => setRecommendedAdd({}))
          .then(() => history.push("/ribbons"));
      }
    }
  };

  return (
    <div className="container" style={{ marginBottom: "15%" }}>
      <ToastContainer></ToastContainer>
      <div className="text-center my-5">
        <Link className="m-5" to="/account">
          <img alt="ribboned logo" src={Logo} />
        </Link>
      </div>
      <div className="w-75 mx-auto p-4">
        <Form className="border p-5" onSubmit={handleSaveRibbon}>
          <h2 className="text-center">New Ribbon</h2>
          <FormGroup row>
            <Label htmlFor="title" lg={2}>
              Title <span className="text-danger">*</span>
            </Label>
            <Col lg={10}>
              <Input
                type="text"
                name="title"
                defaultValue={ribbon.title}
                onChange={handleControlledInputChange}
                maxLength="100"
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
                    value={ribbon.categoryId}
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
                  Source<span className="text-danger">*</span>
                </Label>
                <Col lg={10}>
                  <Input
                    type="select"
                    name="sourceId"
                    value={ribbon.sourceId}
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
                URL <span className="text-danger">*</span>
              </Label>
              <Col gl={10}>
                <Input
                  type="url"
                  name="url"
                  maxLength="255"
                  defaultValue={ribbon.url}
                  onChange={handleControlledInputChange}
                />
              </Col>
            </FormGroup>
          ) : (
            <>
              <FormGroup row>
                <Label htmlFor="url" lg={2}>
                  Upload File <span className="text-danger">*</span>
                </Label>
                <Col gl={10}>
                  <Input
                    type="file"
                    name="url"
                    accept=".mp4,.webm,.ogg"
                    defaultValue={ribbon.url}
                    onChange={handleUploadChange}
                  />
                </Col>
              </FormGroup>
              <Progress color="primary" value={progress}>
                {progress}%
              </Progress>
            </>
          )}

          <FormGroup row>
            <Label htmlFor="decription" lg={2}>
              Decription <span className="text-danger">*</span>
            </Label>
            <Col lg={10}>
              <Input
                type="textarea"
                name="decription"
                defaultValue={ribbon.decription}
                onChange={handleControlledInputChange}
                maxLength="255"
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
              disabled={disablePublic}
              defaultChecked={ribbon.isPublic}
              checked={isMakedPublic}
              onChange={handlePrivacy}
            />
            <label className="switch" htmlFor="username"></label>
          </div>
          <small className="text-muted">
            Only YouTube videos can be public
          </small>
          <Button className="btn btn-success float-right" disabled={isLoading}>
            Submit
          </Button>
          <div>
            <small className="text-warning">
              {!isUrl ? "Ribbon added when video loads" : ""}
            </small>
          </div>
        </Form>
      </div>
    </div>
  );
};
