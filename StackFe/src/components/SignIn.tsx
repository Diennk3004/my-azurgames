import { LOGIN } from "@/graphql-client";
import { useMutation } from "@apollo/client";
import clsx from "clsx";
import { useAppDispatch } from "@/stores";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UserProps } from "@/types";
import { loginAction } from "@/slices";
type FormProps = {
  mobilephone: string;
  password: string;
};
const SignIn = () => {
  const dispatch = useAppDispatch();
  const [signIn] = useMutation(LOGIN);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<FormProps>({
    defaultValues: {
      mobilephone: "",
      password: ""
    }
  });
  const onSubmit: SubmitHandler<FormProps> = (dataFrm) => {
    const { mobilephone, password } = dataFrm;
    signIn({ variables: { email_phone: mobilephone.toString().trim(), password: password.toString().trim() } })
      .then(async (response: any) => {
        console.log("response = ", response);
        if (response && response.data && response.data.login) {
          let user: UserProps = response.data.login;
          localStorage.setItem("access_token", user.token);
          setTimeout(() => {
            dispatch(loginAction(user));
          }, 2000);
        }
      })
      .catch((err: any) => {});
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} name="loginFrm">
      <Controller
        name="mobilephone"
        defaultValue=""
        control={control}
        render={({ field }) => {
          return (
            <div>
              <div className={clsx(["text-sky-600", "font-bold", "text-sm"])}>Phone Number</div>
              <input {...field} className={clsx(["border", "border-gray-300", "pt-2", "pb-2", "pl-2", "pr-2", "outline-0", "w-full", "mt-2", "rounded-sm"])} type="text" placeholder="Please enter phone number" />
              {errors.mobilephone && <div className={clsx(["text-red-600", "text-sm", "mt-1"])}>{errors.mobilephone.message}</div>}
            </div>
          );
        }}
      />
      <div className={clsx(["pt-2", "pb-2"])}></div>
      <Controller
        name="password"
        defaultValue=""
        control={control}
        render={({ field }) => {
          return (
            <div>
              <div className={clsx(["text-sky-600", "font-bold", "text-sm"])}>Password</div>
              <input {...field} type="password" className={clsx(["border", "border-gray-300", "pt-2", "pb-2", "pl-2", "pr-2", "outline-0", "w-full", "mt-2", "rounded-sm"])} placeholder="Please enter password" />
              {errors.password && <div className={clsx(["text-red-600", "text-sm", "mt-1"])}>{errors.password.message}</div>}
            </div>
          );
        }}
      />
      <div className={clsx(["pt-2", "pb-2"])}></div>
      <div className={clsx(["text-right", "text-red-500", "text-sm", "font-bold"])}>Forgot password?</div>
      <button className={clsx(["mt-2", "text-white", "bg-red-600", "w-full", "pt-3", "pb-3", "font-bold", "rounded-sm"])} type="submit">
        Sign In
      </button>
    </form>
  );
};

export { SignIn };
