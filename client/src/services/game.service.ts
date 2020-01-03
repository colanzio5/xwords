import * as firebase from "firebase";
import { testCrossword } from "../../assets/test.crossword";

export const createNewGame = async (
    gameName: string,
    ownerId: string,
    gamePassword: string,
    gameInfo: string
) => {
    const gameId = "12345"
    const createdGame = await firebase
        .database()
        .ref("games/" + gameId)
        .set(testCrossword);
    console.log("[createNewGame] new game created: ", createdGame);
    return createdGame;
};

export const fetchUserGames = async (
    userId: string
) => {
    const gamesRef = firebase.database().ref("games/");
    const snapshot = await gamesRef
        .orderByChild('owner')
        .equalTo(userId)
        .once("value");

    const games = snapshot.val();
    console.log("[fetchUserGames] games: ", games);
    const rooms = Object.keys(games).map(g => g);
    return rooms;
}
