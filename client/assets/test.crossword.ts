export const testCrossword = {
    id: "12345",
    name: "test game",
    status: "NOT_STARTED",
    createdAt: "01/03/2020",
    owner: {
        id: "uDUkMAqgh4fG4g0XmjbUeTcDsxf1",
        username: "Colanzio5",
        email: "Colanzio5@gmail.com"
    },
    members: [],
    meta: {
        height: 10,
        width: 13,
        across: [
            {
                number: 3,
                length: 9,
                cords: { height: 2, width: 0 },
                clue: '"Hump" day. This day is in the middle of the week.',
                answer: "Wednesday"
            },
            {
                number: 5,
                length: 8,
                cords: { height: 4, width: 5 },
                clue: 'Abbreviated as "Thurs"',
                answer: "Thursday",
            },
            {
                number: 6,
                length: 7,
                cords: { height: 8, width: 1 },
                clue: 'People say this is the most productive day of the week. Hint: it isn\'t Monday!',
                answer: "Tuesday"
            },
            {
                number: 7,
                length: 6,
                cords: { height: 9, width: 0 },
                clue: 'The last day of the week. A day to rest.',
                answer: "Sunday"
            }
        ],
        down: [
            {
                number: 1,
                length: 6,
                cords: { height: 0, width: 3 },
                clue: 'This is the first day of the week',
                answer: "Monday"
            },
            {
                number: 2,
                length: 6,
                cords: { height: 1, width: 10 },
                clue: 'This days starts the weekend! Thank gosh it\'s _______!',
                answer: "Friday"
            },
            {
                number: 4,
                length: 8,
                cords: { height: 2, width: 5 },
                clue: 'Starts with the letter "S". It\'s not Sunday!',
                answer: "Saturday"
            }
        ]
    }
}