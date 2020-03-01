import {
    ICrossWordQuestion,
    CrossWordQuestionDirectionEnum
} from "./CrossWordQuestion";
import { User } from "./User";
import { IGridCell } from "./GridCell";
import { ICoordinates } from "./Coordinates";
import { testCrossword } from "../../assets/test.crossword";

export enum CrossWordGameStatusEnum {
    NOT_STARTED = "NOT_STARTED"
}
export interface ICrossWordGameMeta {
    dimensions: ICoordinates;
    questions: ICrossWordQuestion[];
}
export interface ICrossWordGame {
    id: string;
    name: string;
    status: CrossWordGameStatusEnum;
    createdAt: Date;
    owner: User;
    members: User[];
    meta: ICrossWordGameMeta;
    state?: IGridCell[][];
}

export class CrossWordGame {
    id: string;
    name: string;
    status: CrossWordGameStatusEnum;
    createdAt: Date;
    owner: User;
    members: User[];
    meta: ICrossWordGameMeta;
    state?: IGridCell[][];

    constructor(useDefault: boolean = false) {
        if (useDefault) {
            (<any>Object).assign(this, testCrossword);
            this.state = _initGridState(testCrossword);
        } else {
            this.id = null;
            this.name = null;
            this.status = null;
            this.createdAt = null;
            this.owner = null;
            this.members = null;
            this.meta = null;
            this.state = null;
        }
    }
}

const _initGridState = (game: CrossWordGame): IGridCell[][] => {
    // create new state grid
    // with attributes needed
    const generateArray = n => {
        let arr = [];
        for (let i = 0; i < n; i++) {
            arr.push(i);
        }
        return arr;
    };
    const { x, y } = game.meta.dimensions;
    const state = generateArray(y).map(y => {
        return generateArray(x).map(x => {
            const coordinates: ICoordinates = { x: x, y: y };
            const letterValue = "";
            const isTextCell = _isTextCell(game, x, y);
            const parentQuestion = _isRootCell(game, x, y);
            const gridCell = {
                coordinates,
                letterValue,
                isTextCell,
                parentQuestion
            };
            return gridCell;
        });
    });

    return state;
};

const _updateGridStateWithQuestionsState = (game: CrossWordGame) => {
    // populate grid with proposed
    // values for each question
    for (const question of game.meta.questions) {
        const proposedAnswer: string[] = question.proposedAnswer;
        let { x, y } = question.coordinates;
        for (const char of proposedAnswer) {
            game.state[y][x].letterValue = char;
            question.direction == CrossWordQuestionDirectionEnum.HORIZONTAL
                ? x++
                : y++;
        }
    }
    return game;
};

const _isRootCell = (game, x, y): ICrossWordQuestion | false => {
    const matchedQuestion = game.meta.questions.find(
        e => e.coordinates.x == x && e.coordinates.y == y
    );

    return matchedQuestion ? matchedQuestion : false;
};

const _isTextCell = (game, x, y): boolean => {
    let isCharCell = false;

    for (let element of game.meta.questions) {
        const isVertical =
            element.direction === CrossWordQuestionDirectionEnum.HORIZONTAL &&
            element.coordinates.y == y;

        const isHorizontal =
            element.direction === CrossWordQuestionDirectionEnum.VERTICAL &&
            element.coordinates.x == x;

        if (isVertical) {
            const low = element.coordinates.x;
            const high = low + element.length;
            if (x >= low && x < high) {
                isCharCell = true;
            }
        }

        if (isHorizontal) {
            if (element.coordinates.x == x) {
                const low = element.coordinates.y;
                const high = low + element.length;
                if (y >= low && y < high) {
                    isCharCell = true;
                }
            }
        }
    }
    return isCharCell;
};
