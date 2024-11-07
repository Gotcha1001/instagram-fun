import { auth, signIn } from "@/auth";
import Preloader from "@/components/Preloader";
import UserHome from "@/components/UserHome";
import { Suspense } from "react";


export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col gradient-background7 p-3 rounded-xl  ">
      {session && (
        <Suspense
          fallback={
            <Preloader />
          }
        >
          <UserHome session={session} />
        </Suspense>
      )}
      {!session && (
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button
            className="border px-4 py-2 bg-ig-red text-white rounded-lg"
            type="submit"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
}
