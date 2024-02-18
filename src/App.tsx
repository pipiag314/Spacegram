import RootLayout from "./_root/RootLayout";
import AuthLayout from "./_auth/AuthLayout";
import SignIn from "./_auth/forms/SignIn";
import SignUp from "./_auth/forms/SignUp";
import { Home } from "./_root/pages";

import { Toaster } from "./components/ui/toaster";

import { Routes, Route} from "react-router-dom";

import "./global.css";


const App = () => {
  return (
    <main className="h-screen flex">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  )
};
export default App;
