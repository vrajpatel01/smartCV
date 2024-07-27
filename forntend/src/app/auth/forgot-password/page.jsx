'use client';
import { useState } from "react";
import ForgotPasswordForm from "./components/forgotPassword";
import ForgotPasswordSuccess from "./components/forgotPasswordSuccess";

export default function ForgotPasswordScreen() {
    const [stage, setStage] = useState(1)
    return (
        <div className="h-full">
            {stage === 1 && <ForgotPasswordForm setStage={setStage} />}
            {stage === 2 && <ForgotPasswordSuccess />}
        </div>
    )
}