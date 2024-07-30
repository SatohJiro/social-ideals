import {
  TextField,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CaptionCard from "./common/CaptionCard";
import { SOCIAL_NETWORK_PROVIDER, TONES } from "@/constants";

const CreateCaptions = ({
  postCapPayload,
  handleChangePostCapPayload,
  handleGenerateCaptions,
  status,
  handleSave,
}) => {
  const { captions, loading, saving } = status;
  return (
    <Card
      sx={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(15px)",
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Create Captions from Scratch
        </Typography>
        <TextField
          select
          label="Social Media Provider"
          value={postCapPayload.socialNetwork}
          onChange={(e) =>
            handleChangePostCapPayload({ socialNetwork: e.target.value })
          }
          fullWidth
          margin="normal"
        >
          {SOCIAL_NETWORK_PROVIDER.map((provider) => (
            <MenuItem key={provider} value={provider}>
              {provider}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Subject"
          value={postCapPayload.subject}
          onChange={(e) =>
            handleChangePostCapPayload({ subject: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Caption Tone"
          value={postCapPayload.tone}
          onChange={(e) => handleChangePostCapPayload({ tone: e.target.value })}
          fullWidth
          margin="normal"
        >
          {TONES.map((tone) => (
            <MenuItem key={tone} value={tone}>
              {tone}
            </MenuItem>
          ))}
        </TextField>
        <LoadingButton
          disabled={!postCapPayload.subject}
          loading={loading}
          variant="outlined"
          color="primary"
          onClick={handleGenerateCaptions}
        >
          Generate Captions
        </LoadingButton>
        <Grid mt={2} container spacing={3}>
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
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CreateCaptions;
