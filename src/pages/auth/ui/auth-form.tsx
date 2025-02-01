import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthError, useLogin, useRegister } from "~/features/auth";
import { useToast } from "~/shared/lib/use-toast";
import { Button } from "~/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { Input } from "~/shared/ui/input";

// Схемы валидации для формы
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type LoginSchema = z.infer<typeof loginSchema>;
type RegisterSchema = z.infer<typeof registerSchema>;

type AuthFormProps = {
  onSuccess: () => void;
};

export const AuthForm = ({ onSuccess }: AuthFormProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const toggleMode = () =>
    setMode((prev) => (prev === "login" ? "register" : "login"));

  const { toast } = useToast();

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const form = useForm<LoginSchema | RegisterSchema>({
    resolver: zodResolver(mode === "login" ? loginSchema : registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: LoginSchema | RegisterSchema) => {
    if (mode === "login") {
      loginMutation.mutate(
        { email: data.email, password: data.password },
        {
          onSuccess,
          onError: (error: unknown) => {
            // Проверяем, что это AxiosError
            if (axios.isAxiosError(error)) {
              // Извлекаем серверный ответ (данные об ошибке)
              const serverError = error.response?.data as AuthError | undefined;

              toast({
                variant: "destructive",
                title: "Login Error",
                description: serverError?.message ?? "Login failed",
                duration: 3000,
              });

              return;
            }

            // На случай, если это не axios-ошибка
            toast({
              variant: "destructive",
              title: "Login Error",
              description: "Unknown error...",
            });
          },
        }
      );
    } else {
      registerMutation.mutate(
        { email: data.email, password: data.password },
        {
          onSuccess,
          onError: (error: any) => {
            if (axios.isAxiosError(error)) {
              const serverError = error.response?.data as AuthError | undefined;

              toast({
                variant: "destructive",
                title: "Register Error",
                description: serverError?.message ?? "Register failed",
                duration: 3000,
              });

              return;
            }

            toast({
              variant: "destructive",
              title: "Register Error",
              description: "Unknown error...",
            });
          },
        }
      );
    }
  };

  // Покажем индикатор загрузки на кнопке, если идёт запрос
  const isLoading =
    mode === "login" ? loginMutation.isPending : registerMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {mode === "login" ? "Login to your account" : "Create an account"}
            </CardTitle>
            <CardDescription>
              {mode === "login"
                ? "Enter your email and password below to login to your account"
                : "Enter your email and password below to create an account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.email?.message}
                      </FormMessage>
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
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.password?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {mode === "register" && (
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage>
                          {"confirmPassword" in form.formState.errors &&
                            form.formState.errors.confirmPassword?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                )}
                <Button type="submit" className="w-full">
                  {isLoading && <Loader2 className="animate-spin" />}
                  {mode === "login" ? "Login" : "Register"}
                </Button>
              </div>

              <div className="text-center text-sm">
                {mode === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <Button variant="link" type="button" onClick={toggleMode}>
                  {mode === "login" ? "Sign up" : "Sign in"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
