import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestAccessCode,
  resetAuthMessage,
  verifyAccessCode,
} from "@/redux/actions/auth";
import * as ROUTES from "@/constants/routes";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [isCodeSent, setCodeSent] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, authMessage } = auth;

  const navigate = useNavigate();

  const handleRequestCode = async () => {
    try {
      dispatch(requestAccessCode(phoneNumber));
      setCodeSent(true);
    } catch (error) {
      console.error("Error sending access code:", error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      dispatch(verifyAccessCode(phoneNumber, accessCode));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    isAuthenticated && navigate(ROUTES.HOME);
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(resetAuthMessage());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Card
        sx={{
          padding: 4,
          borderRadius: 2,
          maxWidth: 400,
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>

        <TextField
          disabled={isCodeSent}
          label="(+1) Phone Number"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="normal"
        />

        {!isCodeSent && (
          <Button
            variant="contained"
            fullWidth
            onClick={handleRequestCode}
            sx={{ mt: 2 }}
          >
            Request Access Code
          </Button>
        )}
        {isCodeSent && (
          <>
            <TextField
              label="Access Code"
              variant="outlined"
              fullWidth
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              margin="normal"
            />

            <Typography variant="caption" sx={{ padding: "5px" }} color="red">
              {authMessage}
            </Typography>

            <Button
              variant="contained"
              fullWidth
              onClick={handleVerifyCode}
              sx={{ mt: 2 }}
            >
              Verify Access Code
            </Button>
          </>
        )}
      </Card>
    </Box>
  );
};

export default Login;
