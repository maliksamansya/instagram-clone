import {
  Box,
  Flex,
  Image,
  Loader,
  Text,
  Button,
  Textarea,
  TextInput,
  Group,
  rem,
} from "@mantine/core";
import {
  Dropzone,
  DropzoneProps,
  IMAGE_MIME_TYPE,
  FileWithPath,
} from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { useUserContext, INITIAL_USER } from "./../context/AuthContext";
import iconAddPost from "./../assets/icons/add-post.svg";
// import iconFileUpload from "./../assets/icons/file-upload.svg";
import {
  Link,
  useNavigate,
  useLocation,
  NavLink,
  useSearchParams,
} from "react-router-dom";
import {
  useCreatePost,
  useSignOutAccount,
  useUpdatePost,
} from "../lib/react-query/queries";
import imageLogo from "./../assets/images/image-logo.svg";
import iconLogout from "./../assets/icons/icon-logout.svg";
import iconPlaceholder from "./../assets/icons/icon-profile-placeholder.svg";
import classes from "./RootLayout.module.css";
import { sidebarLinks, bottombarLinks } from "../constants";
import { INavLink } from "./../types";
import { useForm } from "@mantine/form";
import { Home } from "./pages";

const RootLayout = () => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const subPage = searchParams.get("subPage");

  const form = useForm({
    initialValues: {
      // email: "",
      caption: "",
      tags: "",
      location: "",
      // termsOfService: false,
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        className={classes.imgPreview}
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  // Query
  const { mutateAsync: createPost, isLoading: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isLoading: isLoadingUpdate } =
    useUpdatePost();

  const handleSubmit = async (values) => {
    console.log(values, "<<<<<");
    const newPost = await createPost({
      ...values,
      userId: user.id,
      file: files,
    });
    if (!newPost) {
      console.log("Errorr!!!!");
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    console.log(subPage);
    if (isSuccess) navigate(0);
    if (files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFileUrl(imageUrl);
    }
  }, [isSuccess, subPage, navigate, files]);

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
                  onSubmit={form.onSubmit((values) => handleSubmit(values))}
                  className={classes.postFormContainer}
                >
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
                    {...form.getInputProps("caption")}
                  />
                  {/* Add Photos */}
                  <Box className={classes.dropContainer}>
                    {previews.length !== 0 ? (
                      <>
                        <Box className={classes.imgPreviewContainer}>
                          {previews}
                        </Box>
                        <Text className={classes.dragText}>
                          Click or drag photo to replace
                        </Text>
                      </>
                    ) : (
                      <Dropzone
                        className={classes.dropZone}
                        onDrop={setFiles}
                        onReject={(files) =>
                          console.log("rejected files", files)
                        }
                        maxSize={5 * 1024 ** 2}
                        accept={IMAGE_MIME_TYPE}
                        // {...props}
                      >
                        <Group
                          justify="center"
                          gap="xl"
                          mih={220}
                          style={{ pointerEvents: "none" }}
                        >
                          <Dropzone.Accept>
                            <IconUpload
                              style={{
                                width: rem(52),
                                height: rem(52),
                                color: "var(--mantine-color-blue-6)",
                              }}
                              stroke={1.5}
                            />
                          </Dropzone.Accept>
                          <Dropzone.Reject>
                            <IconX
                              style={{
                                width: rem(52),
                                height: rem(52),
                                color: "var(--mantine-color-red-6)",
                              }}
                              stroke={1.5}
                            />
                          </Dropzone.Reject>
                          <Dropzone.Idle>
                            <IconPhoto
                              style={{
                                width: rem(52),
                                height: rem(52),
                                color: "var(--mantine-color-dimmed)",
                              }}
                              stroke={1.5}
                            />
                          </Dropzone.Idle>

                          <div>
                            <Text size="xl" inline c="#efefef">
                              Drag images here or click to select files
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                              Attach as many files as you like, each file should
                              not exceed 5mb
                            </Text>
                          </div>
                        </Group>
                      </Dropzone>
                    )}
                  </Box>

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
                    {...form.getInputProps("location")}
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
                    {...form.getInputProps("tags")}
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
          {subPage === null && <Home />}
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
