import { useEditor } from "@common/providers/EditorProvider";
import { useRef, useEffect } from "react";

export const DrawingBoard = () => {
  const { initialize } = useEditor();
  const svgContainer = useRef(null);

  useEffect(() => {
    if (svgContainer.current) {
      initialize(svgContainer.current as SVGSVGElement);
    }
  }, [svgContainer.current]);

  return (
    <div 
      className="h-full w-full flex justify-center items-center" 
      ref={svgContainer}>
    </div>
    // <svg ref={svgRef}>
    //   <image href={workArea?.background as string}/>
    // </svg>
  );
}
