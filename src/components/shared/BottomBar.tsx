import { bottomBarLinks } from "@/variables/navLinks"
import { Link } from "react-router-dom"

const BottomBar = () => {
  return (
    <div className="bottombar">
      <nav>
        <ul className="flex justify-evenly">
          {bottomBarLinks.map(link => (
            <li key={link.imageUrl}>
              <Link to={link.path}>
                <img src={link.imageUrl} width={50} alt={link.alt} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
export default BottomBar