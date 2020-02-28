import { ICrossWordQuestion } from "./CrossWordQuestion";
import { ICoordinates } from "./Coordinates";
export interface IGridCell {
    coordinates: ICoordinates;
    letterValue: string;
    isTextCell: boolean;
    parentQuestion: ICrossWordQuestion | false;
}
