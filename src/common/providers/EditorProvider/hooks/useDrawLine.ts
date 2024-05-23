import { ILine } from "@modules/Portal/Editor/components/Lines/types";
import { useState } from "react";

export const useDrawLine = () => {
  const [lines, setLines] = useState<ILine[]>([]);
  const [currentLine, setCurrentLine] = useState(null as ILine | null);

  const startStroke = (event: React.MouseEvent) => {
    const { clientX, clientY } = event as React.MouseEvent;
    const { left, top } = (event.target as HTMLElement).getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    if (!currentLine) {
      setCurrentLine({ startX: x, startY: y, endX: x, endY: y });
    } else {
      setLines([...lines, { ...currentLine, endX: x, endY: y }]);
      setCurrentLine(null);
    }
  };

  const strokeIndicator = (event: React.MouseEvent, container: SVGSVGElement) => {
    if (currentLine) {
      const { clientX, clientY } = event;
      const { left, top } = container?.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;

      setCurrentLine({ ...currentLine, endX: x, endY: y });
    }
  };

  return { lines, currentLine, startStroke, strokeIndicator };
};