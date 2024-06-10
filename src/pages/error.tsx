import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";

export default function ProfileErrorPage() {
  return (
    <div className="mt-10 flex h-[30vh] w-full justify-center">
      <div className="flex flex-col items-center gap-6">
        <IoMdCloseCircle size={120} className="text-error" />
        <div className="text-2xl font-bold text-error">เกิดข้อผิดพลาด</div>
        <Link className="btn btn-primary" href="/profile">
          กลับหน้าโปรไฟล์
        </Link>
      </div>
    </div>
  );
}
