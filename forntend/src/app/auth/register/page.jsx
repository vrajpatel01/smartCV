"use client";
import { useContext, useState } from "react";
import GetRegisterEmail from "./components/getRegisterEmail";
import RegisterOtp from "./components/verifyRegisterOtp";
import FinalRegistration from "./components/finalRegistration";
import { registerStepContext } from "./context/useRegisterSteps";

export default function RegisterScreen() {
  const { registerStep } = useContext(registerStepContext);
  const [tokens, setTokens] = useState({
    otpToken: undefined,
    registerToken: undefined,
  });

  return (
    <div className="my-20">
      {registerStep === 1 && (
        <GetRegisterEmail tokens={tokens} setTokens={setTokens} />
      )}
      {registerStep === 2 && (
        <RegisterOtp setTokens={setTokens} tokens={tokens} />
      )}
      {registerStep === 3 && (
        <FinalRegistration tokens={tokens} setTokens={setTokens} />
      )}
    </div>
  );
}
