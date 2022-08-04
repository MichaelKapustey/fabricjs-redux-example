import { createListenerMiddleware } from '@reduxjs/toolkit';
import { fabric } from 'fabric';

import { drawRectMode as applyDrawRectMode } from './canvas/drawRectMode';
import { freeDrawMode as applyFreeDrawMode } from './canvas/freeDrawMode';
import { drawLineMode as applyDrawLineMode } from './canvas/drawLineMode';
import { handMode as applyHandMode } from './canvas/handMode';
import generateSvgForShape from './canvas/generateSvgForShape';

import { AppDispatch, RootState } from './store';

import { Tool, toolSelected } from '../features/toolsPanel/toolsPanelSlice'
import { strokeColorSelected, strokeSizeSelected } from '../features/optionsPanel/optionsPanelSlice'
import { shapesUpdated, shapeRemoved } from '../features/shapesPanel/shapesPanelSlice';
import { ApplyCanvasModeFunc } from './canvas/canvasMode';

//Create middleware
const _listenerMiddleware = createListenerMiddleware();

//Setup variables
let _cleanupMode = () => { };
let _canvas: fabric.Canvas;

export const initializeCanvasEffect = (canvas: fabric.Canvas, dispatch: AppDispatch) => {
    _canvas = canvas;
    canvas.freeDrawingBrush.width = 1;

    document.onkeydown = function (e) {
        switch (e.key) {
            case 'Delete':
                //When delete is pressed, we will dispatch delete event for every selected object
                _canvas.getActiveObjects().forEach(x =>
                    dispatch(shapeRemoved(x.name!))
                )
        }
        canvas.renderAll();
    }
}

//every time strokeSizeSelected action is dispatched
//we would update that setting in _canvas object
_listenerMiddleware.startListening({
    actionCreator: strokeSizeSelected,
    effect: (action) => {
        _canvas.freeDrawingBrush.width = action.payload;
    }
});

//same
_listenerMiddleware.startListening({
    actionCreator: strokeColorSelected,
    effect: (action) => {
        _canvas.freeDrawingBrush.color = action.payload;
    }
});

//Listening to shape removed event
//It could be triggered from shapes panel or by pressing delete button
//We'll find mentioned object and remove it from the canvas
_listenerMiddleware.startListening({
    actionCreator: shapeRemoved,
    effect: (action) => {
        const obj = _canvas.getObjects().find(o => o.name === action.payload);
        if (obj) _canvas.remove(obj);
        _canvas.renderAll();
    }
});

//Listens to tool change. 
//When dispatch is updated, we  
_listenerMiddleware.startListening({
    actionCreator: toolSelected,
    effect: (action, listenerApi) => {
        if (!_canvas) return;

        //unsubsribe canvas events added by specific tool on tool change
        if (_cleanupMode) _cleanupMode();

        //Tool may have turned off mouse:up or may not. Lets unsubscibe to be sure
        _canvas.off('mouse:up');

        //And subscribe again because we need it
        _canvas.on('mouse:up', () => {
            //This wiil happen at the end of draw or move event
            const active = _canvas.getActiveObjects();
            if (active.length) {
                //dispatch all updated objects to display change on shapes panel
                //shapes panel displays each shape separately on its place on canvas
                listenerApi.dispatch(shapesUpdated(active.map(generateSvgForShape)))
            }
        });

        //detect mode by tool
        const applyMode = canvasMode[action.payload];
        //apply detected mode and save its cleanup function
        _cleanupMode = applyMode(_canvas, () => listenerApi.getState() as RootState, listenerApi.dispatch as AppDispatch);
    }
});

//Tool to ApplyMode function mapping
const canvasMode: Record<Tool, ApplyCanvasModeFunc<unknown>> = {
    'line': applyDrawLineMode,
    'move': applyHandMode,
    'rectangle': applyDrawRectMode,
    'pencil': applyFreeDrawMode
}

export default _listenerMiddleware.middleware;