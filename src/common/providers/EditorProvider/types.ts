export interface EditorContextProps {
  workArea: WorkArea;
  action: string;
  setAction: (value: string) => void;
  setBackground: (img: string) => void;
  initialize: (canvas: HTMLCanvasElement) => void;
  addShape: () => void;
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
  background?: WorkObject | null;
  objects: [];
}
