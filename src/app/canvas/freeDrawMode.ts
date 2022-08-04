import { shapesUpdated } from '../../features/shapesPanel/shapesPanelSlice';
import { ApplyCanvasModeFunc } from './canvasMode';
import generateSvgForShape from './generateSvgForShape';

export const freeDrawMode: ApplyCanvasModeFunc<undefined> = (canvas, _, dispatch) => {
    canvas.isDrawingMode = true;
    canvas.on('mouse:up', () => {
        const drawnPath = canvas.getObjects().reverse()[0];
        console.log(drawnPath);
        if (drawnPath) {
            drawnPath.name = 'Path ' + canvas.getObjects().filter(o => o.type === 'path').length;
            dispatch(shapesUpdated([generateSvgForShape(drawnPath)]))
        }
    });

    canvas.renderAll();

    return () => {
        canvas.off('mouse:up');
        canvas.isDrawingMode = false;
    }
}