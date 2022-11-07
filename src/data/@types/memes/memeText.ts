export interface MemeTextProps {
    id: number,
    text: string,
    idImage: number,
    position: positionText,
    color: string,
    fontSize: number,
}

type positionText = {
    x: number,
    y: number
}
