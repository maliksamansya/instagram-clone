import { Models } from "appwrite";
import { Box, Loader, Text, Button, Flex, Image, List } from "@mantine/core";
import {
  useGetRecentPosts,
  useGetUsers,
} from "../../../lib/react-query/queries";
import classes from "./Home.module.css";
import globalClasses from "./../../../style/Style.module.css";
import { useUserContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { multiFormatDateString } from "../../../lib/utils";
import PostStats from "./PostStats";
import { useMediaQuery } from "@mantine/hooks";
import UserCard from "./UserCard";
import iconEdit from "./../../../assets/icons/edit.svg";
import iconProfilePlaceHolder from "./../../../assets/icons/profile-placeholder.svg";
const Home = () => {
  const lg = useMediaQuery("(min-width: 1024px)");
  const { user } = useUserContext();
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  if (isErrorPosts || isErrorCreators) {
    return (
      <Box className={classes.container}>
        <Box
          className={`${globalClasses.homeContainer} ${globalClasses.customScrollbar}`}
        >
          <Text className={globalClasses.bodyMedium}>
            Something bad happened
          </Text>
        </Box>
        <Box
          className={`${globalClasses.homeCreators} ${globalClasses.customScrollbar}`}
        >
          <Text className={globalClasses.bodyMedium}>
            Something bad happened
          </Text>
        </Box>
      </Box>
    );
  }
  return (
    <Box className={classes.container}>
      <Box className={globalClasses.homeContainer}>
        <Box className={classes.homePosts}>
          <Text className={classes.textHome}>Home Feed</Text>
          {isPostLoading && !posts ? (
            <Loader color="blue" />
          ) : (
            <List className={classes.listContainer}>
              {posts?.documents.map((post: Models.Document) => (
                <List.Item key={post.$id} className={classes.listText}>
                  {/* <PostCard post={post} /> */}
                  {/* {post.caption} */}
                  {!post.creator ? (
                    <Box></Box>
                  ) : (
                    <Box className={classes.postCard}>
                      <Box className={globalClasses.flexBetween}>
                        <Flex align="center" gap={3}>
                          <Link to={`/profile/${post.creator.$id}`}>
                            <Image
                              src={
                                post.creator?.imageUrl || iconProfilePlaceHolder
                              }
                              alt="creator"
                              className={classes.imagePost}
                            />
                          </Link>

                          <Flex direction="column">
                            <Text
                              c="#FFFFFF"
                              className={
                                lg
                                  ? globalClasses.bodyBold
                                  : globalClasses.baseMedium
                              }
                            >
                              {post.creator.name}
                            </Text>
                            <Flex
                              align="center"
                              justify="center"
                              gap="2px"
                              c={"#7878A3"}
                            >
                              <Text
                                className={
                                  lg
                                    ? globalClasses.smallRegular
                                    : globalClasses.subtleSemibold
                                }
                              >
                                {multiFormatDateString(post.$createdAt)}
                              </Text>
                              •
                              <Text
                                className={
                                  lg
                                    ? globalClasses.smallRegular
                                    : globalClasses.subtleSemibold
                                }
                              >
                                {post.location}
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>

                        <Link
                          to={`/update-post/${post.$id}`}
                          style={{
                            display:
                              user.id !== post.creator.$id ? "hidden" : "",
                          }}
                        >
                          <Image
                            src={iconEdit}
                            alt="edit"
                            width={20}
                            height={20}
                          />
                        </Link>
                      </Box>

                      <Link
                        to={`/posts/${post.$id}`}
                        className={classes.captionText}
                      >
                        <Box
                          py="5px"
                          className={
                            lg
                              ? globalClasses.baseMedium
                              : globalClasses.smallMedium
                          }
                        >
                          <Text className={classes.captionText}>
                            {post.caption}
                          </Text>
                          <List mt={2} style={{ display: "flex", gap: "1rem" }}>
                            {post.tags.map((tag: string, index: string) => (
                              <List.Item
                                key={`${tag}${index}`}
                                c={"#7878A3"}
                                className={globalClasses.smallRegular}
                              >
                                #{tag}
                              </List.Item>
                            ))}
                          </List>
                        </Box>

                        <Image
                          src={post.imageUrl || iconProfilePlaceHolder}
                          alt="post image"
                          className={globalClasses.postcardImg}
                        />
                      </Link>

                      <PostStats post={post} userId={user.id} />
                    </Box>
                  )}
                </List.Item>
              ))}
            </List>
          )}
        </Box>
      </Box>
      <Box className={globalClasses.homeCreators}>
        <Text c={"#FFFFFF"} className={globalClasses.h3Bold}>
          Top Creators
        </Text>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <List className={classes.listCreator}>
            {creators?.documents.map((creator) => (
              <List.Item key={creator?.$id}>
                <UserCard user={creator} />
                <Link
                  to={`/profile/${user.$id}`}
                  className={globalClasses.userCard}
                >
                  <Image
                    src={user.imageUrl || iconProfilePlaceHolder}
                    alt="creator"
                    w={14}
                    h={14}
                    className={globalClasses.borderRadius}
                  />

                  <Flex align={"center"} direction={"column"} gap={1}>
                    <Text
                      c={"#FFFFFF"}
                      ta={"center"}
                      className={`${globalClasses.baseMedium} ${globalClasses.lineClamp}`}
                    >
                      {user.name}
                    </Text>
                    <Text
                      ta={"center"}
                      c={"#7878A3"}
                      className={`${globalClasses.smallRegular} ${globalClasses.lineClamp}`}
                    >
                      @{user.username}
                    </Text>
                  </Flex>

                  <Button
                    type="button"
                    size="sm"
                    px={5}
                    className={globalClasses.shadButtonPrimary}
                  >
                    Follow
                  </Button>
                </Link>
              </List.Item>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default Home;
