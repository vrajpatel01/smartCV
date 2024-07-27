"use client";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { useForgotPassword } from "../services/mutation";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgotPasswordSchema } from "@/validator/auth/forgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ForgotPasswordForm({ setStage }) {
  const forgotPassword = useForgotPassword();
  const form =
    useForm <
    z.infer <
    typeof forgotPasswordSchema >>
      {
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
          email: "",
        },
      };

  const onSubmit = (value) => {
    console.log(value.email);
    forgotPassword.mutate(value.email, {
      onSuccess: (data) => {
        if (data.success) {
          setStage(2);
        }
      },
      onError: (error) => {
        const err = error.response;
        if (err.data.success === false) {
          // setValidate(err.data.message)
          return form.setError("email", { message: err.data.message });
        }
      },
    });
  };
  return (
    <div className="flex justify-center items-center gap-10 h-full flex-col font-SPR-Regular px-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-bold">Forgot password</h1>
            <p className="md:max-w-[400px] text-center text-lg text-muted-foreground leading-6">
              Forgot Password Don&apos;t worry, we&apos;re here to help you
              reset your password.
            </p>
          </div>
          <div className="space-y-1 w-full">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full sm:w-[400px] !p-6 text-xl"
                      placeholder="example@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="text-center">
            <Button
              disabled={forgotPassword.isPending && true}
              className="bg-primary hover:bg-primary-foreground hover:text-primary"
            >
              {forgotPassword.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Forgot password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
