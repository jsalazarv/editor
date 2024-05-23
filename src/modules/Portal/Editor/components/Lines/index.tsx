import { IDrawnLineProps, IIndicatorLineProps } from "./types";

export const IndicatorLine = ({ line }: IIndicatorLineProps) => {
  return (
    <line
      x1={line.startX}
      y1={line.startY}
      x2={line.endX}
      y2={line.endY}
      stroke="green"
    />
  );
};

export const DrawnLine = ({ line, label = 'A'  }: IDrawnLineProps) => {    
    return (
      <g>
        <line
          x1={line?.startX}
          y1={line?.startY}
          x2={line?.endX}
          y2={line.endY}
          stroke="black"
        />
        <circle
          cx={line.startX}
          cy={line.startY}
          r={3}
          fill="red"
        />
        
        <g>
          <circle
            cx={(line.startX + line.endX) / 2}
            cy={(line.startY + line.endY) / 2}
            r={7}
            fill="blue"
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
          r={3}
          fill="green"
        />
      </g>
    );
  }