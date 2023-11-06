import { Outlet, Navigate } from "react-router-dom";
import { Box, Image } from "@mantine/core";
import imageSidebar from "./../assets/images/image-sidebar.svg";
import classes from "./AuthLayout.module.css";
const AuthLayout = () => {
  const isAuthenthicated = false;
  return (
    <>
      {isAuthenthicated ? (
        <Navigate to="/" />
      ) : (
        <>
          <Box
            pt={10}
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Outlet />
          </Box>
          <Image
            src={imageSidebar}
            alt="Logo"
            className={classes.imageSidebar}
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
