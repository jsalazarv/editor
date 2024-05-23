import { ILine } from "@modules/Portal/Editor/components/Lines/types";
import { useState } from "react";

const getNextLabel = (index: number): string => {
  let label = '';
  while (index >= 0) {
    label = String.fromCharCode((index % 26) + 65) + label;
    index = Math.floor(index / 26) - 1;
  }
  return label;
};

export const useDrawLine = () => {
  const [lines, setLines] = useState<ILine[]>([]);
  const [currentLine, setCurrentLine] = useState<ILine | null>(null);
  const [selectedEndPoint, setSelectedEndPoint] = useState<{ lineIndex: number, endPoint: 'start' | 'end' } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const startStroke = (event: React.MouseEvent) => {
    if (isDragging) return;

    const { clientX, clientY } = event;
    const { left, top } = (event.target as HTMLElement).getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    if (!currentLine) {
      setCurrentLine({ startX: x, startY: y, endX: x, endY: y, label: '' });
    } else {
      const newLine = { ...currentLine, endX: x, endY: y, label: getNextLabel(lines.length) };
      setLines([...lines, newLine]);
      setCurrentLine(null);
    }
  };

  const strokeIndicator = (event: React.MouseEvent, container: SVGSVGElement) => {
    if (currentLine) {
      const { clientX, clientY } = event;
      const { left, top } = container.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;

      setCurrentLine({ ...currentLine, endX: x, endY: y });
    }
  };

  const selectEndPoint = (lineIndex: number, endPoint: 'start' | 'end', event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedEndPoint({ lineIndex, endPoint });
    setIsDragging(true);
  };

  const moveEndPoint = (event: React.MouseEvent, container: SVGSVGElement) => {
    if (selectedEndPoint) {
      const { clientX, clientY } = event;
      const { left, top } = container.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;

      setLines(prevLines => {
        const newLines = [...prevLines];
        const line = newLines[selectedEndPoint.lineIndex];

        if (selectedEndPoint.endPoint === 'start') {
          line.startX = x;
          line.startY = y;
        } else {
          line.endX = x;
          line.endY = y;
        }

        return newLines;
      });
    }
  };

  const stopDragging = () => {
    setIsDragging(false);
    setSelectedEndPoint(null);
  };

  return { lines, currentLine, startStroke, strokeIndicator, selectEndPoint, moveEndPoint, stopDragging, isDragging };
};
