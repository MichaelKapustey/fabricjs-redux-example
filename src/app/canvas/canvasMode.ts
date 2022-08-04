import { fabric } from 'fabric'
import { AppDispatch, RootState } from '../store'

export type ApplyCanvasModeFunc<T> = (canvas: fabric.Canvas, getState: () => RootState, dispatch: AppDispatch) => () => void