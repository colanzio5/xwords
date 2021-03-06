import {
    CrossWordGame,
    CrossWordGameStatusEnum
} from "../src/types/CrossWordGame";
import { CrossWordQuestionDirectionEnum } from "../src/types/CrossWordQuestion";

export const testCrossword: CrossWordGame = {
    id: "12345",
    name: "test game",
    status: "NOT_STARTED" as CrossWordGameStatusEnum,
    state: null,
    createdAt: new Date(),
    owner: {
        id: "uDUkMAqgh4fG4g0XmjbUeTcDsxf1",
        username: "Colanzio5",
        email: "Colanzio5@gmail.com"
    },
    members: [],
    meta: {
        dimensions: {
            x: 13,
            y: 10
        },
        questions: [
            {
                number: 3,
                length: 9,
                coordinates: { y: 2, x: 0 },
                clue: '"Hump" day. This day is in the middle of the week.',
                proposedAnswer: new Array("Wednesday".length).fill(""),
                correctAnswer: "Wednesday".split(""),
                direction: CrossWordQuestionDirectionEnum.HORIZONTAL
            },
            {
                number: 5,
                length: 8,
                coordinates: { y: 4, x: 5 },
                clue: 'Abbreviated as "Thurs"',
                proposedAnswer: new Array("Thursday".length).fill(""),
                correctAnswer: "Thursday".split(""),
                direction: CrossWordQuestionDirectionEnum.HORIZONTAL
            },
            {
                number: 6,
                length: 7,
                coordinates: { y: 7, x: 1 },
                clue:
                    "People say this is the most productive day of the week. Hint: it isn't Monday!",
                proposedAnswer: new Array("Tuesday".length).fill(""),
                correctAnswer: "Tuesday".split(""),
                direction: CrossWordQuestionDirectionEnum.HORIZONTAL
            },
            {
                number: 7,
                length: 6,
                coordinates: { y: 9, x: 0 },
                clue: "The last day of the week. A day to rest.",
                proposedAnswer: new Array("Sunday".length).fill(""),
                correctAnswer: "Sunday".split(""),
                direction: CrossWordQuestionDirectionEnum.HORIZONTAL
            },
            {
                number: 1,
                length: 6,
                coordinates: { y: 0, x: 3 },
                clue: "This is the first day of the week",
                proposedAnswer: new Array("Monday".length).fill(""),
                correctAnswer: "Monday".split(""),
                direction: CrossWordQuestionDirectionEnum.VERTICAL
            },
            {
                number: 2,
                length: 6,
                coordinates: { y: 1, x: 10 },
                clue: "This days starts the weekend! Thank gosh it's _______!",
                proposedAnswer: new Array("Friday".length).fill(""),
                correctAnswer: "Friday".split(""),
                direction: CrossWordQuestionDirectionEnum.VERTICAL
            },
            {
                number: 4,
                length: 8,
                coordinates: { y: 2, x: 5 },
                clue: 'Starts with the letter "S". It\'s not Sunday!',
                proposedAnswer: new Array("Saturday".length).fill(""),
                correctAnswer: "Saturday".split(""),
                direction: CrossWordQuestionDirectionEnum.VERTICAL
            }
        ]
    }
};
