import { useState, useRef, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useEditor } from "..";
import { ILine, ICoordinates } from '@src/common/providers/EditorProvider/types';
import { throttle } from 'lodash';


const getNextLabel = (index: number): string => {
  let label = '';
  while (index >= 0) {
    label = String.fromCharCode((index % 26) + 65) + label;
    index = Math.floor(index / 26) - 1;
  }
  return label;
};

const createNewLine = (coordinates: ICoordinates, label: string) => ({
  id: '',
  uuid: uuidv4(),
  label,
  canvas_id: '',
  input_data: { name: '', measurement: 0 },
  coordinates,
  metadata: { createdAt: new Date(), createdBy: '', deletedAt: new Date() }
});

const getCoordinatesFromEvent = (event: React.MouseEvent, container: SVGSVGElement) => {
  const { clientX, clientY } = event;
  const { left, top } = container.getBoundingClientRect();
  return { x: clientX - left, y: clientY - top };
};

export const useDrawLine = () => {
  const { initWorkArea, lines, setLines } = useEditor();
  const [currentLine, setCurrentLine] = useState<ILine | null>(null);
  const [selectedEndPoint, setSelectedEndPoint] = useState<{ lineIndex: number, endPoint: 'start' | 'end' } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const startStroke = (event: React.MouseEvent) => {
    if (isDragging) return;

    const { x, y } = getCoordinatesFromEvent(event, event.target as SVGSVGElement);

    if (!currentLine) {
      const coordinates = { startX: x, startY: y, endX: x, endY: y };
      setCurrentLine({ ...initWorkArea.objects.lines[0], coordinates, label: '' });
    } else {
      const newLine = { ...currentLine, coordinates: { ...currentLine.coordinates, endX: x, endY: y }, label: getNextLabel(lines.length) };
      setLines([...lines, newLine]);
      setCurrentLine(null);
    }
  };

  const strokeIndicator = (event: React.MouseEvent, container: SVGSVGElement) => {
    if (currentLine) {
      const { x, y } = getCoordinatesFromEvent(event, container);
      const coordinates = { startX: currentLine.coordinates.startX, startY: currentLine.coordinates.startY, endX: x, endY: y };
      setCurrentLine(createNewLine(coordinates, currentLine.label));
    }
  };

  const selectEndPoint = (lineIndex: number, endPoint: 'start' | 'end', event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedEndPoint({ lineIndex, endPoint });
    setIsDragging(true);
  };

  const throttledMoveEndPoint = useCallback(throttle((event, container) => {
    if (selectedEndPoint) {
      const { x, y } = getCoordinatesFromEvent(event, container);
      const newLines = lines.map((line, index) => {
        if (index === selectedEndPoint.lineIndex) {
          const newLine = { ...line };
          if (selectedEndPoint.endPoint === 'start') {
            newLine.coordinates.startX = x;
            newLine.coordinates.startY = y;
          } else {
            newLine.coordinates.endX = x;
            newLine.coordinates.endY = y;
          }
          return newLine;
        }
        return line;
      });


      setLines(newLines);
    }
  }, 5000), [selectedEndPoint, lines]);

  const moveEndPoint = (event: React.MouseEvent, container: SVGSVGElement) => {
    throttledMoveEndPoint(event, container);
  };

  const stopDragging = () => {
    setIsDragging(false);
    setSelectedEndPoint(null);
  };

  return { lines, currentLine, startStroke, strokeIndicator, selectEndPoint, moveEndPoint, stopDragging, isDragging };
};
