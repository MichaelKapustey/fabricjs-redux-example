import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import toolsPanelReducer from '../features/toolsPanel/toolsPanelSlice';
import canvasMiddleware from './canvasMiddleware';
import optionsPanelReducer from '../features/optionsPanel/optionsPanelSlice';
import shapesPanelReducer from '../features/shapesPanel/shapesPanelSlice';

export const store = configureStore({
    reducer: {
        toolsPanel: toolsPanelReducer,
        optionsPanel: optionsPanelReducer,
        shapesPanel: shapesPanelReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(canvasMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
