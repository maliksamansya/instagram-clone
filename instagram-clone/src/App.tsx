import { useState } from "react";
import { Container } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import { Home } from "./_root/pages";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Container
        px={0}
        styles={() => ({
          root: {
            display: "flex",
            height: "100vh",
            margin: 0,
          },
        })}
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
      </Container>
    </>
  );
}

export default App;
