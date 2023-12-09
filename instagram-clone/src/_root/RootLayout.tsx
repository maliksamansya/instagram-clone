import { Box, Flex, Image, Loader, Text } from "@mantine/core";

import { useUserContext } from "./../context/AuthContext";
import { Link, useLocation, NavLink, Outlet } from "react-router-dom";
import { useSignOutAccount } from "../lib/react-query/queries";
import imageLogo from "./../assets/images/image-logo.svg";
import iconLogout from "./../assets/icons/icon-logout.svg";
import iconPlaceholder from "./../assets/icons/icon-profile-placeholder.svg";
import classes from "./RootLayout.module.css";
import { sidebarLinks, bottombarLinks } from "../constants";
import { INavLink } from "./../types";

const RootLayout = () => {
  const { pathname } = useLocation();
  // const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
  // const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user, isLoading } = useUserContext();
  const { mutate: signOut } = useSignOutAccount();

  return (
    <>
      {/* globalContainer */}
      <Box className={classes.container}>
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

        {/* Left side bar */}
        <Box className={classes.leftSidebar}>
          <Flex direction="column" gap="2.75rem">
            <Link to="/" className={classes.link}>
              <Image src={imageLogo} alt="logo" w={170} />
            </Link>

            {isLoading || !user.email ? (
              <Loader color="blue" h="3.5rem" />
            ) : (
              <Link to={`/profile/${user.id}`} className={classes.link}>
                <Image
                  src={user.imageUrl || iconPlaceholder}
                  alt="profile"
                  className={classes.profileImg}
                />
                <Flex direction="column">
                  <Text className={classes.bodyBold} c="white">
                    {user.name}
                  </Text>
                  <Text className={classes.smallRegular}>@{user.username}</Text>
                </Flex>
              </Link>
            )}

            <Flex direction="column" gap="1.5rem">
              {sidebarLinks.map((link: INavLink) => {
                const isActive = pathname === link.route;
                // const isActive = subPage === link.subPage;
                return (
                  <>
                    <Box
                      key={link.label}
                      className={`${classes.leftSidebarLink} ${
                        isActive && classes.leftSidebarLinkBg
                      }`}
                    >
                      <NavLink
                        to={link.route}
                        className={classes.navLinkContainer}
                      >
                        <Image
                          w={24}
                          h={24}
                          src={link.imgURL}
                          alt={link.label}
                          className={`${classes.sidebarIcon} ${
                            isActive && classes.sidebarIconActive
                          }`}
                        />
                        {link.label}
                      </NavLink>
                    </Box>
                  </>
                );
              })}
            </Flex>
          </Flex>

          <Box className={classes.shadButtonGhost} variant="outline">
            <Image src={iconLogout} w={24} h={24} alt="logout" />
            <Text className={classes.logoutText}>Logout</Text>
          </Box>
        </Box>

        {/* outlet */}
        <Box className={classes.outletContainer}>
          <Outlet />
        </Box>

        {/* Bottom bar */}
        <Box className={classes.bottomBar}>
          {bottombarLinks.map((link) => {
            const isActive = pathname === link.route;
            // const isActive = subPage === link.subPage;
            return (
              <>
                <Link
                  to={link.route}
                  className={`${isActive && classes.linkActive} ${
                    classes.linkContainer
                  }`}
                  key={`bottombar-${link.label}`}
                >
                  <Image
                    w={16}
                    h={16}
                    src={link.imgURL}
                    alt={link.label}
                    className={`${isActive && classes.sidebarIconActive}`}
                  />
                  <Text className={classes.textLabel}>{link.label}</Text>
                </Link>
              </>
            );
          })}
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
