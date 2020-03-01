import { ICoordinates } from "./Coordinates";

export interface ICrossWordQuestion {
    number: number;
    length: number;
    coordinates: ICoordinates;
    clue: string;
    correctAnswer: string[];
    proposedAnswer: string[];
    direction: CrossWordQuestionDirectionEnum;
}

export enum CrossWordQuestionDirectionEnum {
    VERTICAL = "VERTICAL",
    HORIZONTAL = "HORIZONTAL"
}
