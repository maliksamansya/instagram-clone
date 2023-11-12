import { TextInput, Box, Image, Text, Button, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import imageLogo from "./../../assets/images/image-logo.svg";
import classes from "./SignupForm.module.css";
import { Link } from "react-router-dom";
import { createUserAccount } from "../../lib/appwrite/api";

const SignupForm = () => {
  const form = useForm({
    // initialValues: {
    //   email: "",
    //   // termsOfService: false,
    // },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const isUserLoading = false;
  const submitForm = async (values) => {
    const newUser = await createUserAccount(values);
    console.log(newUser);
    // console.log(values);
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
              isUserLoading ? (
                <Loader size={14} color="rgba(255, 255, 255, 0.95)" />
              ) : (
                ""
              )
            }
          >
            {isUserLoading ? "Loading..." : "Sign up"}
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
