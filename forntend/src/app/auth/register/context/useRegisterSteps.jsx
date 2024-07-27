import { createContext } from "react";

export const registerStepContext = createContext({
  registerStep: 1,
  setRegisterStep: (step) => {},
  email: "",
  setEmail: (email) => {},
});
