import { Button, Box } from "@mantine/core";
import { useEffect } from "react";
import { useUserContext } from "./../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "../lib/react-query/queriesAndMutations";
const RootLayout = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <>
      <Button color="lime" fullWidth>
        Button
      </Button>
      <Box style={{ width: "100%" }}>
        {/* Topbar */}
        <Box></Box>
      </Box>
      {/* <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div> */}
    </>
  );
};

export default RootLayout;
