import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Shape {
    name: string;
    svg: string;
}

export interface ShapesState {
    shapes: Record<string, Shape>
}

const initialState: ShapesState = {
    shapes: {}
};

export const toolsPanelSlice = createSlice({
    name: 'shapes',
    initialState,
    reducers: {
        shapesUpdated: (state, action: PayloadAction<Shape[]>) => {
            action.payload.forEach(shape => {
                state.shapes[shape.name] = shape;
            });
        },
        shapeRemoved: (state, action: PayloadAction<string>) => {
            delete state.shapes[action.payload];
        }
    }
});

export const { shapesUpdated, shapeRemoved } = toolsPanelSlice.actions;

export const getShapes = (state: RootState) => state.shapesPanel.shapes;

export default toolsPanelSlice.reducer;