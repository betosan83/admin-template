import route from "next/router";
import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import User from "../../model/User";
import Cookies from 'js-cookie'

interface AuthContextProps {
    user?: User
    googleLogin?: () => Promise<void>
    logout?: () => Promise<void>
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

function manageCookie(logged: boolean) {
    if (logged) {
        Cookies.set('admin-template-auth', logged, {
            expires: 7
        })
    } else {
        Cookies.remove('admin-template-auth')
    }
}

export function AuthProvider(props) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User>(null)

    async function configSession(userFirebase) {
        if (userFirebase?.email) {
            const user = await userModel(userFirebase)
            setUser(user)
            manageCookie(true)
            setLoading(false)
            return user.email
        } else {
            setUser(null)
            manageCookie(false)
            setLoading(false)
            return false
        }
    }

    async function googleLogin() {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
            configSession(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
        
    }

    async function logout() {
        try {
            setLoading(true)
            await firebase.auth().signOut()
            await configSession(null)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        const cancel = firebase.auth().onIdTokenChanged(configSession)
        return () => cancel()
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            googleLogin,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext