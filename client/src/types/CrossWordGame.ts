import { CrossWordQuestion } from "./CrossWordQuestion"
import { User } from "./User"
import { Coordinates } from "./Coordinates"
import { GridCell } from "./GridCell"

export type CrossWordGame = {
    id: string,
    name: string,
    status: CrossWordGameStatusEnum,
    createdAt: Date,
    owner: User,
    members: User [],
    meta: CrossWordGameMeta,
    state: CrossWordGameState
}

export enum CrossWordGameStatusEnum {
    NOT_STARTED = "NOT_STARTED",
}

export type CrossWordGameMeta = {
    dimensions: Coordinates
    questions: CrossWordQuestion []
}

export type CrossWordGameState = GridCell[][]