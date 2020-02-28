import * as firebase from "firebase";
import { testCrossword } from "../../assets/test.crossword";

export const createNewGame = async () =>
    // gameName: string,
    // ownerId: string,
    // gamePassword: string,
    // gameInfo: string
    {
        const gameId = "12345";
        const createdGame = await firebase
            .database()
            .ref("games/" + gameId)
            .set(testCrossword);
        console.log("[createNewGame] new game created: ", createdGame);
        return createdGame;
    };

export const fetchUserGames = async (owner: any) => {
    const gamesRef = firebase.database().ref("games/");
    const snapshot = await gamesRef.orderByChild("owner").once("value");

    const games = snapshot.val();
    console.log("[fetchUserGames] games: ", games);
    return Object.keys(games).map(g => {
        return games[g];
    });
};

export const fetchUserGameById = async gameId => {
    const gamesRef = firebase.database().ref(`games/${gameId}`);
    const snapshot = await gamesRef.once("value");
    return snapshot.val();
};

export const updateGameState = async (gameId, gameState) => {
    await firebase
        .database()
        .ref(`games/${gameId}/state`)
        .set(gameState);
};
