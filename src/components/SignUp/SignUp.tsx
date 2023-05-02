import { Box, Button, CircularProgress, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import LogInTextField from "../LogInTextField/LogInTextField";
import { Check, ErrorOutline, Key, Padding, Password, Person4, Visibility, VisibilityOff } from "@mui/icons-material";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';
import { TextField } from 'formik-mui';
import { error } from "console";


const SignUp = (): JSX.Element => {

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const theme = useTheme();

    const handleClickShowPassword = () => {
        setShowPassword(old => !old)
    }

    const [errors, setErrors] = useState<Record<string, string>>({})

    const [showUsernameSearching, setShowUsernameSearching] = useState<boolean>(false);

    return <Stack direction={"column"} alignItems={"center"} width={"60%"} marginTop={10} position={"relative"}>
        <Typography variant="h2" marginBottom={"10px"}>
            The World Needs YOU!
        </Typography>
        <Typography variant="h5" marginBottom={5}>
            Contribute in the well-being of your patients and get rewarded with cryptocurrency
        </Typography>

        <Box sx={{ width: "100%", padding: "50px 100px" }}>

            <Formik
                initialValues={{
                    username: "",
                    password: "",
                    confirmPassword: ""
                }}
                onSubmit={(values) => console.log("submitted values: ", values)}
                validate={(values) => {
                    // setShowUsernameSearching(true)
                    // setTimeout(() => {
                    //     setShowUsernameSearching(false)
                    // }, 1000)
                }}
            >

                <Form>
                    <Field
                        name="username"
                        label="username"
                        type="text"
                        component={TextField}
                        margin="normal"
                        fullWidth
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Person4 />
                            </InputAdornment>),
                            endAdornment: <InputAdornment position="start">
                                <CircularProgress sx={{ display: showUsernameSearching ? '' : "none" }} size={20} />
                                <Check sx={{ display: showUsernameSearching ? 'none' : "" }} color={"primary"} />
                            </InputAdornment>,
                        }}
                        onBlur={() => console.log("yes blurred")}
                        required
                        color={!showUsernameSearching ? "primary" : "error"}
                    />
                    <Field
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        component={TextField}
                        margin="normal"
                        fullWidth
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Key />
                            </InputAdornment>),
                            endAdornment: (
                                (<InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>)
                            )
                        }}
                        required
                    />
                    <Field
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        component={TextField}
                        margin="normal"
                        fullWidth
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Key />
                            </InputAdornment>),
                            endAdornment: (
                                (<InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>)
                            )
                        }}
                        required
                    />
                    <Button
                        endIcon={<ArrowForwardIcon fontSize="large" />}
                        variant="contained"
                        disableElevation
                        size="large"
                        sx={{ fontSize: "2rem", padding: "5px 50px", margin: "10px auto", display: "flex" }}
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </Form>
            </Formik>
            <Typography variant="body2">
                Already have an account? <a>Log In</a>
            </Typography>
        </Box>

        <Stack position={"absolute"} bottom={"20px"} direction={"row"} alignItems={"center"} sx={{
            backgroundColor: theme.palette.secondary.main,
            margin: "0px 30px",
            borderRadius: "10px",
            padding: "5px 20px"
        }}>
            <ErrorOutline color="primary" fontSize="large" sx={{ marginRight: "30px" }} />
            <Typography variant="body1" fontWeight={700} color={theme.palette.primary.main}>
                My EHR will automatically create a wallet associated with your account, after signing up, you will receive your private key, anyone having your private key will have access to your savings! So please be careful
            </Typography>
        </Stack>

    </Stack>
}


export default SignUp;