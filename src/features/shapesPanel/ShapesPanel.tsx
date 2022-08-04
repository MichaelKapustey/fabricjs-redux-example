import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    getShapes, shapeRemoved
} from './shapesPanelSlice';

import styles from './ShapesPanel.module.css';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import SVG from 'react-inlinesvg';

export const ShapesPanel = () => {
    const shapes = useAppSelector(getShapes);
    const dispatch = useAppDispatch();

    return (
        <div>
            <Accordion defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Shapes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        {Object.values(shapes).map(shape => <ListItem
                            key={shape.name}
                            secondaryAction={
                                <IconButton edge="end" onClick={() => dispatch(shapeRemoved(shape.name))}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <SVG src={`<svg class=${styles.ShapePreview} xmlns="http://www.w3.org/2000/svg" width="80px" height="48px" viewBox="0 0 800 480">${shape.svg}</svg>`}></SVG>
                            <ListItemText
                                primary={shape.name}
                            />
                        </ListItem>)}
                    </List>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}