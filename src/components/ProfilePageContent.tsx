import { Suspense } from "react";
import ProfilePosts from "./ProfilePosts";
import { Profile, Follower } from "@prisma/client";
import Preloader from "./Preloader";
import ProfilePageInfo from "./ProfilePageInfo";
import ProfileNav from "./ProfileNav";

export default function ProfilePageContent({
  profile,
  isOurProfile = false,
  ourFollow = null,
}: {
  profile: Profile;
  isOurProfile?: boolean;
  ourFollow?: Follower | null;
}) {
  return (
    <main>
      <ProfilePageInfo
        profile={profile}
        isOurProfile={isOurProfile}
        ourFollow={ourFollow}
      />

      <ProfileNav
        username={profile.username || ""}
        isOurProfile={isOurProfile}
      />
      <section className="mt-4 gradient-background2 rounded-lg">
        <Suspense fallback={<Preloader />}>
          <ProfilePosts email={profile.email} isOurProfile={isOurProfile} />
        </Suspense>
      </section>
    </main>
  );
}
