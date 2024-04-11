import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { SigninValidation } from "@/lib/validation";

import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useSignInAccount } from "@/lib/react-query/QueriesAndMuntations";
import { useUserContext } from "@/context/AuthContext";

export const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signInAccount, isPending } = useSignInAccount();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const onSubmit = async (values: z.infer<typeof SigninValidation>) => {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        title: "Sign in failed. Please try again.",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({
        title: "Sign in failed. Please try again.",
      });
    }
  };

  return (
    <div className="sm:w-[320px] flex justify-center items-center flex-col">
      <h2 className=" text-lg font-bold md:text-xl pt-5 sm:pt-12">
        Log in to your account
      </h2>
      <p className=" text-primary-light text-sm">
        Welcome back! Please enter your details
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-2">Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-primary-dark"
                    type="email"
                    {...field}
                  />
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
                <FormLabel className="pl-2">Password</FormLabel>
                <FormControl>
                  <Input
                    className="text-primary-dark"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary-light">
            {isUserLoading || isPending ? (
              <div className="flex justify-center items-center gap-2">
                <Loader />
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
          <p className="text-sm text-white text-center mt-2">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-primary-light font-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};
