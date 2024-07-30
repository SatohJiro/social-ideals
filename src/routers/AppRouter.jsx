import { Navigation } from "@/components/layout/index";
import * as ROUTES from "@/constants/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Services from "@/pages/Services";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import PageNotFound from "@/pages/PageNotFound";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import cloudBg from "@/assets/bg-cloud.png";

const AppRouter = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          backgroundImage: `url(${cloudBg})`,
        }}
      >
        {isAuthenticated && <Navigation />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflowY: "auto",
            marginTop: isMdUp ? 0 : "64px",
          }}
        >
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path={ROUTES.HOME} element={<Services />} />
              <Route path={ROUTES.PROFILE} element={<Profile />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default AppRouter;
