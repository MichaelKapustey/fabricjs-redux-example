import react from 'react';

import { CanvasWrapper } from './features/canvas/CanvasWrapper';
import { ToolsPanel } from './features/toolsPanel/ToolsPanel'
import { OptionsPanel } from './features/optionsPanel/OptionsPanel'
import { ShapesPanel } from './features/shapesPanel/ShapesPanel';

import './App.css';

function App() {
    return (
        <div className="App">
            <div className='Sidebar'>
                <ToolsPanel />
                <OptionsPanel />
                <ShapesPanel />
            </div>
            <CanvasWrapper />
        </div>
    );
}

export default App;
