"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { PasswordCheckers } from "./passwordCheckers";
import { useRegister } from "../services/mutation";
import { toast } from "sonner";
import { registerStepContext } from "../context/useRegisterSteps";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/validator/auth/register";
import { zodResolver } from "@hookform/resolvers/zod";

export default function FinalRegistration({ tokens, setTokens }) {
  const router = useRouter();
  const { email, setRegisterStep } = useContext(registerStepContext);
  const [passwordValidate, setPasswordValidate] = useState({
    uppercase: false,
    numbers: false,
    special: false,
    length: false,
    submitCheck: true,
  });
  const [loading, setLoading] = useState(false);

  const finalRegister = useRegister();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = (value) => {
    finalRegister.mutate(
      {
        name: value.name,
        password: value.password,
        registerToken: tokens.registerToken,
      },
      {
        onError: (error) => {
          if (error.response.data)
            return toast.error(error.response.data.message);
          return toast.error("Request timed out Please try again");
        },
        async onSuccess(res) {
          const response = res.data;
          if (response.success) {
            try {
              setLoading(true);
              const status = await signIn("credentials", {
                username: email,
                password: value.password,
                redirect: false,
                callbackUrl: "/",
              });
              console.log(status);

              if (!status.ok && status.error !== null) {
                setLoading(false);
                toast.error(status.error);
              }

              router.replace(status.url);
            } catch (error) {
              setLoading(false);
              return toast.error("Having some issue please try again");
            } finally {
              setLoading(false);
            }
          }
        },
      }
    );
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center items-center gap-10 flex-col font-SPR-Regular px-5"
        >
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-bold">Creating account</h1>
            <p className="max-w-[400px] text-center text-lg text-muted-foreground leading-6">
              Enter your email address so we send registration OTP to your email
            </p>
          </div>

          <div className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full sm:w-[400px] !p-6 text-xl"
                      placeholder="Jon doe"
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
                  <div className="space-y-3">
                    <FormControl>
                      <PasswordInput
                        {...field}
                        className="w-full sm:w-[400px] !p-6 text-xl"
                        placeholder="••••••••"
                      />
                    </FormControl>
                    <PasswordCheckers {...field} />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center items-center gap-5">
            <Button
              type="button"
              onClick={() => setRegisterStep(1)}
              variant="ghost"
            >
              Back
            </Button>
            <Button
              disabled={(finalRegister.isPending || loading) && true}
              className="bg-primary hover:bg-primary-foreground hover:text-primary"
            >
              {(finalRegister.isPending || loading) && (
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
