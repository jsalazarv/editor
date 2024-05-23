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
