export interface EditorContextProps {
  initWorkArea: WorkArea;
  workArea: WorkArea;
  action: string;
  initialize: (svg: SVGSVGElement, img: SVGImageElement) => void;
  setAction: (value: string) => void;
  setBackground: (img: string) => void;
  setLines: (lines: ILine[]) => void;
  lines: ILine[];
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
  objects: {
    lines: ILine[];
  };
}

export interface ILine {
  id: string;
  uuid: string;
  label: string;
  canvas_id: string;
  coordinates: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  },
  input_data?: {
    name?: string;
    measurement?: number; 
  },
  metadata: {
    createdAt?: Date;
    createdBy?: string;
    deletedAt?: Date;
  };
}