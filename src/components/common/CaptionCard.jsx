import { useState } from "react";
import {
  Box,
  Typography,
  CardActions,
  Button,
  Card,
  Modal,
  Fade,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

const CaptionCard = ({
  topic,
  caption,
  saving,
  onSave,
  onUnSave,
  onSelectIdea,
  isHighlight,
}) => {
  const theme = useTheme();
  const [openShareModal, setOpenShareModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(caption);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const shareOnFacebook = () => {
    const facebookUrl = `${
      import.meta.env.VITE_FACEBOOK_SHARE_URL
    }?u=${encodeURIComponent(window.location.href)}`;
    window.open(facebookUrl, "_blank", "noopener,noreferrer");
    setOpenShareModal(false);
  };

  const shareViaEmail = () => {
    const emailSubject = encodeURIComponent("Check out this caption!");
    const emailBody = encodeURIComponent(caption);
    const mailtoUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoUrl;
    setOpenShareModal(false);
  };

  return (
    <Card
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0.01)",
        backdropFilter: "blur(10px)",
      }}
    >
      {isHighlight && <Typography variant="h6">The ideal is</Typography>}
      {topic && <Typography variant="h6">{topic}</Typography>}
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <Typography variant="subtitle2" sx={{ wordBreak: "break-word" }}>
          {caption}
        </Typography>
      </Box>
      <CardActions>
        {onSave && (
          <LoadingButton
            variant="outlined"
            loading={saving}
            onClick={() => onSave(caption)}
          >
            Save
          </LoadingButton>
        )}
        {onUnSave && (
          <LoadingButton variant="outlined" onClick={() => onUnSave(caption)}>
            UnSave
          </LoadingButton>
        )}
        {onSelectIdea ? (
          <Button variant="outlined" onClick={() => onSelectIdea(caption)}>
            Generate Caption
          </Button>
        ) : (
          !isHighlight && (
            <Button variant="outlined" onClick={() => setOpenShareModal(true)}>
              Share
            </Button>
          )
        )}
      </CardActions>

      <Modal
        open={openShareModal}
        onClose={() => setOpenShareModal(false)}
        closeAfterTransition
      >
        <Fade in={openShareModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(15px)",
              boxShadow: 24,
              padding: 4,
              borderRadius: 2,
              textAlign: "center",
              outline: "none",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              fontWeight="bold"
              sx={{ color: theme.palette.text.primary }}
            >
              Share Caption
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  onClick={handleCopyCaption}
                  variant="outlined"
                  sx={{ width: "100%" }}
                >
                  Copy Caption
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={shareOnFacebook}
                  variant="outlined"
                  sx={{ width: "100%" }}
                >
                  Share on Facebook
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={shareViaEmail}
                  variant="outlined"
                  sx={{ width: "100%" }}
                >
                  Share via Email
                </Button>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Button
                onClick={() => setOpenShareModal(false)}
                variant="contained"
              >
                Close
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Caption copied to clipboard!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default CaptionCard;
