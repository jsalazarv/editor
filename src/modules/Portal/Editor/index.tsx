import React, { useState, useRef } from "react";

export const DrawingBoard = () => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);
  const svgRef = useRef(null);
  const radioDelCirculo = 5; // Define el radio del círculo aquí


  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    const { left, top } = event.target.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    if (!currentLine) {
      // Comenzar a dibujar una nueva línea
      setCurrentLine({ startX: x, startY: y, endX: x, endY: y });
    } else {
      // Terminar la línea actual y añadirla a la lista de líneas
      setLines(prevLines => [
        ...prevLines,
        { ...currentLine, endX: x, endY: y }
      ]);
      setCurrentLine(null);
    }
  };

  const handleMouseMove = (event) => {
    if (currentLine) {
      const { clientX, clientY } = event;
      const { left, top } = svgRef.current.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;

      setCurrentLine({ ...currentLine, endX: x, endY: y });

      console.log(currentLine);
    }
  };

  const Line = ({ index, line }) => {
    return (
      <g key={index}>
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
            r={radioDelCirculo}
            fill="red"
        />
        <circle
            cx={(line.startX + line.endX) / 2}
            cy={(line.startY + line.endY) / 2}
            r={radioDelCirculo}
            fill="blue"
        />
        <circle
            cx={line.endX}
            cy={line.endY}
            r={radioDelCirculo}
            fill="green"
        />
      </g>
    );
  }

  return (
    <>
      <pre>{JSON.stringify(lines, 0, 2)}</pre>
      <svg
        ref={svgRef}
        width="500"
        height="500"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <image xlinkHref="https://transformed-user-uploads.ca.la/ae9b5e85-1b23-4188-a774-e417247df9c1?fm=jpg&amp;bg=FFFFFF&amp;fit=max&amp;dpr=3" width="3000" height="2000" role="img" className="sc-btAVoO fofYYh"></image>
        {/* Renderizar líneas existentes */}
        <g>
          {lines.map((line, index) => (
            <Line key={index} index={index} line={line} />
          ))}
          {/* Renderizar la línea actual mientras se está dibujando */}
          {currentLine && (
            <line
              x1={currentLine.startX}
              y1={currentLine.startY}
              x2={currentLine.endX}
              y2={currentLine.endY}
              stroke="green"
            />
          )}
        </g>
      </svg>
    </>
  );
}
