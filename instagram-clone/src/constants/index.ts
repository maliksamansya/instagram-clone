import iconHome from "./../assets/icons/icon-home.svg";
import iconWalpaper from "./../assets/icons/icon-wallpaper.svg";
import iconPeople from "./../assets/icons/icon-people.svg";
import iconBookmark from "./../assets/icons/icon-bookmark.svg";
import iconGalleryAdd from "./../assets/icons/icon-gallery-add.svg";

export const sidebarLinks = [
  {
    imgURL: iconHome,
    route: "/",
    label: "Home",
  },
  {
    imgURL: iconWalpaper,
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: iconPeople,
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: iconBookmark,
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: iconGalleryAdd,
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    imgURL: iconHome,
    route: "/",
    label: "Home",
  },
  {
    imgURL: iconWalpaper,
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: iconBookmark,
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: iconGalleryAdd,
    route: "/create-post",
    label: "Create",
  },
];
