import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ProfileContentBox from "~/components/profile/profile-content-box";
import ProfileImageBox from "~/components/profile/profile-image-box";
import { useLine } from "~/context/lineContext";
import { api } from "~/utils/api";

const ProfilePage = () => {
  const { profile, loggedIn } = useLine();
  const {
    data: member,
    refetch,
    isLoading,
  } = api.user.getById.useQuery({
    lineId: profile?.userId!,
  });
  const { replace } = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      void replace("/");
    }

    if (profile == undefined) {
      refetch();
    }
  }, [loggedIn, profile]);

  return (
    <main className="my-10 flex w-full flex-col items-center justify-center gap-6">
      <ProfileImageBox image={profile?.pictureUrl} />
      {!isLoading ? (
        <ProfileContentBox
          lineId={profile?.userId!}
          name={member != undefined ? member.name : "N/A"}
          tel={member != undefined ? member.tel : "N/A"}
          isSale={member?.isSale ?? false}
          isVip={member?.isVip ?? false}
        />
      ) : (
        <div className="loading loading-spinner"></div>
      )}
    </main>
  );
};

export default ProfilePage;
