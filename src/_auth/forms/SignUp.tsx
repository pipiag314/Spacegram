import { zodResolver } from "@hookform/resolvers/zod";

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
import { useForm } from "react-hook-form";
import { signUpValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useCreateUserMutation, useSignInAccount } from "@/lib/query/mutations";
import { useUserContext } from "@/context/UserContext";

const SignUp = () => {
  const { toast } = useToast();

  const navigate = useNavigate();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: createUserAccount, isPending: isCreatingUserAccount } =
    useCreateUserMutation();

  const { mutateAsync: signInToAccount, isPending: isSigningInToAccount } =
    useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      username: "",
      name: "",
      password: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signUpValidation>) {
    // register the User
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        title: "Error while sign up, Try again.",
      });
    }

    const session = await signInToAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      toast({
        title: "Sign in failed",
      });
    }

    const isLoggedIn = await checkAuthUser();
    if(isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({ title: "sign up failed"})
    }
    
  }

  return (
    <Form {...form}>
      <div className="sm:w-[420px] flex-center flex-col">
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
          Create new accout
        </h2>
        <p className="text-light-3 font-medium leading-[140%] text-[14px] md:text-[16px] md:font-normal mt-2">
          craete new account to use Spacegram
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-5 mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="enter your name"
                    className="input"
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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="enter your username"
                    className="input"
                    {...field}
                  />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="enter your e-mail"
                    className="input"
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
                    type="password"
                    placeholder="enter your password"
                    className="input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="button-primary">
            {isCreatingUserAccount ? (
              <div className="flex-center gap-2">
                <Loader /> Submitting...
              </div>
            ) : (
              "Submit"
            )}
          </Button>
          <p className="text-sm text-light-3 md:text-base text-center">
            Already have an account?{" "}
            <Link className="underline text-primary-500" to="/sign-in">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};
export default SignUp;
