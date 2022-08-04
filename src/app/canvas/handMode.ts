import { ApplyCanvasModeFunc } from "./canvasMode";

export const handMode: ApplyCanvasModeFunc<undefined> = (canvas, _) => {
    canvas.isDrawingMode = false;

    return () => {
    }
}