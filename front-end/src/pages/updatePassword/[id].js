import { useRouter } from "next/router";
import AuthenticateForm from "@/components/Forms/AuthenticateForm";

export default function UpdatePassword() {
  const router = useRouter();
  const userId = router.query.id;
  return (
    <>
      <AuthenticateForm updateId={userId} />
    </>
  );
}
