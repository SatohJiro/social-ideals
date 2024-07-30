import { useDispatch } from "react-redux";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { toggleTheme } from "@/redux/actions/theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <ListItem onClick={handleToggleTheme}>
      <ListItemIcon>
        <IconButton color="inherit" sx={{ padding: 0, margin: 0 }}>
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </ListItemIcon>
      <ListItemText primary="Switch mode" />
    </ListItem>
  );
};

export default ThemeToggleButton;
