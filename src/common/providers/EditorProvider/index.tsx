import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { EditorContextProps, WorkArea } from './types';
import { calculateDimensions } from '@common/utils/canvas/calculateDimensions';

export const EditorContext = createContext<EditorContextProps>({
  workArea: {
    canvas: null,
    background: null,
    objects: [],
  },
  action: '',
  initialize: (): void => {},
  setAction: (): string => '',
  setBackground: (): void => {},
});

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [action, setAction] = useState<string>('');
  const [workArea, setWorkArea] = useState<WorkArea>({
    canvas: null,
    background: null,
    objects: [],
  });

  const containerRef = useRef<SVGSVGElement | null>(null);
  const imgRef = useRef<SVGImageElement | null>(null);

  const initialize = (svgElement: SVGSVGElement, imgElement: SVGImageElement) => {
    containerRef.current = svgElement;
    imgRef.current = imgElement;
  }
  
  const setBackground = (imgBase64: string) => {
    const container = containerRef.current;
    const image = imgRef.current;
    const img = new Image();
    
    img.src = imgBase64;
    img.onload = function() {
      const { width, height } = calculateDimensions(
        { width: img.width, height: img.height },
        { 
          width: container?.parentElement?.clientWidth as number, 
          height: container?.parentElement?.clientHeight as number 
        }
      );

      container?.setAttribute('viewBox', `0 0 ${width} ${height}`);
      container?.setAttribute('width', `${width}`);
      container?.setAttribute('height', `${height}`);

      image?.setAttribute('href', img.src);
      image?.setAttribute('width', `${width}`);
      image?.setAttribute('height', `${height}`);
    };
  };

  return (
    <EditorContext.Provider
      value={{
        action,
        workArea,
        initialize,
        setAction,
        setBackground,
      }}>
      {children}
    </EditorContext.Provider>
  );
};
