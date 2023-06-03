import { useRef, useState } from "react";
import InputTextForm from "./FormsInput/InputTextForm";
import PasswordForm from "./FormsInput/PasswordForm";
import onInputTextChange from "../../onInputChanges/onInputTextChange";
import styles from "../../styles/LoginForm.module.css";
import { Button } from "primereact/button";
import Link from "next/link";
import { Toast } from "primereact/toast";
import axios from "axios";
import successToast from "@/toasts/successToast";
import errorToast from "@/toasts/errorToast";

export default function Login() {
  const toastRef = useRef(null);
  const [userInput, setUserInput] = useState({ email: "", password: "" });

  const verifyUserInput = async (e) => {
    e.preventDefault();

    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/authentication/login`,
        withCredentials: true,
        data: {
          email: userInput.email,
          password: userInput.password,
        },
      });

      successToast(toastRef, res.data.message);
    } catch (err) {
      errorToast(toastRef, err.response.data.message);
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
