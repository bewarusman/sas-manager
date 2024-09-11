
import LoginForm from "@/components/login-form";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center m-4">
      <h1 className="text-3xl my-3">SAS Radius</h1>
      <LoginForm />
    </div>
  );
}