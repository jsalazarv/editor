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

  const initialize = (svgContainer: SVGSVGElement) => {
    containerRef.current = svgContainer;
  }
  
  const setBackground = (imgBase64: string) => {
    const svgChild = containerRef?.current?.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
    const svgBackground = svgChild?.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'image'));
    const img = new Image();

    img.src = imgBase64;
    img.onload = function() {
      const { width, height } = calculateDimensions(
        {
          width: img.width, 
          height: img.height
        }, 
        {
          width: containerRef.current?.parentElement?.clientWidth as number, 
          height: containerRef.current?.parentElement?.clientHeight as number
        });
    
      svgChild?.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svgChild?.setAttribute('width', `${width}`);
      svgChild?.setAttribute('height', `${height}`);
    
      svgBackground?.setAttribute('href', img.src);
      svgBackground?.setAttribute('width', `${width}`);
      svgBackground?.setAttribute('height', `${height}`);
    }
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
