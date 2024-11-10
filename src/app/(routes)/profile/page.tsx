import { auth } from "@/auth";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import ProfilePageContent from "@/components/ProfilePageContent";
import ProfileAudio from "@/components/ProfileAudio"; // Import the new client-side component

export default async function ProfilePage() {
  const session = await auth();
  const profile = await prisma.profile.findFirst({
    where: { email: session?.user?.email as string },
  });

  if (!profile) {
    return redirect("/settings");
  }

  // Raw audio URL for the profile page
  const audioUrl =
    "https://raw.githubusercontent.com/Gotcha1001/My-Images-for-sites-Wes/main/angelical-pad-143276.mp3";

  return (
    <>
      {/* Pass the audio URL to ProfileAudio component */}
      <ProfileAudio audioUrl={audioUrl} />
      <ProfilePageContent
        ourFollow={null}
        isOurProfile={true}
        profile={profile}
      />
    </>
  );
}
