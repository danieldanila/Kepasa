import { useContext, useRef, useState } from "react";
import InputTextForm from "./FormsInput/InputTextForm";
import PasswordForm from "./FormsInput/PasswordForm";
import onInputTextChange from "../../onInputChanges/onInputTextChange";
import styles from "../../styles/LoginForm.module.css";
import { Button } from "primereact/button";
import Link from "next/link";
import { Toast } from "primereact/toast";
import { catchAxios } from "@/axios";
import { LoggedUserContext } from "@/pages/_app";

export default function Login() {
  const { push } = global.router;
  const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
  const toastRef = useRef(null);
  const [userInput, setUserInput] = useState({ email: "", password: "" });

  const verifyUserInput = async (e) => {
    e.preventDefault();

    const responseOk = await catchAxios(
      "POST",
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/authentication/login`,
      toastRef,
      { email: userInput.email, password: userInput.password }
    );

    if (responseOk) {
      const loggedUserData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/currentUser`
      );

      console.log(loggedUserData);

      setLoggedUser(loggedUserData);

      window.setTimeout(() => {
        push("/");
      }, 1500);
      console.log(loggedUser);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>

      <div className={styles.loginContainer}>
        <h1 className={styles.applicationName}>Kepasa</h1>
        <form className={styles.fieldsContainer}>
          <InputTextForm
            id="email"
            label="Email"
            keyfilter="email"
            customOnChange={onInputTextChange}
            initialValue={userInput.email}
            objectState={userInput}
            setObjectState={setUserInput}
          />

          <PasswordForm
            id="password"
            label="Password"
            customOnChange={onInputTextChange}
            initialValue={userInput.password}
            objectState={userInput}
            setObjectState={setUserInput}
            feedbackValue={false}
          />
          <Button
            label="Verify"
            className={styles.button}
            onClick={verifyUserInput}
          ></Button>
        </form>
        <div className={styles.forgotPassword}>
          <Link href="/">Forgot password?</Link>
        </div>
      </div>
      <Toast ref={toastRef} />
    </div>
  );
}
