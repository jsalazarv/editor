import { useEditor } from "@common/providers/EditorProvider";
import React, { useRef, useEffect } from "react";
import { DrawnLine, IndicatorLine } from "./components/Lines";
import { useDrawLine } from "@common/providers/EditorProvider/hooks/useDrawLine";

export const DrawingBoard = () => {
  const { initialize, workArea } = useEditor();
  const svgRef = useRef<SVGSVGElement>(null);
  const imgRef = useRef<SVGImageElement>(null);
  const { lines, currentLine, startStroke, strokeIndicator, selectEndPoint, moveEndPoint, stopDragging, isDragging } = useDrawLine();

  const handleMouseDown = (event: React.MouseEvent) => {
    if (!isDragging) {
      startStroke(event);
    }
  };
  
  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging && svgRef.current) {
      moveEndPoint(event, svgRef.current);
    } else if (currentLine && svgRef.current) {
      strokeIndicator(event, svgRef.current);
    }
  };

  const handleMouseUp = () => {
    stopDragging();
  };

  const handleStartEndPointClick = (event: React.MouseEvent, index: number) => {
    selectEndPoint(index, 'start', event);
  };

  const handleEndEndPointClick = (event: React.MouseEvent, index: number) => {
    selectEndPoint(index, 'end', event);
  };

  useEffect(() => {
    if (svgRef.current && imgRef.current) {
      initialize(svgRef.current, imgRef.current);
    }
  }, [svgRef.current, imgRef.current]);

  return (
    <>
      <svg 
        ref={svgRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <image ref={imgRef} href={workArea.background as string}/>
        <g>
          {lines.map((line, index) => (
            <DrawnLine 
              key={index}
              line={line}
              label={line.label}
              onStartHandleMouseDown={handleStartEndPointClick}
              onEndHandleMouseDown={handleEndEndPointClick}
              index={index}
            />
          ))}
          
          {currentLine && (
            <IndicatorLine line={currentLine} />
          )}
        </g>
      </svg>
    </>
  );
};
