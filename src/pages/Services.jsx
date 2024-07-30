import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CreateCaptions from "@/components/CreateCaption";
import GetPostIdeas from "@/components/PostIdeals";
import { useDispatch, useSelector } from "react-redux";
import {
  generateCaptionsFromIdeaRequest,
  generatePostIdeasRequest,
  requestPostCaption,
  requestSaveCaption,
  resetPostCaptionAndIdea,
} from "@/redux/actions/service";
import { SOCIAL_NETWORK_PROVIDER, TONES } from "@/constants";

const Services = () => {
  const [postCapPayload, setPostCapPayload] = useState({
    socialNetwork: SOCIAL_NETWORK_PROVIDER[0],
    subject: "",
    tone: TONES[0],
  });

  const [tabIndex, setTabIndex] = useState(0);

  const dispatch = useDispatch();
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const service = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(resetPostCaptionAndIdea());
  }, [dispatch]);

  const handleGenerateCaptions = () => {
    try {
      dispatch(requestPostCaption(postCapPayload));
    } catch (error) {
      console.error("Error sending access code:", error);
    }
  };

  const handleSave = ({ caption, subject }) => {
    try {
      dispatch(
        requestSaveCaption({
          data: {
            data: caption,
            topic: subject,
          },
          phoneNumber,
        })
      );
    } catch (error) {
      console.error("Error sending access code:", error);
    }
  };

  const handleGenerateIdeas = (topic) => {
    dispatch(generatePostIdeasRequest(topic));
  };

  const handleGenerateCaptionFromIdea = (idea) => {
    dispatch(generateCaptionsFromIdeaRequest(idea));
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleChangePostCapPayload = (newState) => {
    setPostCapPayload((prev) => {
      return { ...prev, ...newState };
    });
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container mt={10}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant={isSmallScreen ? "scrollable" : "fullWidth"}
        allowScrollButtonsMobile
        aria-label="tabs"
      >
        <Tab label="Create Captions from Scratch" />
        <Tab label="Get Post Ideas and Captions for Topic" />
      </Tabs>
      {tabIndex === 0 && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <CreateCaptions
              postCapPayload={postCapPayload}
              handleChangePostCapPayload={handleChangePostCapPayload}
              handleGenerateCaptions={handleGenerateCaptions}
              status={service}
              handleSave={handleSave}
            />
          </Grid>
        </Grid>
      )}
      {tabIndex === 1 && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <GetPostIdeas
              status={service}
              handleGenerateIdeas={handleGenerateIdeas}
              handleGenerateCaptionFromIdea={handleGenerateCaptionFromIdea}
              handleSave={handleSave}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Services;
