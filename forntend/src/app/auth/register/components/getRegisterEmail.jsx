"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetRegisterOTP } from "../services/mutation";
import { Loader2 } from "lucide-react";
import { useContext } from "react";
import { registerStepContext } from "../context/useRegisterSteps";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { registerEmailSchema } from "@/validator/auth/register.email";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function GetRegisterEmail({ tokens, setTokens }) {
  const { setEmail, email, setRegisterStep } = useContext(registerStepContext);
  const getRegisterOTP = useGetRegisterOTP();

  const form = useForm({
    resolver: zodResolver(registerEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (value) => {
    getRegisterOTP.mutate(value.email, {
      onSuccess: (res) => {
        const response = res.data;
        setTokens({
          ...tokens,
          otpToken: response.data.otpToken,
        });
        setEmail(value.email);
        if (response.success === true) return setRegisterStep(2);
        return form.setError("email", { message: response.data.message });
      },
      onError: (error) => {
        const err = error.response.data.message;
        if (err) return form.setError("email", { message: err });
      },
    });
  };

  return (
    <div className="flex justify-center items-center gap-10 flex-col font-SPR-Regular px-5">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold">Creating account</h1>
        <p className="md:max-w-[400px] text-center text-lg text-muted-foreground leading-6">
          Enter your email address so we send registration OTP to your email
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="!w-full md:w-80 !p-6 text-xl"
                    placeholder="example@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-center">
            <Button
              disabled={getRegisterOTP.isPending}
              className="bg-primary hover:bg-primary-foreground hover:text-primary"
            >
              {getRegisterOTP.isPending && (
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
