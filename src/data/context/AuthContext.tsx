import route from "next/router";
import { createContext, useState } from "react";
import firebase from "../../firebase/config";
import User from "../../model/User";

interface AuthContextProps {
    user?: User
    googleLogin?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function userModel(userFirebase: firebase.User): Promise<User> {
    const token = await userFirebase.getIdToken()
    return {
        uid: userFirebase.uid,
        name: userFirebase.displayName,
        email: userFirebase.email,
        token,
        provider: userFirebase.providerData[0].providerId,
        imageUrl: userFirebase.photoURL

    }
}

export function AuthProvider(props) {
    const [user, setUser] = useState<User>(null)

    async function googleLogin() {
        const resp = await firebase.auth().signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        )
        if (resp.user.email) {
            const user = await userModel(resp.user)
            setUser(user)
            route.push('/')
        }

    }

    return (
        <AuthContext.Provider value={{
            user,
            googleLogin
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext