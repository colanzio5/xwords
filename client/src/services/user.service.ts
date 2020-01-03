import * as firebase from "firebase";

export const writeUserData = (userId: string, username: string, email: string) => {
    firebase
        .database()
        .ref("users/" + userId)
        .set({
            username: username,
            email: email
        });
};