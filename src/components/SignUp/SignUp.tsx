import { Box, Stack, Typography } from "@mui/material";
import LogInTextField from "../LogInTextField/LogInTextField";











const SignUp = (): JSX.Element => {
    return <Stack direction={"column"} alignItems={"center"} width={"60%"} marginTop={10}>
        <Typography variant="h2" marginBottom={"10px"}>
            The World Needs YOU!
        </Typography>
        <Typography variant="h5">
            Contribute in the well-being of your patients and get rewarded with cryptocurrency
        </Typography>
        <LogInTextField/>
    </Stack>
}


export default SignUp;