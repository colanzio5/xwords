import { CrossWordQuestion } from "./CrossWordQuestion";
import { Coordinates } from "./Coordinates";
export type GridCell = {
    coordinates: Coordinates,
    letterValue: string,
    isTextCell: boolean,
    parentQuestion: CrossWordQuestion | false;
}