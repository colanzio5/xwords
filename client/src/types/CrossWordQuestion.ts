import { Coordinates } from "./Coordinates";

export type CrossWordQuestion = {
    number: number,
    length: number,
    coordinates: Coordinates,
    clue: string,
    answer: string,
    direction: CrossWordQuestionDirectionEnum
}

export enum CrossWordQuestionDirectionEnum {
    VERTICAL = "VERTICAL",
    HORIZONTAL = "HORIZONTAL"
}

