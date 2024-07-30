import { useState } from "react";
import { TextField, Card, CardContent, Typography, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CaptionCard from "./common/CaptionCard";

const GetPostIdeas = ({
  status,
  handleGenerateIdeas,
  handleGenerateCaptionFromIdea,
  handleSave,
}) => {
  const [topic, setTopic] = useState("");
  const [ideaSelected, setIdeaSelected] = useState("");
  const { captions, saving, ideadGenerating, ideas } = status;

  const handleGetIdea = (topic) => {
    setIdeaSelected("");
    handleGenerateIdeas(topic);
  };

  const handleGenerate = (idea) => {
    setIdeaSelected(idea);
    handleGenerateCaptionFromIdea(idea);
  };
  return (
    <Card
      sx={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(15px)",
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Get Post Ideas and Captions for Any Topic
        </Typography>
        <TextField
          label="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          fullWidth
          margin="normal"
        />
        <LoadingButton
          disabled={!topic}
          loading={ideadGenerating}
          variant="outlined"
          color="primary"
          onClick={() => {
            handleGetIdea(topic);
          }}
        >
          Generate Post Ideas
        </LoadingButton>

        <Grid mt={2} container spacing={3}>
          {ideaSelected ? (
            <>
              <Grid item xs={12}>
                <CaptionCard isHighlight caption={ideaSelected} />
              </Grid>
              {Array.isArray(captions) &&
                captions.map((caption, index) => (
                  <Grid item xs={12} sm={12} md={6} lg={6} key={index}>
                    <CaptionCard
                      caption={caption}
                      saving={saving}
                      onSave={handleSave}
                    />
                  </Grid>
                ))}
            </>
          ) : (
            Array.isArray(ideas) &&
            ideas.map((idea, index) => (
              <Grid item xs={12} sm={12} md={6} lg={6} key={index}>
                <CaptionCard
                  caption={idea}
                  onSelectIdea={() => handleGenerate(idea)}
                />
              </Grid>
            ))
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GetPostIdeas;
