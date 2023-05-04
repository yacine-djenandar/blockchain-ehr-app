import { Box, Button, Fab } from "@mui/material";
import { useState, useEffect } from "react";
import {DockRounded, FileDownload, FileCopy, AttachFile, AttachFileOutlined, AutoFixHigh} from "@mui/icons-material"
import { LoadingButton } from "@mui/lab";





const ScannerPage = (): JSX.Element => {


    const [file, setFile] = useState<File | null>(null);

    const [loading, setLoading] = useState<boolean>(false)

    const [showFirstBox, setShowFirstBox] = useState<boolean>(true)

    const handleInputFileChange = () => {
        setLoading(true)
        const input: HTMLInputElement = document.getElementById("file") as HTMLInputElement
        setFile(input.files ? input.files[0] : null);
        setLoading(false);
        if(showFirstBox) setShowFirstBox(false);
    }

    useEffect(() => {
        console.log("file changed: ", file)
        if(file) {
            (document.getElementById("img") as HTMLImageElement).src = URL.createObjectURL(file);
        }
    }, [file])

    return <>
        <Box sx={{width: "100%", height: "100%", position: "relative", display: "grid", placeItems: "center"}}>
            <img id='img' style={{width: "100%", height: '100%', objectFit: "cover"}} />
            <Box sx={{display: showFirstBox ? "" : "none"}}>
                <label htmlFor="file">
                    <LoadingButton loading={loading} variant="text" disableElevation startIcon={<AttachFile/>} onClick={() => document.getElementById("file")?.click()} sx={{width: "20vw", height: "70px", fontSize: "15px"}}>
                        Choose File
                    </LoadingButton>
                </label>
                <input accept="image/*" onChange={handleInputFileChange} style={{display: "none"}} type="file" id="file" name="file" className="file_input" />
            </Box>
            <Fab onClick={() => console.log("sending request")} variant="extended" size="large" color="primary" id="scan-image" sx={{position: "absolute", bottom: "20px", left: "20px"}} >
                <AutoFixHigh sx={{mr: 2}} />
                Start Scanning
            </Fab>
            <Fab variant="extended" size="large" color="primary" id="choose-file" sx={{position: "absolute", bottom: "20px", right: "20px"}} onClick={() => document.getElementById("file")?.click()}>
                <AttachFile sx={{mr: 2}} />
                Choose File
            </Fab>
        </Box>
    </>

}



export default ScannerPage;