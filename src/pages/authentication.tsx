import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { WarningIcon } from "../components/icons";
import useAuth from "../data/hook/useAuth";

export default function Authentication() {
    const { user, googleLogin } = useAuth()

    const [mode, setMode] = useState<'login' | 'register'>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    function showError(msg, time = 5) {
        setError(msg)
        setTimeout(() => setError(null), time + 1000)
    }

    function submit() {
        if (mode === 'login') {
            console.log('login')
            showError('Login error')
        } else {
            console.log('signup')
            showError('Sig up error')
        }
    }
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="hidden md:block md:w-1/2 lg:w-2/3">
                <img className="h-screen w-full object-cover"
                    src="https://source.unsplash.com/random"
                    alt="Auth image" />
            </div>
            <div className="m-10 w-full md:w-1/2 lg:w-1/3">
                <h1 className={`
                text-3xl font-bold mb-5
            `}>
                    {mode === 'login' ? 'Inform your E-mail and Password' : 'Sign Up!'}
                </h1>

                {error ? (
                    <div className={`
                    flex items-center
                    bg-red-400 text-white py-3 px-5 my-2
                    border border-red-700 rounded-lg
                `}>
                        {WarningIcon(6)}
                        <span className="ml-3">{error}</span>
                    </div>
                ) : false}

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

                <hr className="my-6 border-gray-300 w-full" />

                <button onClick={submit} className={`
                    w-full bg-red-500 hover:bg-red-400
                    text-white rounded-lg px-4 py-3
                `}>
                    Join with Google!
                </button>

                {mode === 'login' ? (
                    <p className="mt-8">
                        New user?
                        <a onClick={() => setMode('register')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}> Register now!</a>
                    </p>
                ) : (
                    <p className="mt-8">
                        Already a member?
                        <a onClick={() => setMode('login')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}> Enter your e-mail and account.</a>
                    </p>
                )}

            </div>
        </div>

    )
}