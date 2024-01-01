import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Flex, Image, Text } from "@mantine/core";
import globalClasses from "./../../style/Style.module.css";
import { useMediaQuery } from "@mantine/hooks";
import iconLike from "./../../assets/icons/like.svg";
import iconLiked from "./../../assets/icons/liked.svg";
import iconSave from "./../../assets/icons/save.svg";
import iconSaved from "./../../assets/icons/saved.svg";
import { checkIsLiked } from "../../lib/utils";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "../../lib/react-query/queries";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const lg = useMediaQuery("(min-width: 1024px)");
  const location = useLocation();
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "100%"
    : "";
  return (
    <Flex
      align="center"
      justify="space-between"
      style={{ zIndex: "20", width: containerStyles }}
    >
      <Flex gap={5}>
        <Image
          src={checkIsLiked(likes, userId) ? iconLiked : iconLike}
          alt="like"
          w={20}
          h={20}
          onClick={(e) => handleLikePost(e)}
          style={{ cursor: "pointer" }}
        />
        <Text
          className={lg ? globalClasses.baseMedium : globalClasses.smallMedium}
        >
          {likes.length}
        </Text>
      </Flex>

      <Flex gap={2}>
        <Image
          src={isSaved ? iconSaved : iconSave}
          alt="share"
          w={20}
          h={20}
          style={{ cursor: "pointer" }}
          onClick={(e) => handleSavePost(e)}
        />
      </Flex>
    </Flex>
  );
};

export default PostStats;
