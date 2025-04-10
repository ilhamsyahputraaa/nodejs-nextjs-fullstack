import LoginForm from "@/components/login-form";
import { loginUser } from "../api/auth";


export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm loginUser={loginUser} />
      </div>
    </div>
  );
}
