import * as firebase from "firebase";

export const loginWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    // create the new user in firebase
    const authData = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    // set user in the state
    const userData = {
        id: authData.user.uid,
        username: authData.user.displayName,
        email: authData.user.email,
        emailVerified: authData.user.emailVerified
    };
    return userData;
};

export const writeUserData = (
    userId: string,
    username: string,
    email: string
) => {
    firebase
        .database()
        .ref("users/" + userId)
        .set({
            username: username,
            email: email
        });
};
