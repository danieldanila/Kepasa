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

export default function AuthenticateForm({ token, updateId }) {
  const navigationRouter = useRouter();
  const toastRef = useRef(null);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    currentPassword: "",
  });
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

  const resetPassword = async (e, token) => {
    e.preventDefault();

    const responseOk = await catchAxios(
      "PATCH",
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/authentication/resetPassword/${token}`,
      toastRef,
      { password: userInput.password }
    );

    if (responseOk) {
      window.setTimeout(() => {
        navigationRouter.push("/login");
      }, 1500);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    const responseOk = await catchAxios(
      "PATCH",
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/authentication/updateMyPassword`,
      toastRef,
      {
        currentPassword: userInput.currentPassword,
        password: userInput.password,
      }
    );

    if (responseOk) {
      window.setTimeout(() => {
        navigationRouter.push("/");
      }, 1500);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.loginContainer}>
        <h1 className={styles.applicationName}>Kepasa</h1>
        <form className={styles.fieldsContainer}>
          {!token ? (
            <>
              {updateId ? (
                <>
                  <PasswordForm
                    id="currentPassword"
                    label="Current Password"
                    customOnChange={onInputTextChange}
                    initialValue={userInput.currentPassword}
                    objectState={userInput}
                    setObjectState={setUserInput}
                    feedbackValue={false}
                  />
                  <PasswordForm
                    id="password"
                    label="New Password"
                    customOnChange={onInputTextChange}
                    initialValue={userInput.password}
                    objectState={userInput}
                    setObjectState={setUserInput}
                    feedbackValue={false}
                  />
                  <Button
                    label="Update Password"
                    className={styles.button}
                    onClick={updatePassword}
                  ></Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </>
          ) : (
            <>
              <PasswordForm
                id="password"
                label="New Password"
                customOnChange={onInputTextChange}
                initialValue={userInput.password}
                objectState={userInput}
                setObjectState={setUserInput}
                feedbackValue={false}
              />
              <Button
                label="Reset Password"
                className={styles.button}
                onClick={(e) => resetPassword(e, token)}
              ></Button>
            </>
          )}
        </form>
        {!updateId && (
          <div className={styles.forgotPassword}>
            <Link href="/" onClick={handleForgotPassword}>
              {forgotPassword || token ? "Back to login" : " Forgot password?"}
            </Link>
          </div>
        )}
      </div>

      <Toast ref={toastRef} />
    </div>
  );
}
