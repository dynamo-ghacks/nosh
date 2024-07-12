import Head from "next/head";
import Image from "next/image";
import { Card } from "flowbite-react";
import ButtonLogin from "./components/ButtonLogin";

export default async function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-end bg-orange-500 overflow-hidden">
      <Head>
        <title>Welcome to Nosh!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="inset-0 z-0">
        <Image
          src="/images/login-avatar.svg"
          alt="Globe background"
          quality={100}
          width={1920}
          height={1080}
        />
      </div>

      <main className="w-full">
        <Card className="relative rounded-3xl shadow-lg top-4">
          <div className="flex flex-col items-center pb-10">
            <Image
              className="mb-5 rounded-full shadow-lg"
              src="/images/logo.png"
              alt="Nosh avatar"
              width={96}
              height={96}
            />
            <h5 className="mb-5 text-xl font-medium text-gray-900 dark:text-white">
              Welcome to Nosh!
            </h5>
            <span className="text-md text-gray-500 dark:text-gray-400 text-center mb-5">
              Connect and share safe dining spots for food hypersensitivities in
              a supportive community.
            </span>
            <div className="mt-4 w-full">
              <ButtonLogin />
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
