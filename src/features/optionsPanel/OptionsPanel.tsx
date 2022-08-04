import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styles from './OptionsPanel.module.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GithubPicker } from 'react-color'
import {
    getOptions, strokeColorSelected, fillColorSelected, strokeSizeSelected
} from './optionsPanelSlice';

export const OptionsPanel = () => {
    const options = useAppSelector(getOptions);
    const dispatch = useAppDispatch();

    return (
        <div>
            <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Options</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {!options.showStrokeOptions && !options.showFillOptions &&
                        <p>No options available for selected tool</p>
                    }
                    {options.showStrokeOptions && <>
                        <p>Stroke Size</p>
                        <ToggleButtonGroup
                            value={String(options.strokeSize)}
                            exclusive
                            onChange={(e, newValue) => dispatch(strokeSizeSelected(Number(newValue)))}
                        >
                            <ToggleButton value="1">
                                <CircleIcon sx={{ fontSize: 1 }} />
                            </ToggleButton>
                            <ToggleButton value="2">
                                <CircleIcon sx={{ fontSize: 2 }} />
                            </ToggleButton>
                            <ToggleButton value="3">
                                <CircleIcon sx={{ fontSize: 3 }} />
                            </ToggleButton>
                            <ToggleButton value="4">
                                <CircleIcon sx={{ fontSize: 4 }} />
                            </ToggleButton>
                            <ToggleButton value="5">
                                <CircleIcon sx={{ fontSize: 5 }} />
                            </ToggleButton>
                            <ToggleButton value="6">
                                <CircleIcon sx={{ fontSize: 6 }} />
                            </ToggleButton>
                            <ToggleButton value="7">
                                <CircleIcon sx={{ fontSize: 7 }} />
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <p>Stroke Color
                            <CircleIcon
                                className={styles.colorSvg}
                                sx={{ fontSize: 32, color: options.strokeColor }}
                            />
                        </p>

                        <GithubPicker
                            color={options.strokeColor}
                            triangle="top-right"
                            onChangeComplete={(e) => dispatch(strokeColorSelected(e.hex))}
                        />
                    </>}
                    {options.showFillOptions && <>
                        <p>Fill Color
                            <CircleIcon
                                className={styles.colorSvg}
                                sx={{ fontSize: 32, color: options.fillColor }}
                            />
                        </p>
                        <GithubPicker
                            color={options.fillColor}
                            triangle="top-right"
                            onChangeComplete={(e) => dispatch(fillColorSelected(e.hex))}
                        />
                    </>}
                </AccordionDetails>
            </Accordion>
        </div >
    );
}