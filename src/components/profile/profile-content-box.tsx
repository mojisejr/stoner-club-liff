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
        <div className="text-sm">Id ไลน์: </div>
        <div className="rounded-md bg-slate-300 p-2">{lineId}</div>
        <div className="text-sm">ชื่อ: </div>
        <div className="rounded-md bg-slate-300 p-2">{name ?? "N/A"}</div>
        <div className="text-sm">เบอร์โทร: </div>
        <div className="rounded-md bg-slate-300 p-2">{tel ?? "N/A"}</div>
        <div className="text-sm">สถานะ: </div>
        <div className="rounded-md bg-slate-300 p-2">
          {isSale ? "SALE" : "MEMBER"}
        </div>
        <div className="text-sm">รูปแบบสมาชิก:</div>
        <div className="rounded-md bg-slate-300 p-2">
          {isVip ? "VIP" : "NORMAL"}
        </div>
      </div>
    </div>
  );
};

export default ProfileContentBox;
