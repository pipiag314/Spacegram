import { useUserContext } from "@/context/UserContext";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutFromAccount } from "@/lib/query/mutations";
import { useEffect } from "react";
import { sideBarLinks } from "@/variables/navLinks";

const SideBar = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const { user } = useUserContext();

  const { mutate: signOut, isSuccess } = useSignOutFromAccount();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <div className="sidebar h-full">
      <Link to="/" className="">
        <div className="flex justify-start font-bold text-xl gap-1">
          <img
            width={28}
            height={28}
            className="object-contain"
            src="/assets/icons/favicon.ico"
          />
          Spacegram
        </div>
      </Link>
      <div className="mt-10 flex gap-3">
        <img
          src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="profile photo"
          width={50}
          className="rounded-full"
        />
        <div>
          <h2 className="text-lg font-bold">{user.name}</h2>
          <p className="text-light-4">@{user.username}</p>
        </div>
      </div>
      <ul className="flex flex-col gap-5 mt-10 h-3/4">
        {sideBarLinks.map((link) => {
          const isActiveLink = pathname === link.path;
          return (
          <li key={link.label}>
            <NavLink to={link.path} className={`sidebar-link group ${isActiveLink ? "bg-primary-500" : ""}`}>
              <img
                src={link.imageUrl}
                alt={link.alt}
                className={`group-hover:invert-white ${isActiveLink && "grayscale"}`}
              />{" "}
              {link.label}
            </NavLink>
          </li>
        )})}
      </ul>

      <div className="">
        <Button className="flex items-center gap-2" onClick={() => signOut()}>
          <img src="/assets/icons/logout.svg" />
          Logout
        </Button>
      </div>
    </div>
  );
};
export default SideBar;
