import { bottomBarLinks } from "@/variables/navLinks";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="bottombar">
      <nav>
        <ul className="flex justify-evenly">
          {bottomBarLinks.map((link) => {
            const isActiveLink = pathname === link.path;
            return (
              <li key={link.imageUrl} className={`sidebar-link group ${isActiveLink && "bg-primary-500"}`}>
                <Link to={link.path}>
                  <img src={link.imageUrl} className={`group-hover:brightness-0 ${isActiveLink && "brightness-0"}`} width={50} alt={link.alt} />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
export default BottomBar;
