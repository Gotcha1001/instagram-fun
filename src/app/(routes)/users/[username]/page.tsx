import { getSessionEmail } from "@/actions";
import ProfilePageContent from "@/components/ProfilePageContent";
import { prisma } from "@/db";

export default async function UserProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  // Decode the username to handle URL encoding
  const decodedUsername = decodeURIComponent(username);
  const sessionEmail = await getSessionEmail() || '';
  const profile = await prisma.profile.findFirstOrThrow({
    where: { username: decodedUsername },
  });

  const ourFollow = await prisma.follower.findFirst({
    where: {
      followingProfileEmail: sessionEmail,
      followedProfileId: profile.id,
    },
  });

  return <ProfilePageContent
  isOurProfile={profile.email === sessionEmail }
   ourFollow={ourFollow} 
   profile={profile} />;
}
