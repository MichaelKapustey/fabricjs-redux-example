import { fabric } from 'fabric';
import { ApplyCanvasModeFunc } from './canvasMode';

type RectOptions = {
    strokeColor: string;
    strokeSize: number;
    fillColor: string;
}

//Look into drawLineMode for comments
export const drawRectMode: ApplyCanvasModeFunc<RectOptions> = (canvas, getState) => {
    let _origX = 0;
    let _origY = 0;
    let _rect: fabric.Rect;
    let _mouseDown = false;

    canvas.on("mouse:down", function onMouseDown(event) {
        if (canvas._activeObject) return;
        const { fillColor, strokeColor, strokeSize } = getState().optionsPanel;

        const objects = canvas.getObjects();
        const rectCount = objects.filter(o => o.type === 'rect').length;

        _mouseDown = true;

        let pointer = canvas.getPointer(event.e);
        _origX = pointer.x;
        _origY = pointer.y;
        _rect = new fabric.Rect({
            name: `Rect ${rectCount + 1}`,
            left: _origX,
            top: _origY,
            originX: "left",
            originY: "top",
            width: pointer.x - _origX,
            height: pointer.y - _origY,
            angle: 0,
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth: strokeSize,
            transparentCorners: false,
            selectable: true
        });
        canvas.add(_rect);
    });
    canvas.on("mouse:move", function onMouseMove(event) {
        if (canvas._activeObject) return;
        if (!_mouseDown) return;
        let pointer = canvas.getPointer(event.e);

        if (_origX > pointer.x) {
            _rect.set({ left: Math.abs(pointer.x) });
        }
        if (_origY > pointer.y) {
            _rect.set({ top: Math.abs(pointer.y) });
        }

        _rect.set({ width: Math.abs(_origX - pointer.x) });
        _rect.set({ height: Math.abs(_origY - pointer.y) });

        canvas.renderAll();
    });
    canvas.on("mouse:up", function onMouseUp() {
        _mouseDown = false;

        if (_rect && _rect.width === 0 || _rect.height === 0) {
            canvas.remove(_rect);
        }
    });

    return () => {
        canvas.off("mouse:down");
        canvas.off("mouse:move");
        canvas.off("mouse:up");
    }
}