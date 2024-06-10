import React from "react";
import Image from "next/image";

interface ProfileImageBoxProps {
  image?: string;
}

const ProfileImageBox = ({ image }: ProfileImageBoxProps) => {
  return (
    <div>
      <div className="avatar rounded-full ring ring-primary">
        <figure className="mask mask-circle w-28">
          <Image
            src={image ?? "/images/logo.png"}
            width={750}
            height={750}
            alt="profile-image"
          />
        </figure>
      </div>
    </div>
  );
};

export default ProfileImageBox;
