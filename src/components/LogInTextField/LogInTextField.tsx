import { InputAdornment, TextField } from "@mui/material";
import {Person4} from "@mui/icons-material"

const LogInTextField = (): JSX.Element => {

    return <>
        <TextField  variant="outlined" label="Username" margin="normal" fullWidth InputProps={{
            startAdornment: <InputAdornment position="start">
                <Person4/>
            </InputAdornment>,
          }} />
    </>
}



export default LogInTextField;