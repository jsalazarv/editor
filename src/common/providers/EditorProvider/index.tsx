import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { EditorContextProps, WorkArea } from './types';
import fabric from 'fabric';
import { calculateDimensions } from '@common/utils/canvas/calculateDimensions';

export const drawLine = (options) => {
  const { points, canvas, ...rest } = options;

  const line = new fabric.fabric.Line(points || [0, 0, 300, 0], {
    strokeWidth: 4,
    stroke: '#000000',
    strokeLineJoin: 'round',
    strokeLineCap: 'round',
    borderColor: '#00000000',
    ...rest,
  });

  canvas.viewportCenterObject(line);
  line.set({
    x1: line.left,
    y1: line.top,
    x2: line.left ? line.left + 300 : 0,
    y2: line.top,
  });
  canvas.add(line);
  canvas.setActiveObject(line);
  canvas.requestRenderAll();
  return line;
};

export const EditorContext = createContext<EditorContextProps>({
  workArea: {
    canvas: null,
    background: null,
    objects: [],
  },
  action: '',
  setAction: (): string => '',
  setBackground: (): void => {},
  initialize: (): void => {},
  addShape: (): void => {},
});

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [action, setAction] = useState<string>('');
  const [workArea] = useState<WorkArea>({
    canvas: null,
    background: null,
    objects: [],
  });
  const fabricCanvas = useRef<fabric.fabric.Canvas | null>(null);
  const fabricContainerRef = useRef<HTMLElement | null>(null);

  const initialize = (canvas: HTMLCanvasElement) => {
    fabricCanvas.current = new fabric.fabric.Canvas(
      canvas as HTMLCanvasElement,
      {
        width: canvas?.clientWidth,
        height: canvas?.clientHeight,
        backgroundColor: 'transparent',
      },
    );
    fabricCanvas.current?.on('after:render', () => {
      if (!fabricContainerRef.current) {
        fabricContainerRef.current =
          canvas.parentElement?.parentElement || null;
      }
    });
  };

  const setBackground = (imgBase64: string) => {
    fabric.fabric.Image.fromURL(imgBase64, (img) => {
      if (!img.width || !img.height) return;
      if (!fabricContainerRef.current?.parentElement) return;

      const newDimensions = calculateDimensions(
        { width: img.width, height: img.height },
        {
          width: fabricContainerRef.current?.parentElement
            .clientWidth as number,
          height: fabricContainerRef.current?.parentElement
            .clientHeight as number,
        },
      );

      fabricCanvas.current?.setBackgroundImage(
        img,
        () => {
          if (!fabricContainerRef.current) return;

          fabricContainerRef.current.style.width = `${newDimensions.width}px`;
          fabricContainerRef.current.style.height = `${newDimensions.height}px`;
          fabricCanvas.current?.setWidth(newDimensions.width);
          fabricCanvas.current?.setHeight(newDimensions.height);
          fabricCanvas.current?.requestRenderAll();
        },
        {
          scaleX: newDimensions.width / img.width,
          scaleY: newDimensions.height / img.height,
        },
      );
    });
  };

  const addShape = () => {
    const line = drawLine({
      canvas: fabricCanvas.current,
      ...{
        key: 'line',
        type: 'f-line',
        svg: (
          <img
            src={`data:image/svg+xml,${encodeURIComponent(
              '<svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(44, 44, 44)" fill="rgb(44, 44, 44)" viewBox="0 -0.5 33 1"><line x1="0.5" x2="32.5" stroke-linecap="butt" fill="none"></line></svg>',
            )}`}
            alt=""
            style={{ width: 48, height: 48 }}
          />
        ),
      },
    });

    fabricCanvas.current?.add(line);
  };

  // useEffect(() => {
  //   addShape();
  // }, []);

  return (
    <EditorContext.Provider
      value={{
        action,
        workArea,
        setAction,
        initialize,
        setBackground,
        addShape,
      }}>
      {children}
    </EditorContext.Provider>
  );
};
