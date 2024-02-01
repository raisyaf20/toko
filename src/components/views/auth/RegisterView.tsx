/* eslint-disable react-hooks/rules-of-hooks */
import authServices from "@/services/auth";
import styles from "@/styles/auth/Auth.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const RegisterView = () => {
  const [message, setMessage] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };
    const result = await authServices.registerAccount(data);
    if (result.status === 200) {
      form.reset();
      push("/auth/login");
    } else {
      setMessage("Email is registered");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.register}>
        <h1 className={styles.register__title}>Register Form</h1>
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
              <label htmlFor="fullname">Fullname</label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                className={styles.register__form__item__input}
              />
            </div>
            <div className={styles.register__form__item}>
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                id="phone"
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
            Have Account ? Sign in <Link href={"/auth/login"}>here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
