import { Box } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import { Home } from "./_root/pages";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

function App() {
  return (
    <>
      <Box
        miw={375}
        // px={0}
        // styles={() => ({
        //   root: {
        //     display: "flex",
        //     height: "100vh",
        //     width: "100%",
        //     margin: 0,
        //     minWidth: "375px",
        //   },
        // })}
      >
        <Routes>
          {/* public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm />} />
            <Route path="/sign-up" element={<SignupForm />} />
          </Route>

          {/* private routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Box>
    </>
  );
}

export default App;
