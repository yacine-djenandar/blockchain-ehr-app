import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography, List, ListItem, ListItemIcon, Theme } from "@mui/material";
import { dialogProps } from "../../helpers/types";
import { Key, Person2, Save, WarningAmber } from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';



const PhraseDialog = ({ show, okCallBack }: dialogProps): JSX.Element => {

    const theme = useTheme();

    return (
        <>
            <Dialog
                open={show}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-paper": {
                        maxWidth: "40vw"
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h4">
                        About the secret Phrase
                    </Typography>
                </DialogTitle>
                <DialogContent >
                    <DialogContentText id="alert-dialog-description">
                        <Typography sx={{marginBottom: 4}} variant="h6" color={"black"}>
                            Please keep in mind the following:
                        </Typography>
                        <List>
                            <ListItem sx={{marginBottom: 4}}>
                                <ListItemIcon>
                                    <Key sx={{width: 30, height: 30}} />
                                </ListItemIcon>
                                <Typography variant="body1" fontWeight={700} color={"black"}>
                                    This pass phrase will be used to encrypt your private key in order for it to be saved securely, to make recovering it easy in case you lost it.
                                </Typography>
                            </ListItem>
                            <ListItem sx={{marginBottom: 4}} > 
                                <ListItemIcon>
                                    <Save sx={{width: 30, height: 30}} />
                                </ListItemIcon>
                                <Typography variant="body1" fontWeight={700} color={"black"}>
                                    Save this phrase in an internet-less place(write it down in a piece of paper, or save it in a usb drive...)
                                </Typography>
                            </ListItem>
                            <ListItem sx={{marginBottom: 2}}>
                                <ListItemIcon>
                                    <WarningAmber sx={{color: theme.palette.error.light, width: 30, height: 30}} />
                                </ListItemIcon>
                                <Typography variant="body1" fontWeight={700} color={theme.palette.error.light}>
                                    Anyone having this phrase will be able to get your private key and therefore access your wallet! So please be careful.
                                </Typography>
                            </ListItem>
                        </List>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => okCallBack()} autoFocus>
                        Got it
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}



export default PhraseDialog;