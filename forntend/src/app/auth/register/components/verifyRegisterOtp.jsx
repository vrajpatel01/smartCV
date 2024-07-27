"use client";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useContext, useEffect, useState } from "react";
import { useGetRegisterOTP, useVerifyRegisterOTP } from "../services/mutation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { registerStepContext } from "../context/useRegisterSteps";
import { RxReload } from "react-icons/rx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { registerOTPSchema } from "@/validator/auth/register.otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function RegisterOtp({ tokens, setTokens }) {
  const { email, setRegisterStep } = useContext(registerStepContext);
  const [otp, setOtp] = useState("");
  const [validate, setValidate] = useState("");
  const [resentOtp, setResentOtp] = useState(false);

  const verifyOTP = useVerifyRegisterOTP();
  const resendOTP = useGetRegisterOTP();

  const handleResendOTP = () => {
    resendOTP.mutate(email, {
      onSuccess: (res) => {
        const response = res.data;
        setTokens({
          ...tokens,
          otpToken: response.data.otpToken,
        });

        if (response.success === true) return setResentOtp(false);
      },
      onError: (error) => {
        const err = error.response.data.data.errors[0].message;
        if (err) return form.setError("otp", { message: err });
        form.setError("otp", { message: error.response.data.message });
      },
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setResentOtp(true);
    }, 10000);

    return () => clearInterval(interval);
  }, [resentOtp]);

  const form = useForm({
    resolver: zodResolver(registerOTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (value) => {
    verifyOTP.mutate(
      {
        otp: parseInt(value.otp),
        otpToken: tokens.otpToken,
      },
      {
        onSuccess: (res) => {
          const response = res.data;
          setTokens({
            ...tokens,
            registerToken: response.data.registerToken,
          });
          if (response.success === true) return setRegisterStep(3);
          return form.setError("otp", { message: response.data.message });
        },
        onError: (error) => {
          if (error.response.data.success == false)
            return form.setError("otp", {
              message: error.response.data.message,
            });
          toast.error("Having some issue please try again");
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center gap-10 flex-col font-SPR-Regular px-5">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold">Enter OTP</h1>
        <p className="max-w-[400px] text-center text-lg text-muted-foreground leading-6">
          Please check your email we sent OTP to your email
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            name="otp"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP {...field} maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot
                        className={`!p-6 text-xl ${
                          validate !== "" &&
                          "ring-destructive !border-destructive"
                        }`}
                        index={0}
                      />
                      <InputOTPSlot
                        className={`!p-6 text-xl ${
                          validate !== "" &&
                          "ring-destructive !border-destructive"
                        }`}
                        index={1}
                      />
                      <InputOTPSlot
                        className={`!p-6 text-xl ${
                          validate !== "" &&
                          "ring-destructive !border-destructive"
                        }`}
                        index={2}
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator
                      className={`${
                        validate !== "" && "text-destructive"
                      } hidden sm:block`}
                    />
                    <InputOTPGroup>
                      <InputOTPSlot
                        className={`!p-6 text-xl ${
                          validate !== "" &&
                          "ring-destructive !border-destructive"
                        }`}
                        index={3}
                      />
                      <InputOTPSlot
                        className={`!p-6 text-xl ${
                          validate !== "" &&
                          "ring-destructive !border-destructive"
                        }`}
                        index={4}
                      />
                      <InputOTPSlot
                        className={`!p-6 text-xl ${
                          validate !== "" &&
                          "ring-destructive !border-destructive"
                        }`}
                        index={5}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {resentOtp && (
            <div className="w-full flex justify-end">
              <div
                onClick={handleResendOTP}
                className="flex justify-center items-center gap-2 text-sm cursor-pointer px-3 text-muted-foreground py-1 hover:bg-primary-foreground rounded-full whitespace-nowrap max-w-min"
              >
                <RxReload
                  className={`${
                    resendOTP.isPending && "animate-spin vote 1s ease-in-out"
                  }`}
                />
                <span>Resend OTP</span>
              </div>
            </div>
          )}
          <div className="text-center">
            <Button
              disabled={verifyOTP.isPending && true}
              className="bg-primary hover:bg-primary-foreground hover:text-primary"
            >
              {verifyOTP.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Continue</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
