import { useEditor } from "@common/providers/EditorProvider";
import React, { useRef, useEffect, useState } from "react";
import { DrawnLine, IndicatorLine, } from "./components/Lines";
import { useDrawLine } from "@common/providers/EditorProvider/hooks/useDrawLine";

export const DrawingBoard = () => {
  const { initialize, workArea } = useEditor();
  const svgRef = useRef<SVGSVGElement>(null);
  const imgRef = useRef<SVGImageElement>(null);
  const { lines, currentLine, startStroke, strokeIndicator } = useDrawLine();

  const handleMouseDown = (event: React.MouseEvent) => {
    startStroke(event);
  };
  
  const handleMouseMove = (event: React.MouseEvent) => {
    strokeIndicator(event, svgRef.current as SVGSVGElement);
  }

  useEffect(() => {
    if (svgRef.current && imgRef.current) {
      initialize(svgRef.current as SVGSVGElement, imgRef.current as SVGImageElement);
    }
  }, [svgRef.current, imgRef.current]);

  return (
    <>
      <svg 
        ref={svgRef}
        onMouseDown={(event) => handleMouseDown(event)}
        onMouseMove={(event) => handleMouseMove(event)}>
        <image ref={imgRef} href={workArea.background as string}/>
        <g>
          {lines.map((line, index) => (
            <DrawnLine key={index} line={line} />
          ))}
          
          {currentLine && (
            <IndicatorLine line={currentLine} />
          )}
        </g>
      </svg>
    </>
  );
}
