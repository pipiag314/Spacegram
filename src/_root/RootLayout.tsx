import BottomBar from "@/components/shared/BottomBar";
import SideBar from "@/components/shared/SideBar";
import TopBar from "@/components/shared/TopBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  
  return (
    <div className="w-full md:flex">
      <TopBar />
      <SideBar />

      <section className="h-full">
        <Outlet />
      </section>

      <BottomBar />
    </div>
  )
}
export default RootLayout;