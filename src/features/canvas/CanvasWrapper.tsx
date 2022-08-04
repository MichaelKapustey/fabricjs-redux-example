import React, { useEffect, useRef } from 'react'
import { fabric } from 'fabric';
import { initializeCanvasEffect } from '../../app/canvasMiddleware';
import { useAppDispatch } from '../../app/hooks';

export const CanvasWrapper = () => {
    const canvasEl = useRef(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasEl.current);

        console.log('Canvas initialized');
        //The only direct interaction. Required to pass canvas object to the middleware
        initializeCanvasEffect(canvas, dispatch);

        return () => {
            canvas.dispose();
            console.log('Canvas Disposed');
        }
    }, []); //if this effects will get called again, you'll loose all objects present on canvas

    return (
        <div style={{ background: 'white', margin: '24px', marginBottom: 'auto' }}>
            <canvas width="800" height="480" ref={canvasEl} />
        </div>
    )
};
