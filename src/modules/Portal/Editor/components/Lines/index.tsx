import { IDrawnLineProps, IIndicatorLineProps } from "./types";

export const IndicatorLine = ({ line }: IIndicatorLineProps) => {
  return (
    <line
      x1={line.startX}
      y1={line.startY}
      x2={line.endX}
      y2={line.endY}
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
          x1={line?.startX}
          y1={line?.startY}
          x2={line?.endX}
          y2={line.endY}
          stroke="#28855e"
          strokeDasharray="5"
        />
        <circle
          cx={line.startX}
          cy={line.startY}
          r={5}
          fill="red"
          onMouseDown={(e) => onStartHandleMouseDown(e, index)}
        />
        
        <g onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}>
          <circle
            cx={(line.startX + line.endX) / 2}
            cy={(line.startY + line.endY) / 2}
            r={8}
            fill="#28855e"
          />
          <text
            x={(line.startX + line.endX) / 2}
            y={(line.startY + line.endY) / 2}
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={8}
          >
            {label}
          </text>
        </g>
         <circle
          cx={line.endX}
          cy={line.endY}
          r={5}
          fill="blue"
          onMouseDown={(e) => onEndHandleMouseDown(e, index)}
        />
      </g>
    );
  }