import {
  Box,
  Flex,
  Image,
  Loader,
  Text,
  Button,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useUserContext, INITIAL_USER } from "./../context/AuthContext";
import iconAddPost from "./../assets/icons/add-post.svg";

import {
  Link,
  useNavigate,
  useLocation,
  NavLink,
  useSearchParams,
} from "react-router-dom";
import { FileWithPath, useDropzone } from "react-dropzone";
import { useSignOutAccount } from "../lib/react-query/queriesAndMutations";
import imageLogo from "./../assets/images/image-logo.svg";
import iconLogout from "./../assets/icons/icon-logout.svg";
import iconPlaceholder from "./../assets/icons/icon-profile-placeholder.svg";
import classes from "./RootLayout.module.css";
import { sidebarLinks, bottombarLinks } from "../constants";
import { INavLink } from "./../types";
import { useForm } from "@mantine/form";
import FileUploader from "./pages/FileUploader";

const RootLayout = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const subPage = searchParams.get("subPage");

  const form = useForm({
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  //   accept: {
  //     "image/*": [".png", ".jpeg", ".jpg"],
  //   },
  // });
  useEffect(() => {
    console.log(subPage);
    if (isSuccess) navigate(0);
  }, [isSuccess, subPage, navigate]);

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
                // const isActive = pathname === link.route;
                const isActive = subPage === link.subPage;
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
          {/* Create Post */}
          {subPage === "create-post" && (
            <Box className={classes.createPostContainer}>
              <Box
                className={`${classes.commonContainer} ${classes.customScrollbar}`}
              >
                <Box className={classes.container3}>
                  <Image src={iconAddPost} w={36} h={36} alt="add" />
                  <Text className={classes.textCreatePost}>Create Post</Text>
                </Box>
                {/* PostForm */}
                <form
                  onSubmit={form.onSubmit((values) => console.log(values))}
                  className={classes.postFormContainer}
                >
                  <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps("email")}
                  />
                  <Textarea
                    label="Caption"
                    name="caption"
                    autosize
                    minRows={9}
                    classNames={{
                      // root: classes.root,
                      input: classes.root,
                    }}
                    styles={{
                      label: { color: "white" },
                    }}
                  />
                  {/* Add Photos */}
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    )}
                  </div>

                  {/* <TextInput
                    type="file"
                    label="Add Photos"
                    placeholder="your file"
                    name="file"
                    styles={{
                      label: { color: "white" },
                    }}
                  ></TextInput> */}
                  <TextInput
                    type="text"
                    name="location"
                    label="Add Location"
                    styles={{
                      label: { color: "white" },
                    }}
                    classNames={{
                      input: classes.root,
                    }}
                  />
                  <TextInput
                    type="text"
                    name="tags"
                    label="Add Tags (separated by comma ' , ')"
                    placeholder="Art, Expression, Learn"
                    styles={{
                      label: { color: "white" },
                    }}
                    classNames={{
                      input: classes.root,
                    }}
                  />

                  {/* submit button */}
                  <Box className={classes.submitContainer}>
                    <Button type="button" className={classes.cancelButton}>
                      Cancel
                    </Button>
                    <Button type="submit" className={classes.submitButton}>
                      Submit
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          )}
        </Box>

        {/* Bottom bar */}
        <Box className={classes.bottomBar}>
          {bottombarLinks.map((link) => {
            // const isActive = pathname === link.route;
            const isActive = subPage === link.subPage;
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
