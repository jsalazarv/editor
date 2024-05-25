import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useEditor } from "..";
import { ILine } from '@src/common/providers/EditorProvider/types';

const getNextLabel = (index: number): string => {
  let label = '';
  while (index >= 0) {
    label = String.fromCharCode((index % 26) + 65) + label;
    index = Math.floor(index / 26) - 1;
  }
  return label;
};

export const useDrawLine = () => {
  const { initWorkArea, lines, setLines } = useEditor();
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
      const coordinates = { startX: x, startY: y, endX: x, endY: y };
      const label = ''
      setCurrentLine({...initWorkArea.objects.lines[0], coordinates, label});
    } else {
      const newLIne = { ...currentLine, coordinates: { ...currentLine.coordinates, endX: x, endY: y }, label: getNextLabel(lines.length) };
      setLines([...lines, newLIne]);
      setCurrentLine(null);
    }
  };

  const strokeIndicator = (event: React.MouseEvent, container: SVGSVGElement) => {
    if (currentLine) {
      const { clientX, clientY } = event;
      const { left, top } = container.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;
      
      const coordinates = { startX: currentLine.coordinates.startX, startY: currentLine.coordinates.startY, endX: x, endY: y };
      const label = currentLine.label;
      const newLine = { 
            id: '', 
            uuid: uuidv4(),
            label,
            canvas_id: '',
            input_data: { 
                name: '', 
                measurement: 0 
            }, 
            coordinates, 
            metadata: { 
                createdAt: new Date(), 
                createdBy: '', 
                deletedAt: new Date() 
            }
        }
      
      setCurrentLine(newLine);
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
  };

  const stopDragging = () => {
    setIsDragging(false);
    setSelectedEndPoint(null);
  };

  return { lines, currentLine, startStroke, strokeIndicator, selectEndPoint, moveEndPoint, stopDragging, isDragging };
};
