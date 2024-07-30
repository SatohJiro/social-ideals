import { Box, Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
    </Box>
  );
};

export default PageNotFound;
