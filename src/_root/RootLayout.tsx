import { Outlet } from "react-router-dom";

const RootLayout = () => {
  
  return (
    <>
      <h1>Root Layout</h1>
      <section>
        <Outlet />
      </section>
    </>
  )
}
export default RootLayout;