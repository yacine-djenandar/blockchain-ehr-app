import { useState } from "react"
import { rectProps, rectangleData } from "../../helpers/types"
import ResizableRect from 'react-resizable-rotatable-draggable'
import { useTheme } from "@mui/material"
import "./style.css"


const MyResizableRect = ({ top, left, width, height, index: key, updateRectangle, updateText, initialText }: rectProps): JSX.Element => {


    const theme = useTheme();

    const [rectData, setRectData] = useState<rectangleData>({
        top,
        left,
        width,
        height,
        selected: false,
        text: initialText
    })

    const handleDrag = (dx: number, dy: number) => {
        setRectData(old => ({
            ...old,
            top: old.top + dy,
            left: old.left + dx
        }))
    }

    const handleResize = (style: Record<string, number>, _isShiftKey: boolean, _type: string) => {

        let { top: t, left: l, width: w, height: h } = style

        t = Math.round(t)
        l = Math.round(l)
        w = Math.round(w)
        h = Math.round(h)

        setRectData((old) => ({
            ...old,
            top: t,
            left: l,
            width: w,
            height: h,
        }))
    }


    return <>
        <ResizableRect
            left={rectData.left}
            top={rectData.top}
            width={rectData.width}
            height={rectData.height}
            minWidth={30}
            minHeight={30}
            zoomable='n, w, s, e, nw, ne, se, sw'
            onResize={handleResize}
            onResizeEnd={() => updateRectangle(rectData, key)}
            onDragEnd={() => updateRectangle(rectData, key)}
            onDrag={handleDrag}
            rotatable={false}
        />
        <input
            className="input"
            value={rectData.text}
            style={
                {
                    position: "absolute",
                    top: rectData.top + (rectData.height / 4),
                    left: rectData.left + 15,
                    minWidth: 10,
                    width: Math.max(10, rectData.width - 30),
                    height: rectData.height / 2,
                    maxHeight: 30,
                    color: "white",
                    backgroundColor: "transparent",
                    border: `1px solid ${theme.palette.primary.main}`,
                }
            }
            onChange={(event) => {setRectData(old=>({...old, text: (event.target as HTMLInputElement).value})); updateText((event.target as HTMLInputElement).value, key)}}
        />
    </>

}



export default MyResizableRect;