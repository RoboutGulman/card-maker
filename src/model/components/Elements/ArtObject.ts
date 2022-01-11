import { position, Size } from "../../Types";

export function getTrianglePoints(position:position, size:Size): string {
    const firstPoint = `${position.x},${position.y + size.height}`;
    const secondPoint = `${position.x + size.width / 2},${position.y}`;
    const thirdPoint = `${position.x + size.width},${position.y + size.height}`;
    return `${firstPoint} ${secondPoint} ${thirdPoint}`;
}
export function calculateCircle(position:position, size:Size) {
    if (size.width < size.height) 
      return {
        cx: position.x + size.width / 2,
        cy: position.y + size.height / 2,
        r: size.width / 2 - 1
      };
    else 
      return {
        cx: position.x + size.width / 2,
        cy: position.y + size.height / 2,
        r: size.height / 2 - 1
      };
  }