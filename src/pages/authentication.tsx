import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";

export default function Authentication() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            <h1>Authentication</h1>
            <AuthInput
                label="E-mail"
                type="email"
                value={email}
                valueChanged={setEmail}
            />
            <AuthInput
                label="Password"
                type="password"
                value={password}
                valueChanged={setPassword}
            />

        </div>
    )
}