import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestUserContents,
  unsaveContentRequest,
} from "@/redux/actions/profile";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Container,
  CircularProgress,
} from "@mui/material";
import CaptionCard from "@/components/common/CaptionCard";

const Profile = () => {
  const dispatch = useDispatch();
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const contents = useSelector((state) => state.profile.contents);
  const loading = useSelector((state) => state.profile.loading);

  useEffect(() => {
    dispatch(requestUserContents({ phoneNumber }));
  }, [dispatch, phoneNumber]);

  const handleUnsave = (id) => {
    dispatch(unsaveContentRequest(id));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Grid container spacing={5} pt={3}>
        {contents.map((content) => (
          <Grid item xs={12} sm={6} md={6} key={content.id}>
            <CaptionCard
              topic={content.topic}
              caption={content.data}
              onUnSave={() => handleUnsave(content.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Profile;
