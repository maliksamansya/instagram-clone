import { TextInput, Box, Image, Text, Button, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import imageLogo from "./../../assets/images/image-logo.svg";
import classes from "./SignupForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSignInAccount } from "../../lib/react-query/queries";
import { useUserContext } from "../../context/AuthContext";

type User = {
  email: string;
  password: string;
};
const SigninForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      // termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const { mutateAsync: signInAccount, isPending: isLoading } =
    useSignInAccount();

  const submitForm = async (user: User) => {
    const session = await signInAccount({
      email: user.email,
      password: user.password,
    });

    if (!session) {
      // toast({ title: "Something went wrong. Please login your new account", });
      console.log("somethine went wrong");
      return;
    }

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      // toast({ title: "Login failed. Please try again.", });

      return;
    }
  };

  return (
    <>
      <Box className={classes.container}>
        <Image src={imageLogo} alt="logo" />
        <Text className={classes.accountText}>Create a new account</Text>
        <Text className={classes.detailText}>
          To use snapgram, Please enter your details
        </Text>

        <form
          onSubmit={form.onSubmit((values) => submitForm(values))}
          className={classes.formContainer}
        >
          <TextInput
            withAsterisk
            label="Email"
            name="email"
            type="text"
            classNames={{ input: classes.input }}
            styles={{ label: { color: "white" } }}
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="Password"
            name="password"
            type="text"
            classNames={{ input: classes.input }}
            styles={{ label: { color: "white" } }}
            {...form.getInputProps("password")}
          />

          <Button
            type="submit"
            className={classes.buttonSubmit}
            leftSection={
              isUserLoading || isLoading ? (
                <Loader size={14} color="rgba(255, 255, 255, 0.95)" />
              ) : (
                ""
              )
            }
          >
            {isUserLoading || isLoading ? "Loading..." : "Sign in"}
          </Button>

          <Text className={classes.logInText}>
            Don't have an account?
            <Link to="/sign-up" className={classes.linkText}>
              Sign up
            </Link>
          </Text>
        </form>
      </Box>
    </>
  );
};

export default SigninForm;
