export interface ILine {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  label: string;
}

export interface IDrawnLineProps {
    line: ILine;
    label?: string;
    onStartHandleMouseDown: (e: React.MouseEvent, index: number) => void;
    onEndHandleMouseDown: (e: React.MouseEvent, index: number) => void;
    index: number;
}  

export interface IIndicatorLineProps {
  line: ILine;
}