import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useGlobalContext } from "../context/context";
import { Avatar, Typography, Toolbar, Box, AppBar } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Search from "@mui/icons-material/Search";

const Navbar = () => {
  const { isDark, handleMode, input, setInput } = useGlobalContext();
  const [isClicked, setIsClicked] = useState(false);

  const isShown = () => {
    setIsClicked(!isClicked);
    setInput("");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={`${isDark && "dark-nav"}`}>
          <Avatar
            alt="Rick&Morty"
            src={`https://pngimg.com/d/rick_morty_PNG39.png`}
            sx={{ width: 56, height: 56 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Rick&Morty API
          </Typography>
          {isClicked ? (
            <>
              <DebounceInput
                minLength={2}
                debounceTimeout={500}
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="w-25 mx-auto my-2 border rounded p-1 ps-2 rounded-end-0"
                placeholder="search by name..."
              />
              <CloseSharpIcon
                onClick={isShown}
                className="fs-2 bg-secondary "
              />
            </>
          ) : (
            <Search onClick={isShown} className="hover fs-3" />
          )}
          {isDark ? (
            <LightModeIcon className="ms-3 fs-3 hover" onClick={handleMode} />
          ) : (
            <DarkModeIcon className="ms-3 fs-3 hover" onClick={handleMode} />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
