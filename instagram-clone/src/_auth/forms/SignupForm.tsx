import { TextInput, Box, Image, Text, Button, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import imageLogo from "./../../assets/images/image-logo.svg";
import classes from "./SignupForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";
import { INewUser } from "./../../types";

const SignupForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      // termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  // Queries
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccount();

  const submitForm = async (user: INewUser) => {
    const newUser = await createUserAccount(user);

    if (!newUser) {
      console.log("error");
      // toast({ title: "Sign up failed. Please try again.", });
      return;
    }
    const session = await signInAccount({
      email: user.email,
      password: user.password,
    });

    if (!session) {
      // toast({ title: "Something went wrong. Please login your new account", });
      console.log("somethine went wrong");
      navigate("/sign-in");

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
            label="Name"
            name="name"
            type="text"
            {...form.getInputProps("name")}
            classNames={{ input: classes.input }}
            styles={{ label: { color: "white" } }}
          />
          <TextInput
            withAsterisk
            label="Username"
            name="username"
            type="text"
            classNames={{ input: classes.input }}
            styles={{ label: { color: "white" } }}
            {...form.getInputProps("username")}
          />
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
              isCreatingAccount || isUserLoading || isSigningInUser ? (
                <Loader size={14} color="rgba(255, 255, 255, 0.95)" />
              ) : (
                ""
              )
            }
          >
            {isCreatingAccount || isUserLoading || isSigningInUser
              ? "Loading..."
              : "Sign up"}
          </Button>

          <Text className={classes.logInText}>
            Already have an account?
            <Link to="/sign-in" className={classes.linkText}>
              Log in
            </Link>
          </Text>
        </form>
      </Box>
    </>
  );
};

export default SignupForm;
