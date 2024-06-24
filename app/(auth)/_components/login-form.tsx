"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchemaType, LoginSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/login-action";
import { toast } from "sonner";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      toast.success("Logged in", {
        id: "login-toast",
      });
    },
    onError: (error: Error) => {
      console.log("Error from login mutation");
      toast.error("Invalid credentials", {
        id: "login-toast",
      });
    },
  });

  const onSubmit = useCallback(
    async (data: LoginSchemaType) => {
      toast.loading("Logging in...", {
        id: "login-toast",
      });
      const request = {
        credentials: data,
        redirectLocation: searchParams.has("redirect")
          ? (searchParams.get("redirect") as string)
          : false,
      };
      mutate(request);
    },
    [mutate]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid gap-4")}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="@johndoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full disabled:cursor-not-allowed"
          disabled={isPending}
        >
          Login
        </Button>
      </form>
    </Form>
  );
};
