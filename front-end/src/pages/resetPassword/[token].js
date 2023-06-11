import AuthenticateForm from "@/components/Forms/AuthenticateForm";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const token = router.query.token;

  return (
    <>
      <AuthenticateForm token={token} />
    </>
  );
}
