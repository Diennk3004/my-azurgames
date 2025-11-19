import clsx from "clsx";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
type FormProps = {
  mobilephone: string;
  last_name: string;
  first_name: string;
  email: string;
  password: string;
  password_confirmed: string;
};
const SignUp = () => {
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
  const onSubmit: SubmitHandler<FormProps> = (dataFrm) => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)} name="loginFrm" className={clsx(["pb-7"])}>
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
        name="last_name"
        defaultValue=""
        control={control}
        render={({ field }) => {
          return (
            <div>
              <div className={clsx(["text-sky-600", "font-bold", "text-sm"])}>Last name</div>
              <input {...field} className={clsx(["border", "border-gray-300", "pt-2", "pb-2", "pl-2", "pr-2", "outline-0", "w-full", "mt-2", "rounded-sm"])} type="text" placeholder="Please enter phone number" />
              {errors.last_name && <div className={clsx(["text-red-600", "text-sm", "mt-1"])}>{errors.last_name.message}</div>}
            </div>
          );
        }}
      />
      <div className={clsx(["pt-2", "pb-2"])}></div>
      <Controller
        name="first_name"
        defaultValue=""
        control={control}
        render={({ field }) => {
          return (
            <div>
              <div className={clsx(["text-sky-600", "font-bold", "text-sm"])}>First name</div>
              <input {...field} className={clsx(["border", "border-gray-300", "pt-2", "pb-2", "pl-2", "pr-2", "outline-0", "w-full", "mt-2", "rounded-sm"])} type="text" placeholder="Please enter phone number" />
              {errors.first_name && <div className={clsx(["text-red-600", "text-sm", "mt-1"])}>{errors.first_name.message}</div>}
            </div>
          );
        }}
      />
      <div className={clsx(["pt-2", "pb-2"])}></div>
      <Controller
        name="email"
        defaultValue=""
        control={control}
        render={({ field }) => {
          return (
            <div>
              <div className={clsx(["text-sky-600", "font-bold", "text-sm"])}>Email</div>
              <input {...field} className={clsx(["border", "border-gray-300", "pt-2", "pb-2", "pl-2", "pr-2", "outline-0", "w-full", "mt-2", "rounded-sm"])} type="text" placeholder="Please enter phone number" />
              {errors.email && <div className={clsx(["text-red-600", "text-sm", "mt-1"])}>{errors.email.message}</div>}
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
              <input {...field} className={clsx(["border", "border-gray-300", "pt-2", "pb-2", "pl-2", "pr-2", "outline-0", "w-full", "mt-2", "rounded-sm"])} type="text" placeholder="Please enter password" />
              {errors.password && <div className={clsx(["text-red-600", "text-sm", "mt-1"])}>{errors.password.message}</div>}
            </div>
          );
        }}
      />
      <div className={clsx(["pt-2", "pb-2"])}></div>
      <Controller
        name="password_confirmed"
        defaultValue=""
        control={control}
        render={({ field }) => {
          return (
            <div>
              <div className={clsx(["text-sky-600", "font-bold", "text-sm"])}>Confirm password</div>
              <input {...field} className={clsx(["border", "border-gray-300", "pt-2", "pb-2", "pl-2", "pr-2", "outline-0", "w-full", "mt-2", "rounded-sm"])} type="text" placeholder="Please enter password" />
              {errors.password_confirmed && <div className={clsx(["text-red-600", "text-sm", "mt-1"])}>{errors.password_confirmed.message}</div>}
            </div>
          );
        }}
      />
      <button className={clsx(["mt-4", "text-white", "bg-red-600", "w-full", "pt-3", "pb-3", "font-bold", "rounded-sm"])}>Sign Up</button>
    </form>
  );
};

export { SignUp };
