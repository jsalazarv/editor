import { IDrawnLineProps, IIndicatorLineProps } from "./types";

export const IndicatorLine = ({ line }: IIndicatorLineProps) => {
  return (
    <line
      x1={line.coordinates.startX}
      y1={line.coordinates.startY}
      x2={line.coordinates.endX}
      y2={line.coordinates.endY}
      stroke="#28855e"
      strokeDasharray="10"
    />
  );
};

export const DrawnLine = (
  { 
    line, 
    label = '',
    index,
    onStartHandleMouseDown,
    onEndHandleMouseDown
  }: IDrawnLineProps) => {    
    return (
      <g>
        <line
          x1={line?.coordinates.startX}
          y1={line?.coordinates.startY}
          x2={line?.coordinates.endX}
          y2={line.coordinates.endY}
          stroke="#28855e"
          strokeDasharray="5"
        />
        <circle
          cx={line.coordinates.startX}
          cy={line.coordinates.startY}
          r={5}
          fill="red"
          onMouseDown={(e) => onStartHandleMouseDown(e, index)}
        />
        
        <g onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}>
          <circle
            cx={(line.coordinates.startX + line.coordinates.endX) / 2}
            cy={(line.coordinates.startY + line.coordinates.endY) / 2}
            r={8}
            fill="#28855e"
          />
          <text
            x={(line.coordinates.startX + line.coordinates.endX) / 2}
            y={(line.coordinates.startY + line.coordinates.endY) / 2}
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={8}
          >
            {label}
          </text>
        </g>
         <circle
          cx={line.coordinates.endX}
          cy={line.coordinates.endY}
          r={5}
          fill="blue"
          onMouseDown={(e) => onEndHandleMouseDown(e, index)}
        />
      </g>
    );
  }