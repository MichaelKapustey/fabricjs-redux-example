import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type Tool = 'pencil' | 'rectangle' | 'line' | 'move' 

export interface ToolsState {
    selectedTool: Tool
}

const initialState: ToolsState = {
    selectedTool: 'move'
};

export const toolsPanelSlice = createSlice({
    name: 'tools',
    initialState,
    reducers: {
        toolSelected: (state, action: PayloadAction<Tool>) => {
            state.selectedTool = action.payload;
        }
    }
});

export const {toolSelected} = toolsPanelSlice.actions;

export const getSelectedTool = (state: RootState) => state.toolsPanel.selectedTool;

export default toolsPanelSlice.reducer;