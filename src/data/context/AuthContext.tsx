import route from "next/router";
import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import User from "../../model/User";
import Cookies from 'js-cookie'

interface AuthContextProps {
    user?: User
    loading?: boolean
    signup?: (email: string, password: string) => Promise<void>
    login?: (email: string, password: string) => Promise<void>
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

    async function signup(email, password) {
        try {
            setLoading(true)
            const resp = await firebase.auth()
                .createUserWithEmailAndPassword(email, password)

            await configSession(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
        
    }
    async function login(email, password) {
        try {
            setLoading(true)
            const resp = await firebase.auth()
                .signInWithEmailAndPassword(email, password)

            await configSession(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
        
    }

    async function googleLogin() {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
            await configSession(resp.user)
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
        if(Cookies.get('admin-template-auth')) {
            const cancel = firebase.auth().onIdTokenChanged(configSession)
        return () => cancel()
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signup,
            login,
            googleLogin,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext