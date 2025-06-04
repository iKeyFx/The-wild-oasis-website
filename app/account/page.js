import { auth } from "../_lib/auth";

export const metadata = {
  title: "Login",
};

export default async function Page() {
  const session = await auth();

  const firstName = session?.user?.name?.split(" ").at(0) || "Guest";
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {firstName}
    </h2>
  );
}
