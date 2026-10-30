import { FaUserCircle } from "react-icons/fa";

export default function AvatarPlaceholder() {
  return (
    <div className="
      w-full h-full
      flex items-center justify-center
      bg-gradient-to-br
      from-slate-100 to-slate-200
      dark:from-slate-800 dark:to-slate-900
    ">
      <FaUserCircle
        size={120}
        className="text-slate-400 dark:text-slate-600"
      />
    </div>
  );
}
