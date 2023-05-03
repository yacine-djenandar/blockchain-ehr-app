import { Box, Button, CircularProgress, IconButton, InputAdornment, Snackbar, Stack, Typography } from "@mui/material";
import LogInTextField from "../LogInTextField/LogInTextField";
import { Check, CopyAll, ErrorOutline, Key, Padding, Password, Person, Person4, Visibility, VisibilityOff, WarningAmber } from "@mui/icons-material";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';
import { TextField } from 'formik-mui';
import { error } from "console";
import randomWords from 'random-words'
import PhraseDialog from "../PhraseDialog/PhraseDialog";

const SignUp = (): JSX.Element => {

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const theme = useTheme();

    const handleClickShowPassword = () => {
        setShowPassword(old => !old)
    }

    const [errors, setErrors] = useState<Record<string, string>>({})

    const [showUsernameSearching, setShowUsernameSearching] = useState<boolean>(false);

    const [wordsList, setWordsList] = useState<string[]>(randomWords(10));

    const [showBlur, setShowBlur] = useState<boolean>(true);

    const [showDialog, setShowDialog] = useState<boolean>(false);

    const [showSnackBar, setShowSnackBar] = useState<boolean>(false);

    const copyToClipboard = (text: string) => {
        setShowSnackBar(true)
        navigator.clipboard.writeText(text);
    }

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
                    <Box sx={{ position: "relative", margin: "30px 0px", border: `2px solid ${theme.palette.primary.main}`, borderRadius: 3 }}>
                        <Typography component={"h5"} variant="h5" sx={{ width: "100%", height: "100%", padding: 2, borderRadius: 3, filter: !showBlur ? "" : "blur(4px)" }}>
                            {wordsList.join(" ")}
                        </Typography>
                        <Box sx={{
                            display: showBlur ? "" : "none",
                            width: "100%", height: "100%",
                            backgroundColor: theme.palette.grey[400], padding: 2,
                            borderRadius: 3, position: "absolute", top: 0, left: 0,
                            opacity: 0.8, backdropFilter: 'blur(100px)'
                        }}>

                            <Button onClick={() => setShowDialog(true)} sx={{
                                position: "absolute", top: "50%", left: "50%",
                                transform: "translate(-50%, -50%)", display: "inline-flex",
                                fontSize: "1rem",
                                fontWeight: "bold"
                            }}
                                variant="text" disableElevation
                                color="primary" startIcon={<WarningAmber sx={{ width: 30, height: 30 }} />}>
                                Reveal Secret phrase
                            </Button>
                        </Box>
                        <IconButton sx={{ visibility: showBlur ? "hidden" : "" }} onClick={() => copyToClipboard(wordsList.join(" "))} color="primary">
                            <CopyAll />
                        </IconButton>
                    </Box>
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
            <Typography variant="h6" textAlign={"center"} marginTop={3}>
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

        <PhraseDialog show={showDialog} okCallBack={() => {
            setShowDialog(false)
            setShowBlur(false)
        }} />

        <Snackbar
            open={showSnackBar}
            autoHideDuration={2000}
            onClose={() => setShowSnackBar(false)}
            message="Copied to clipboard!"
            sx={{
                "& .MuiPaper-root": { backgroundColor: theme.palette.primary.main }
            }}
        />

    </Stack>
}


export default SignUp;