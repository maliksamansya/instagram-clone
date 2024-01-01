import { Box, Image, Text } from "@mantine/core";
import classes from "./../../RootLayout.module.css";
import iconAddPost from "./../../../assets/icons/add-post.svg";
import PostForm from "../../../components/PostForm";

const CreatePost = () => {
  return (
    <Box className={classes.createPostContainer}>
      <Box className={`${classes.commonContainer} ${classes.customScrollbar}`}>
        <Box className={classes.container3}>
          <Image src={iconAddPost} w={36} h={36} alt="add" />
          <Text className={classes.textCreatePost}>Create Post</Text>
        </Box>
        {/* PostForm */}
        <PostForm action="Create" />
      </Box>
    </Box>
  );
};

export default CreatePost;
