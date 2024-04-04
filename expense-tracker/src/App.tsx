import { Route, Routes } from "react-router-dom";

import AuthLayout from "./pages/_auth/AuthLayout";
import RootLayout from "./pages/_root/RootLayout";
import { SigninForm } from "./pages/_auth/forms/SigninForm";
import { SignupForm } from "./pages/_auth/forms/SignupForm";
import { Home } from "./pages/_root";

import "./index.css";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home count={0} />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
