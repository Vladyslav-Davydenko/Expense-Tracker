import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { SignupValidation } from "@/lib/validation";

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
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/QueriesAndMuntations";
import { useUserContext } from "@/context/AuthContext";

export const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount } = useSignInAccount();

  const { checkAuthUser } = useUserContext();

  const onSubmit = async (values: z.infer<typeof SignupValidation>) => {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        title: "Sign up failed. Please try again.",
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        title: "Sign up failed. Please try again.",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({
        title: "Sign up failed. Please try again.",
      });
    }
  };

  return (
    <div className="sm:w-[320px] flex justify-center items-center flex-col">
      <h2 className=" text-lg font-bold md:text-xl pt-5 sm:pt-12">
        Create a new account
      </h2>
      <p className=" text-primary-light text-sm">
        To use Expense Tracker enter your details
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-2">Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-primary-dark"
                    type="text"
                    data-testid="name_input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-2">Username</FormLabel>
                <FormControl>
                  <Input className="text-primary-dark" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            {isCreatingUser ? (
              <div className="flex justify-center items-center gap-2">
                <Loader />
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
          <p className="text-sm text-white text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-light font-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};
