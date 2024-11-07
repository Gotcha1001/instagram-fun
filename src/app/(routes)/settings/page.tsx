import { auth, signOut } from "@/auth";
import SettingsForm from "@/components/SettingsForm";
import { prisma } from "@/db";
import { Button } from "@radix-ui/themes";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return "Not Logged In";
  }
  const profile = await prisma.profile.findFirst({
    where: { email: session.user.email },
  });

  return (
    <div className="max-w-md mx-auto gradient-background6 p-4 rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center zoom">
        Profile Settings
      </h1>
      <p className="text-gray-700 text-xs flex justify-center -mt-4 mb-4">
        {session.user.email}
      </p>
      <SettingsForm profile={profile} />
      <div className="flex justify-center mt-2 pt-4 border-t border-gray-300">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit" variant="outline">
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
}
