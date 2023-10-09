import React from "react";
import { useGlobalContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Badge, Button, Skeleton, Tooltip, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import PersonIcon from "@mui/icons-material/Person";
import WcIcon from "@mui/icons-material/Wc";
import VideocamIcon from "@mui/icons-material/Videocam";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import StarIcon from "@mui/icons-material/Star";
import PetsIcon from "@mui/icons-material/Pets";
import Navbar from "./Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const { character, isDark, popular, loading } = useGlobalContext();
  const {
    name,
    species,
    status,
    gender,
    id,
    origin,
    location,
    image,
    episode,
  } = character;
  console.log(loading, "<- loading");

  const refresh = () => {
    window.location.reload();
  };

  if (!Object.keys(character).length) {
    return (
      <div className={`wrapper ${isDark && "bg-black text-white"}`}>
        <ErrorOutlineIcon className="icon" />
        <p>404 Error!</p>
        <h1>No data found</h1>
        <div className="w-25 mx-auto d-flex justify-content-between mt-5">
          <Button onClick={() => navigate("/")}>
            <KeyboardBackspaceIcon />
          </Button>
          <Button onClick={() => refresh()}>
            <RefreshIcon />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="d-flex flex-column justify-content-center align-items-center pt-5">
        <h3>{name} profile</h3>
        <button
          className="rounded-5 m-0 p-2 border border-0 position-absolute back"
          onClick={() => navigate("/")}
        >
          <KeyboardArrowLeftIcon className="fs-3" />
        </button>
        <Card sx={{ width: 400, marginTop: "30px" }}>
          <CardHeader
            avatar={
              <Badge
                badgeContent={id}
                color="primary"
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Avatar
                  sx={{ bgcolor: red[500], width: "45px", height: "45px" }}
                  aria-label="profile-img"
                  src={image}
                ></Avatar>
              </Badge>
            }
            title={name}
            subheader={
              origin.name === "unknown" ? (
                <p>
                  N/G
                  <DoNotDisturbAltIcon className="fs-6 ms-2 mb-1 text-danger" />
                </p>
              ) : (
                origin.name
              )
            }
          />
          <CardContent className="mt-3 p-3 profile-info">
            <p className="text-secondary">
              <Tooltip title="Name" placement="top">
                <PersonIcon className="text-secondary mb-2 mx-2 " />
                {name}
              </Tooltip>
            </p>
            <p className="text-secondary">
              <Tooltip title="Location" placement="top">
                <a href={location?.url}>
                  <LocationOnIcon className="text-secondary mb-2 mx-2" />
                </a>
              </Tooltip>
              {location?.name}
            </p>
            <p className="text-secondary">
              <Tooltip title="Status" placement="top">
                <HealthAndSafetyIcon className="text-secondary mb-2 mx-2" />
                {status}
              </Tooltip>
            </p>
            <p className="text-secondary">
              <Tooltip title="Species" placement="top">
                <PetsIcon className="text-secondary mb-2 mx-2" />
                {species}
              </Tooltip>
            </p>
            <p className="text-secondary">
              <Tooltip title="Gender" placement="top">
                <WcIcon className="text-secondary mb-2 mx-2" />
                {gender}
              </Tooltip>
            </p>
            <p className="text-secondary">
              <Tooltip title="Episode (pcs)" placement="top">
                <VideocamIcon className="text-secondary mb-1 mx-2" />

                {episode.length}
                {episode.length === popular && (
                  <>
                    (<StarIcon className="star" />)
                  </>
                )}
              </Tooltip>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Profile;
