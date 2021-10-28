import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";

export default function Authentication() {
    const [mode, setMode] = useState<'login' | 'register'>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function submit() {
        if(mode === 'login') {
            console.log('login')
        } else {
            console.log('signup')
        }
    }
    return (
        <div>
            <h1 className={`
                text-xl font-bold mb-5
            `}>
                {mode === 'login' ? 'Inform your E-mail and Password' : 'Sign Up!'}
            </h1>
            <AuthInput
                label="E-mail"
                type="email"
                value={email}
                required
                valueChanged={setEmail}
            />
            <AuthInput
                label="Password"
                type="password"
                value={password}
                required
                valueChanged={setPassword}
            />

            <button onClick={submit} className={`
                w-full bg-indigo-500 hover:bg-indigo-400
                text-white rounded-lg px-4 py-3 mt-6
            `}>
                {mode === 'login' ? 'Log in' : 'Sign Up'}
            </button>

        </div>
    )
}