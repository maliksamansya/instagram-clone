import { Box, Image, Text, Loader, Flex } from "@mantine/core";

import { useGetPostById } from "./../../../lib/react-query/queries";
import { useParams } from "react-router-dom";
import iconEdit from "./../../../assets/icons/edit.svg";
import classes from "./../../RootLayout.module.css";
import PostForm from "../../../components/PostForm";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostById(id);

  if (isLoading)
    return (
      <Flex align="center" justify="center" style={{ flex: "1" }}>
        <Loader />
      </Flex>
    );
  return (
    <Box className={classes.createPostContainer}>
      <Box className={`${classes.commonContainer} ${classes.customScrollbar}`}>
        <Box className={classes.container3}>
          <Image src={iconEdit} w={36} h={36} alt="edit" />
          <Text className={classes.textCreatePost}>Edit Post</Text>
        </Box>
        {/* PostForm */}
        {isLoading ? <Loader /> : <PostForm action="Update" post={post} />}
      </Box>
    </Box>
  );
};

export default EditPost;
