import React from "react";

interface ProfileContentBoxProps {
  lineId: string;
  name?: string;
  tel?: string;
  isSale?: boolean;
  isVip?: boolean;
}

const ProfileContentBox = ({
  lineId,
  name,
  tel,
  isSale = false,
  isVip = false,
}: ProfileContentBoxProps) => {
  return (
    <div>
      <div className="my-2 flex w-full flex-col">
        <div className="text-sm">LineId: </div>
        <div className="rounded-md bg-slate-300 p-2">{lineId}</div>
        <div className="text-sm">Name: </div>
        <div className="rounded-md bg-slate-300 p-2">{name ?? "N/A"}</div>
        <div className="text-sm">Tel: </div>
        <div className="rounded-md bg-slate-300 p-2">{tel ?? "N/A"}</div>
        <div className="text-sm">Role: </div>
        <div className="rounded-md bg-slate-300 p-2">
          {isSale ? "SALE" : "MEMBER"}
        </div>
        <div className="text-sm">Member Type:</div>
        <div className="rounded-md bg-slate-300 p-2">
          {isVip ? "VIP" : "NORMAL"}
        </div>
      </div>
    </div>
  );
};

export default ProfileContentBox;
