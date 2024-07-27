"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useResetPassword } from "./services/mutation";
import { PasswordInput } from "@/components/ui/password-input";
import { PasswordCheckers } from "../register/components/passwordCheckers";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPasswordSchema } from "@/validator/auth/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";

function ResetPasswordScreen({ searchParams }) {
  const router = useRouter();
  const resetPassword = useResetPassword();
  const token = searchParams.token;

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (value) => {
    console.log(value);
    resetPassword.mutate(
      { password: value.password, token },
      {
        onSuccess: (data) => {
          if (data.success) {
            router.replace("/auth/login");
          }
        },
        onError: (error) => {
          const err = error.response;
          if (
            err.data.success === false &&
            err.data.message.includes("Unauthorized")
          ) {
            return form.setError("confirmPassword", {
              message: "Request timed out please try again",
            });
          }
        },
      }
    );
  };

  if (!token) return router.replace("/auth/login");

  return (
    <div className="h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full flex justify-center items-center gap-10 flex-col font-SPR-Regular px-5"
        >
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-bold">Forgot password</h1>
            <p className="md:max-w-[400px] text-center text-lg text-muted-foreground leading-6">
              Forgot Password Don&apos;t worry, we&apos;re here to help you
              reset your password.
            </p>
          </div>
          <div className="w-full space-y-5">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-3">
                    <FormControl>
                      <PasswordInput
                        {...field}
                        className="w-full sm:w-[400px] !p-6 text-xl"
                        placeholder="password"
                      />
                    </FormControl>
                    <PasswordCheckers {...field} />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      className="w-full sm:w-[400px] !p-6 text-xl"
                      placeholder="confirm password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={resetPassword.isPending && true}
            className="bg-primary hover:bg-primary-foreground hover:text-primary"
          >
            {resetPassword.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Reset password
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ResetPasswordScreen;
