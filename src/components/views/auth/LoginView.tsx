/* eslint-disable react-hooks/rules-of-hooks */
import styles from "@/styles/auth/Register.module.scss";
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
        <h1 className={styles.register__title}>Login</h1>
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
                className={styles.register__form__item__input}
              />
            </div>
            <div className={styles.register__form__item}>
              <label htmlFor="password">password</label>
              <input
                type="password"
                name="password"
                id="password"
                className={styles.register__form__item__input}
              />
            </div>
            <button type="submit" className={styles.register__form__button}>
              Register
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
