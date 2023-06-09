import { useRef, useState } from "react";
import InputTextForm from "./FormsInput/InputTextForm";
import PasswordForm from "./FormsInput/PasswordForm";
import onInputTextChange from "../../onInputChanges/onInputTextChange";
import styles from "../../styles/LoginForm.module.css";
import { Button } from "primereact/button";
import Link from "next/link";
import { Toast } from "primereact/toast";
import { catchAxios } from "@/axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const navigationRouter = useRouter();
  const toastRef = useRef(null);
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [forgotPassword, setForgotPassword] = useState(false);

  const verifyUserInput = async (e) => {
    e.preventDefault();

    const responseOk = await catchAxios(
      "POST",
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/authentication/login`,
      toastRef,
      { email: userInput.email, password: userInput.password }
    );

    if (responseOk) {
      window.setTimeout(() => {
        navigationRouter.refresh();
      }, 1500);
    }
  };

  const handleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
  };

  const sendRecoveryEmail = async (e) => {
    e.preventDefault();

    await catchAxios(
      "POST",
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/authentication/forgotPassword`,
      toastRef,
      { email: userInput.email }
    );
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
          {forgotPassword ? (
            <>
              <Button
                label="Send recovery email"
                className={styles.button}
                onClick={sendRecoveryEmail}
              ></Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </form>
        <div className={styles.forgotPassword}>
          <Link href="/" onClick={handleForgotPassword}>
            {forgotPassword ? "Back to login" : " Forgot password?"}
          </Link>
        </div>
      </div>

      <Toast ref={toastRef} />
    </div>
  );
}
