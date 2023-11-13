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
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              // height: "100vh",
              // overflowY: "hidden",
              // overflowY: "auto",
            }}
          >
            <Box
              py={10}
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Outlet />
            </Box>
            <Image
              src={imageSidebar}
              alt="Logo"
              className={classes.imageSidebar}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default AuthLayout;
