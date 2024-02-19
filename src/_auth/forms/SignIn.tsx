import { Button } from "@/components/ui/button";
import { signInValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import Loader from "@/components/shared/Loader";

const SignIn = () => {
  const { isLoading: isUserLoading, checkAuthUser } = useUserContext();

  // 1. Define your form.
  const form = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signInValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className="flex-center flex-col sm:w-[420px]">
        <div className="flex justify-center font-bold text-3xl gap-2">
          <img
            width={30}
            height={30}
            className="object-contain"
            src="/assets/icons/favicon.ico"
          />
          Spacegram
        </div>
        <h2 className="text-[24px] md:text-[30px] font-bold leading-[140%] tracking-tighter">
          Sign In to your account
        </h2>
        <form
          className="flex flex-col w-full gap-5 mt-4"
          onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="input"
                    type="text"
                    placeholder="Enter your Email"
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="input"
                    type="password"
                    placeholder="Enter your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="button-primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="text-sm text-light-3 md:text-base text-center">
            Don't have an account?{" "}
            <Link className="underline text-primary-500" to="/sign-up">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};
export default SignIn;
