import { Outlet, Navigate } from "react-router-dom";
import { Box, Image, Flex } from "@mantine/core";
import imageSidebar from "./../assets/images/image-sidebar.svg";
import imageLogo from "./../assets/images/image-logo.svg";
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
            // align="center"
            // justify="space-between"
            // w="100%"
            style={{
              // width: "100%",
              display: "flex",
              alignItems: "center",
              // justifyContent: "flex-end",
              justifyContent: "space-between",
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
            {/* <Image src={imageLogo} /> */}
          </Box>
        </>
      )}
    </>
  );
};

export default AuthLayout;
