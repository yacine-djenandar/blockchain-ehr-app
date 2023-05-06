import { Box, CircularProgress, Fab } from "@mui/material";
import { useState, useEffect } from "react";
import { AttachFile, AutoFixHigh, Clear, ClearAll, Delete, FitScreenOutlined, FontDownloadOffOutlined, FontDownloadOutlined } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
import { rectangleData } from "../../helpers/types";
import MyResizableRect from "../../components/MyResizableRect/MyResizableRect";


const ScannerPage = (): JSX.Element => {

    const theme = useTheme();

    const [file, setFile] = useState<File | null>(null);

    const [loading, setLoading] = useState<boolean>(false)

    const [showFirstBox, setShowFirstBox] = useState<boolean>(true)

    const [rectanglesData, setRectanglesData] = useState<rectangleData[]>([]);

    const handleInputFileChange = () => {
        const input: HTMLInputElement = document.getElementById("file") as HTMLInputElement
        if(input.files != null) {
            setFile(input.files[0]);
        }
        if (showFirstBox) setShowFirstBox(false);
    }

    useEffect(() => {
        if (file) {
            (document.getElementById("img") as HTMLImageElement).src = URL.createObjectURL(file);
            setRectanglesData([])
        }
    }, [file])

    useEffect(() => {
        for (let index = 0; index < rectanglesData.length; index++) {
            let element = rectanglesData[index];
            (document.getElementsByClassName("gblcbk")[index] as HTMLElement).style.backgroundColor = (element.selected ? theme.palette.primary.main : "black")
        }
        console.log("end recrs updated!", rectanglesData)
    }, [rectanglesData])

    const updateRectangle = (rectangle: rectangleData, index: number) => {
        let arr = [...rectanglesData]
        arr[index] = {...rectangle}
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            element.selected = false;
        }
        arr[index].selected = true;
        console.log("selected index ==> ", index)
        setRectanglesData(arr)
    }

    const removeSelectedRectangle = () => {
        let arr: rectangleData[] = [...rectanglesData].filter(e => !e.selected);
        const b: boolean = arr.length === rectanglesData.length;
        setRectanglesData([])
        // setRectanglesData(arr)
        // if(!b) 
        setTimeout(() => setRectanglesData(arr), 10)
    }

    const addRectangle = () => {

        let arr = [...rectanglesData]

        arr.push({
            top: 30,
            left: 30,
            width: 80,
            height: 80,
            selected: false,
            text: ""
        })

        setRectanglesData(arr)
    }

    const sendKerasOCRRequest = async () => {

        setRectanglesData([])

        setLoading(true);

        const img = document.getElementById("img")

        const data: FormData = new FormData();

        data.append("file", (file as File));
        data.append("width", !img ? "0" : (img.offsetWidth.toString()))
        data.append("height", !img ? "0" : (img.offsetHeight.toString()))

        const response = await fetch("http://localhost:5000/scanFile", {
            method: "POST",
            mode: "cors",
            body: data,
        }
        )

        let json = await response.json();

        let arr = [];

        for (let i = 0; i < json[0][0].length; i++) {

            let item = json[0][0][i];

            let obj = {
                top: (item[0][1] as number),
                left: (item[0][0] as number),
                width: Math.abs(item[0][0] - item[1][0]),
                height: Math.abs(item[0][1] - item[2][1]),
                selected: false,
                text: ""
            }

            arr.push(obj)
        }

        setRectanglesData(arr)

        setLoading(false);
    }

    let updateTextForItem = (value: string, index: number) => {
        let arr = [...rectanglesData]
        arr[index].text = value;
        setRectanglesData(arr)
    }


    const sendTextDetectionRequest = async () => {
        setLoading(true)
        const response = await fetch("http://localhost:5000/detect", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                filename: (file as File).name,
                rects: rectanglesData
            }),
            // headers: new Headers({"Content-Type": "application/json"})
        })
        console.log("received response: ", await response.text())
        setLoading(false)
    }


    return <>
        <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
            <img id='img' style={{maxWidth: "98vw", maxHeight: "98vh"}} />
            <Box sx={{ display: showFirstBox ? "" : "none", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <label htmlFor="file">
                    <LoadingButton variant="text" disableElevation startIcon={<AttachFile />} onClick={() => document.getElementById("file")?.click()} sx={{ width: "20vw", height: "70px", fontSize: "15px" }}>
                        Choose File
                    </LoadingButton>
                </label>
                <input accept="image/*" onChange={handleInputFileChange} style={{ display: "none" }} type="file" id="file" name="file" className="file_input" />
            </Box>
            <Fab disabled={file == null} onClick={sendKerasOCRRequest} variant="extended" size="large" color="primary" id="scan-image" sx={{ position: "absolute", bottom: "20px", left: "20px" }} >
                <AutoFixHigh sx={{ mr: 2 }} />
                Start Scanning
            </Fab>
            <Fab disabled={rectanglesData.length == 0 } onClick={sendTextDetectionRequest}  variant="circular" size="large" color="secondary" id="scan-image" sx={{ position: "absolute", bottom: "80px", left: "20px" }} >
                <FontDownloadOutlined color={rectanglesData.length == 0 ? "inherit" : "primary"} />
            </Fab>
            {/* <Fab disabled={rectanglesData.length == 0 } onClick={() => setRectanglesData([])}  variant="circular" size="large" color="secondary" id="scan-image" sx={{ position: "absolute", bottom: "80px", right: "120px" }} >
                <ClearAll color={rectanglesData.length == 0 ? "inherit" : "primary"} />
            </Fab> */}
            <Fab variant="extended" size="large" color="primary" id="choose-file" sx={{ position: "absolute", bottom: "20px", right: "20px" }} onClick={() => document.getElementById("file")?.click()}>
                <AttachFile sx={{ mr: 2 }} />
                Choose File
            </Fab>
            <Fab disabled={file == null} variant="circular" size="large" color="secondary" id="remove-rectangle" sx={{ position: "absolute", bottom: "80px", right: "20px" }} onClick={addRectangle}>
                <FitScreenOutlined color={file == null ? "inherit" : "primary"} />
            </Fab>
            {rectanglesData.length > 0 && <Fab variant="circular" size="large" color="error" id="remove-rectangle" sx={{ position: "absolute", bottom: "80px", right: "120px" }} onClick={() => removeSelectedRectangle()}>
                <Delete />
            </Fab>}
            <Box sx={{
                width: "100vw", height: "100vh", opacity: loading ? 1 : 0,
                backgroundColor: theme.palette.grey[800], position: "absolute",
                top: "0", left: "0", display: loading ? "grid" : "none",
                placeItems: "center", zIndex: 999
            }}>
                <CircularProgress size={"70px"} />
            </Box>
            {
                rectanglesData && rectanglesData.map((n, i) =>
                    <MyResizableRect
                        left={n.left}
                        top={n.top}
                        width={n.width}
                        height={n.height}
                        index={i}
                        updateRectangle={updateRectangle}
                        key={i}
                        updateText={updateTextForItem}
                        initialText={n.text ? n.text : ""}
                    />
                )
            }

        </Box>
    </>

}



export default ScannerPage;