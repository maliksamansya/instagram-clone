import { Models } from "appwrite";
import { Link } from "react-router-dom";
import globalClasses from "./../../../../style/Style.module.css";
import { Button, Image, Flex, Text } from "@mantine/core";
import iconProfilePlaceHolder from "./../../../../assets/icons/icon-profile-placeholder.svg";
type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className={globalClasses.userCard}>
      <Image
        src={user.imageUrl || iconProfilePlaceHolder}
        alt="creator"
        w="3.5rem"
        h="3.5rem"
        className={globalClasses.borderRadius}
      />

      <Flex gap={1} align={"center"} direction={"column"}>
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
        className={globalClasses.shadButtonPrimary}
      >
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
