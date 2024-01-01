import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "../PostStats";
import { useUserContext } from "../../context/AuthContext";
import { List, Image, Box, Flex, Text } from "@mantine/core";
import globalClasses from "./../../style/Style.module.css";
import classes from "./GridPostList.module.css";
import iconProfilePlaceholder from "./../../assets/icons/profile-placeholder.svg";
type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <List className={globalClasses.gridContainer}>
      {posts.map((post) => (
        <List.Item key={post.$id} className={classes.listContainer}>
          <Link
            to={`/posts/${post.$id}`}
            className={globalClasses.gridPostlink}
          >
            <Image
              src={post.imageUrl}
              alt="post"
              className={globalClasses.postImage}
            />
          </Link>

          <Box className={globalClasses.gridPostUser}>
            {showUser && (
              <Flex
                align="center"
                justify="flex-start"
                gap={2}
                style={{ flex: "1" }}
              >
                <Image
                  src={post.creator.imageUrl || iconProfilePlaceholder}
                  alt="creator"
                  w="2rem"
                  h="2rem"
                  style={{ borderRadius: "50%" }}
                />
                <Text className={globalClasses.lineClamp}>
                  {post.creator.name}
                </Text>
              </Flex>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </Box>
        </List.Item>
      ))}
    </List>
  );
};

export default GridPostList;
