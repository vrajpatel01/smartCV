"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/validator/auth/login";
import Link from "next/link";

export default function LoginScreen() {
  const router = useRouter();
  // const [validCredentials, setValidCredentials] = useState(false)
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value) => {
    try {
      setLoading(true);
      const status = await signIn("credentials", {
        username: value.email,
        password: value.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (!status.ok && status.error !== null) {
        setLoading(false);
        return form.setError("password", { message: status.error });
      }

      return router.replace(status.url);
    } catch (error) {
      setLoading(false);
      return form.setError("password", {
        message: "Having some issue please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 w-full flex justify-center items-center gap-10 flex-col font-SPR-Regular px-5 h-full my-20">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="max-w-[400px] text-center text-lg text-muted-foreground leading-6">
          Enter your email address and password which you have registered
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full sm:min-w-[400px]"
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
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    className="!w-full md:w-80 !p-6 text-xl"
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end w-full">
            <Link href="/auth/forgot-password">Forgot password?</Link>
          </div>
          <div className="text-center w-full">
            <Button
              disabled={loading && true}
              className="bg-primary hover:bg-primary-foreground hover:text-primary"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <span>Login</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
