import { HiArrowLeft } from "react-icons/hi";
import { OnboardingPage } from "./components/OnboardingPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/auth/login");
  }

  return (
    <div className="overflow-y-hidden relative h-full flex flex-col gap-4 min-h-screen bg-white p-6 py-10">
      <div className="flex flex-col items-start justify-start gap-4">
        <button className="text-gray-800 text-xl font-semibold text-left w-full">
          <HiArrowLeft className="inline mr-2" />
        </button>
        <h1 className="text-gray-800 text-xl font-semibold text-start">
          Welcome, John!
        </h1>
        <p className="text-[#878787] font-light">
          Let us know about your specific food hypersensitivity needs
        </p>
      </div>
      <OnboardingPage email={session.user.email} />
    </div>
  );
}
