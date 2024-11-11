"use client";

import { useRouter } from "next/navigation";
import Loader from "../Loader";
import { MdLogout } from "react-icons/md";
import supabase from "../../lib/supabase/supabaseClient";

const MemberProfile = ({ email }) => {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (!email) return <Loader />;

  return (
    <div className="px-4 flex items-center gap-2">
      <span>{email}</span>
      <button onClick={logout}>
        <MdLogout />
      </button>
    </div>
  );
};

export default MemberProfile;
