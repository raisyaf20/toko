/* eslint-disable react-hooks/rules-of-hooks */
import styles from "@/styles/auth/Auth.module.scss";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const LoginView = () => {
  const [message, setMessage] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    try {
      const res: any = signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res.error) {
        form.reset();
        push(callbackUrl);
      } else {
        setMessage("Email or Password Is Invalid");
      }
    } catch (error) {
      setMessage("Email or Password Is Invalid");
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.register}>
        <h1 className={styles.register__title}>Login TokoAx Cuy</h1>
        <div className={styles.register__form}>
          {message && (
            <p className={styles.register__form__message}>{message}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className={styles.register__form__item}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className={styles.register__form__item__input}
              />
            </div>
            <div className={styles.register__form__item}>
              <label htmlFor="password">password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className={styles.register__form__item__input}
              />
            </div>
            <button type="submit" className={styles.register__form__button}>
              Login
            </button>
            <hr />
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl, redirect: false })}
              className={[
                styles.register__form__button,
                ,
                styles.register__form__buttonGoogle,
              ].join(" ")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <span>Login With Google</span>
            </button>
          </form>
          <p className={styles.register__link}>
            Dont`t Have Account ? Sign Up{" "}
            <Link href={"/auth/register"}>here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
