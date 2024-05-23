export interface EditorContextProps {
  workArea: WorkArea;
  action: string;
  initialize: (svg: SVGSVGElement, img: SVGImageElement) => void;
  setAction: (value: string) => void;
  setBackground: (img: string) => void;
}

export interface WorkObject {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  id: string;
}

export interface WorkArea {
  canvas?: HTMLCanvasElement | null;
  background?: WorkObject | null | string | null;
  objects: [];
}

interface ILine {
  id: string;
  label: string;
  input_data: {
    name: string;
    size: number; 
  };
  coordinates: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  }
}