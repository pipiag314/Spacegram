import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutFromAccount } from "@/lib/query/mutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/UserContext";

const TopBar = () => {
  const navigate = useNavigate();

  const { user } = useUserContext();
  
  const { mutate: signOut, isSuccess } = useSignOutFromAccount();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/">
          <div className="flex justify-center font-bold text-xl gap-1">
            <img
              width={28}
              height={28}
              className="object-contain"
              src="/assets/icons/favicon.ico"
            />
            Spacegram
          </div>
        </Link>

        <div className="flex-center">
          <Button
            variant="ghost"
            className="button-ghost"
            onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img src={user.imageUrl || "/assets/images/profile-placeholder.svg"} className="rounded-full" width={30} alt="user profile photo" />
          </Link>
        </div>
      </div>
    </section>
  );
};
export default TopBar;
