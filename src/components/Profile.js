import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const Profile = () => {
  const { data } = useGlobalContext();
  console.log()

  return (
    <Link to="/">
      <div>Profile</div>
    </Link>
  );
};

export default Profile;
