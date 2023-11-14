import { Box, Flex, Image } from "@mantine/core";
import { useEffect } from "react";
import { useUserContext } from "./../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "../lib/react-query/queriesAndMutations";
import imageLogo from "./../assets/images/image-logo.svg";
import iconLogout from "./../assets/icons/icon-logout.svg";
import iconPlaceholder from "./../assets/icons/icon-profile-placeholder.svg";
import classes from "./RootLayout.module.css";
const RootLayout = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <>
      {/* <Button color="lime" fullWidth>
        Button
      </Button> */}
      <Box style={{ width: "100%" }}>
        {/* Topbar */}
        <Box className={classes.topbar}>
          <Flex align="center" justify="space-between" py="1rem" px="1.25rem">
            <Link to="/" className={classes.link}>
              <Image src={imageLogo} w={130} alt="logo" />
            </Link>

            <Flex gap="1rem">
              <Image src={iconLogout} alt="logout" onClick={() => signOut} />
              <Link to={`/profile/${user.id}`} className={classes.link}>
                <Image
                  src={user.imageUrl || iconPlaceholder}
                  alt="profile"
                  className={classes.profileImg}
                />
              </Link>
            </Flex>
          </Flex>
        </Box>
      </Box>
      {/* <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div> */}
    </>
  );
};

export default RootLayout;
