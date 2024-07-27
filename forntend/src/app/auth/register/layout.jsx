"use client";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useEffect } from "react";
import { registerStepContext } from "./context/useRegisterSteps";

export default function RegisterLayout({ children }) {
  const [registerStep, setRegisterStep] = useState(1);
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (registerStep > 1) {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
      };
      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [registerStep]);
  return (
    <registerStepContext.Provider
      value={{ registerStep, setRegisterStep, email, setEmail }}
    >
      <div className="flex justify-between flex-col h-full items-center mb-5">
        <Badge className="text-base px-4 py-2">Welcome 😃</Badge>

        {children}
        <div className="flex justify-center items-center gap-4">
          <div
            className={`${
              registerStep === 1 ? "bg-primary" : "bg-black"
            } w-10 h-2 rounded-full`}
          ></div>
          <div
            className={`${
              registerStep === 2 ? "bg-primary" : "bg-black"
            } w-10 h-2 rounded-full`}
          ></div>
          <div
            className={`${
              registerStep === 3 ? "bg-primary" : "bg-black"
            } w-10 h-2 rounded-full`}
          ></div>
        </div>
      </div>
    </registerStepContext.Provider>
  );
}
