import { fabric } from 'fabric';
import { ApplyCanvasModeFunc } from './canvasMode';

type LineOptions = {
    strokeColor: string;
    strokeSize: number;
}

export const drawLineMode: ApplyCanvasModeFunc<LineOptions> = (canvas, getState) => {
    let _origX = 0;
    let _origY = 0;
    let _line: fabric.Line;
    let _mouseDown = false;

    canvas.on("mouse:down", function onMouseDown(event) {
        if (canvas._activeObject) return;

        //It is a shame that canvas objects don't have unique identifiers
        //by default. Lets generate them
        const objects = canvas.getObjects();
        const lineCount = objects.filter(o => o.type === 'line').length;

        const { strokeSize, strokeColor } = getState().optionsPanel;

        _mouseDown = true;

        let pointer = canvas.getPointer(event.e);
        _origX = pointer.x;
        _origY = pointer.y;
        _line = new fabric.Line([_origX, _origY, _origX, _origY], {
            name: 'Line ' + (lineCount + 1),
            strokeWidth: strokeSize,
            stroke: strokeColor,
            originX: 'center',
            originY: 'center',
        })
        canvas.add(_line);
    });
    canvas.on("mouse:move", function onMouseMove(event) {
        if (canvas._activeObject) return;
        if (!_mouseDown) return;
        let pointer = canvas.getPointer(event.e);

        _line.set({ x2: pointer.x, y2: pointer.y })

        canvas.renderAll();
    });
    canvas.on("mouse:up", function onMouseUp() {
        _mouseDown = false;

        if (_line && _line.x1 === _line.x2 && _line.y1 === _line.y2) {
            canvas.remove(_line);
        }
    });


    //return cleanup function
    return () => {
        //unsubscribe from events
        canvas.off("mouse:down");
        canvas.off("mouse:move");
        canvas.off("mouse:up");
    }
}