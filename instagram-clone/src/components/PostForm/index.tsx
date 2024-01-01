import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Textarea,
  TextInput,
  Group,
  rem,
  Loader,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import classes from "./../../_root/RootLayout.module.css";
import { Models } from "appwrite";
import { useNavigate } from "react-router-dom";
import {
  useCreatePost,
  useSignOutAccount,
  useUpdatePost,
} from "../../lib/react-query/queries";
import { useUserContext } from "../../context/AuthContext";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};
const PostForm = ({ post, action }: PostFormProps) => {
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [fileUrl, setFileUrl] = useState<string>("");
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { isSuccess } = useSignOutAccount();
  //   caption: post ? post?.caption : "",
  //   file: [],
  //   location: post ? post.location : "",
  //   tags: post ? post.tags.join(",") : "",
  const form = useForm({
    initialValues: {
      caption: post ? post?.caption : "",
      tags: post ? post.tags.join(",") : "",
      location: post ? post.location : "",
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
  const { mutateAsync: createPost } = useCreatePost();
  const { mutateAsync: updatePost } = useUpdatePost();

  const handleSubmit = async (values) => {
    try {
      // ACTION = UPDATE
      if (post && action === "Update") {
        setIsLoadingUpdate(true);
        const updatedPost = await updatePost({
          ...values,
          postId: post.$id,
          imageId: post.imageId,
          imageUrl: post.imageUrl,
          file: files,
        });

        if (!updatedPost) {
          //   toast({
          //     title: `${action} post failed. Please try again.`,
          //   });
          console.log(`${action} post failed. Please try again.`);
        }
        return navigate(`/posts/${post.$id}`);
      }

      // ACTION = CREATE
      setIsLoadingCreate(true);
      const newPost = await createPost({
        ...values,
        userId: user.id,
        file: files,
      });

      if (!newPost) {
        //   toast({
        //     title: `${action} post failed. Please try again.`,
        //   });
        console.log(`${action} post failed. Please try again.`);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingUpdate(false);
      setIsLoadingCreate(false);
    }
  };
  useEffect(() => {
    if (isSuccess) navigate(0);
    if (files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFileUrl(imageUrl);
    }
  }, [isSuccess, navigate, files]);
  return (
    <>
      {/* <Box className={classes.createPostContainer}>
        <Box
          className={`${classes.commonContainer} ${classes.customScrollbar}`}
        >
          <Box className={classes.container3}>
            <Image src={iconAddPost} w={36} h={36} alt="add" />
            <Text className={classes.textCreatePost}>Create Post</Text>
          </Box> */}
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
          {previews.length !== 0 || post?.imageUrl ? (
            <>
              {previews.length !== 0 && (
                <Box className={classes.imgPreviewContainer}>{previews}</Box>
              )}
              {post?.imageUrl && previews.length === 0 && (
                <Image
                  src={post?.imageUrl}
                  className={classes.imgPreviewContainer}
                />
              )}
              <Dropzone
                accept={IMAGE_MIME_TYPE}
                onDrop={setFiles}
                style={{ backgroundColor: "#101012" }}
              >
                <Text ta="center" className={classes.dragText}>
                  Click or drag photo to replace
                </Text>
              </Dropzone>
            </>
          ) : (
            <Dropzone
              className={classes.dropZone}
              onDrop={setFiles}
              onReject={(files) => console.log("rejected files", files)}
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
                    Attach as many files as you like, each file should not
                    exceed 5mb
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
          <Button
            type="submit"
            className={classes.submitButton}
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            {action} Post
          </Button>
        </Box>
      </form>
      {/* </Box>
      </Box> */}
    </>
  );
};

export default PostForm;
