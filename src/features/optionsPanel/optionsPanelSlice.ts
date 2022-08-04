import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface OptionsState {
    strokeColor: string;
    fillColor: string;
    showStrokeOptions: boolean;
    showFillOptions: boolean;
    strokeSize: number;
}

const initialState: OptionsState = {
    strokeColor: '#000',
    fillColor: '#ddd',
    showFillOptions: false,
    showStrokeOptions: false,
    strokeSize: 1
};

export const optionsPanelSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        strokeColorSelected: (state, action: PayloadAction<string>) => {
            state.strokeColor = action.payload;
        },
        fillColorSelected: (state, action: PayloadAction<string>) => {
            state.fillColor = action.payload;
        },
        strokeSizeSelected: (state, action: PayloadAction<number>) => {
            state.strokeSize = action.payload;
        },
        showStrokeOptionsChanged: (state, action: PayloadAction<boolean>) => {
            state.showStrokeOptions = action.payload;
        },
        showFillOptionsChanged: (state, action: PayloadAction<boolean>) => {
            state.showFillOptions = action.payload;
        },
    }
});

export const { strokeColorSelected, fillColorSelected, strokeSizeSelected, showFillOptionsChanged, showStrokeOptionsChanged } = optionsPanelSlice.actions;

export const getOptions = (state: RootState) => state.optionsPanel;

export default optionsPanelSlice.reducer;