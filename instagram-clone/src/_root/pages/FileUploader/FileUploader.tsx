import { Group, Text, rem, Image, Box } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import {
  Dropzone,
  DropzoneProps,
  IMAGE_MIME_TYPE,
  FileWithPath,
} from "@mantine/dropzone";
import classes from "./FileUploader.module.css";
import { useEffect, useState } from "react";
export function FileUploader(props: Partial<DropzoneProps>) {
  // console.log(props, "<<<< props");
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [fileUrl, setFileUrl] = useState<string>("");
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

  // Set fileUrl when files are updated
  useEffect(() => {
    if (files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFileUrl(imageUrl);
    }
  }, [files]);

  return (
    <>
      <Box className={classes.dropContainer}>
        {previews.length !== 0 ? (
          <>
            <Box className={classes.imgPreviewContainer}>{previews}</Box>
            <Text className={classes.dragText}>
              Click or drag photo to replace
            </Text>
          </>
        ) : (
          <Dropzone
            className={classes.dropZone}
            onDrop={setFiles}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            {...props}
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
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
        )}
      </Box>
    </>
  );
}
