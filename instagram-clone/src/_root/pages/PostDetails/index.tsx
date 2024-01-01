import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Loader, Box, Image, Text, Flex, List } from "@mantine/core";
import PostStats from "./../../../components/PostStats";
import {
  useGetPostById,
  useGetUserPosts,
  useDeletePost,
} from "../../../lib/react-query/queries";
// src={"/assets/icons/back.svg"}
import iconBack from "./../../../assets/icons/back.svg";
import iconProfilePlaceholder from "./../../../assets/icons/profile-placeholder.svg";
import iconDelete from "./../../../assets/icons/delete.svg";
import iconEdit from "./../../../assets/icons/edit.svg";
import { multiFormatDateString } from "../../../lib/utils";
import { useUserContext } from "../../../context/AuthContext";
import GridPostList from "../../../components/GridPostList";
import globalClasses from "./../../../style/Style.module.css";
import classes from "./PostDetails.module.css";
import { useMediaQuery } from "@mantine/hooks";

const PostDetails = () => {
  const lg = useMediaQuery("(min-width: 1024px)");
  const md = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: post, isLoading } = useGetPostById(id);
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  );
  const { mutate: deletePost } = useDeletePost();

  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== id
  );

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  };

  return (
    <Box
      className={`${globalClasses.postDetailsContainer} ${globalClasses.customScrollbar}`}
    >
      <Box className={classes.btnContainer}>
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className={globalClasses.shadButtonGhost}
        >
          <Image src={iconBack} alt="back" w={24} h={24} />
          <Text
            className={
              lg ? globalClasses.baseMedium : globalClasses.smallMedium
            }
          >
            Back
          </Text>
        </Button>
      </Box>
      {isLoading || !post ? (
        <Loader />
      ) : (
        <Box className={globalClasses.postDetailsCard}>
          <Image
            src={post?.imageUrl}
            alt="creator"
            className={globalClasses.postDetailsImg}
          />

          <Box className={globalClasses.postDetailsInfo}>
            <Flex justify="space-between" w={"100%"}>
              <Link
                to={`/profile/${post?.creator.$id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <Image
                  src={post?.creator.imageUrl || iconProfilePlaceholder}
                  alt="creator"
                  className={classes.iconPlaceholder}
                />
                <Flex gap={1} direction="column">
                  <Text
                    c={"#FFFFFF"}
                    className={
                      lg ? globalClasses.bodyBold : globalClasses.bodyMedium
                    }
                  >
                    {post?.creator.name}
                  </Text>
                  <Flex gap={2} justify="center" align="center" c={"#7878A3"}>
                    <Text
                      className={
                        lg
                          ? globalClasses.smallRegular
                          : globalClasses.subtleSemibold
                      }
                    >
                      {multiFormatDateString(post?.$createdAt)}
                    </Text>
                    •
                    <Text
                      className={
                        lg
                          ? globalClasses.smallRegular
                          : globalClasses.subtleSemibold
                      }
                    >
                      {post?.location}
                    </Text>
                  </Flex>
                </Flex>
              </Link>

              <Flex align="center" justify="center" gap={4}>
                <Link
                  to={`/update-post/${post?.$id}`}
                  style={{
                    display: user.id !== post?.creator.$id ? "none" : "",
                  }}
                >
                  <Image src={iconEdit} alt="edit" w={24} h={24} />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  style={{
                    display: user.id !== post?.creator.$id ? "none" : "",
                  }}
                  // className={`ost_details-delete_btn`}
                >
                  <Image src={iconDelete} alt="delete" w={24} h={24} />
                </Button>
              </Flex>
            </Flex>

            <hr className={classes.lineBreak} />

            <Flex
              direction="column"
              className={
                lg ? globalClasses.baseRegular : globalClasses.smallMedium
              }
              style={{ flex: "1", width: "100%" }}
            >
              <Text>{post?.caption}</Text>
              <List className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <List.Item
                    key={`${tag}${index}`}
                    c={"#7878A3"}
                    className={globalClasses.smallRegular}
                  >
                    #{tag}
                  </List.Item>
                ))}
              </List>
            </Flex>

            <Box w={"100%"}>
              <PostStats post={post} userId={user.id} />
            </Box>
          </Box>
        </Box>
      )}
      <Box w={"100%"} maw={"64rem"}>
        <hr className={classes.lineBreak} />

        <Text
          w={"100%"}
          my={10}
          className={md ? globalClasses.h3Bold : globalClasses.bodyBold}
        >
          More Related Posts
        </Text>
        {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <GridPostList posts={relatedPosts} />
        )}
      </Box>
    </Box>
  );
};

export default PostDetails;
