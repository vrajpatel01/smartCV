import * as React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const PasswordCheckers = React.forwardRef((props) => {
  const { value } = props;
  const [passwordValidator, setPasswordValidator] = useState({
    uppercase: false,
    numbers: false,
    special: false,
    length: false,
    submitCheck: true,
  });
  useEffect(() => {
    const passwordValidator = {
      uppercase: /[A-Z]/.test(value),
      numbers: /[0-9]/.test(value),
      special: /[!@#$%^&*(),.?":{}|<>]/g.test(value),
      length: value.length >= 8,
      submitCheck: true,
    };
    setPasswordValidator(passwordValidator);
  }, [value]);
  return (
    <div className="pl-5 space-y-1">
      <PasswordCheckerItem
        text="Password must have Upper case characters"
        validate={passwordValidator.uppercase}
      />
      <PasswordCheckerItem
        text="Password mst be at least 8 characters long"
        validate={passwordValidator.length}
      />
      <PasswordCheckerItem
        text="Special characters"
        validate={passwordValidator.special}
      />
      <PasswordCheckerItem
        text="Password must have numbers"
        validate={passwordValidator.numbers}
      />
    </div>
  );
});

PasswordCheckers.displayName = "PasswordCheckers";

const PasswordCheckerItem = ({ validate, text }) => {
  return (
    <div className="flex justify-start items-center gap-2">
      <IoCheckmarkCircle
        className={cn("text-destructive", {
          "text-green-600": validate,
        })}
      />

      <p className="text-muted-foreground text-sm whitespace-nowrap">{text}</p>
    </div>
  );
};

export { PasswordCheckers };
