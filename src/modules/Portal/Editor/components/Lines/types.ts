export interface ILine {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export interface IDrawnLineProps {
    line: ILine;
    label?: string;
}  

export interface IIndicatorLineProps {
  line: ILine;
}