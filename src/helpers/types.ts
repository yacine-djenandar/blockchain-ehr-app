type dialogProps = {
    show: boolean,
    okCallBack: Function
}

type rectProps = {
    width: number,
    height: number,
    top: number,
    left: number,
    index: number,
    // selected: boolean,
    updateRectangle: Function,
    updateText: Function,
    initialText: string
}

type rectangleData = {
    top: number,
    left: number,
    width: number,
    height: number,
    selected: boolean,
    text : string
}


export type {
    dialogProps,
    rectProps, 
    rectangleData
}