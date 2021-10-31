import { createContext, useState } from "react";
import firebase from "../../firebase/config";
import User from "../../model/User";

interface AuthContextProps {
    user: User
    loginGoogle: () => Promise<void>
}

const AuthContext = createContext({})

export function AuthProvider(props) {
    const [user, setUder] = useState<User>(null)

    async function googleLogin() {
        
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