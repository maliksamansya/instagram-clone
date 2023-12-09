import { Box } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import { Home } from "./_root/pages";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import EditPost from "./_root/pages/EditPost";
import CreatePost from "./_root/pages/CreatePost";

function App() {
  return (
    <>
      <Box miw={375}>
        <Routes>
          {/* public routes */}
          {/* to={`/update-post/${post.$id}`} */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm />} />
            <Route path="/sign-up" element={<SignupForm />} />
          </Route>

          {/* private routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            {/* <Route path="/explore" element={<Explore />} /> */}
            {/* <Route path="/saved" element={<Saved />} /> */}
            {/* <Route path="/all-users" element={<AllUsers />} /> */}
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<EditPost />} />
            {/* <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} /> */}
          </Route>
        </Routes>
      </Box>
    </>
  );
}

export default App;
