import { Route, Routes } from "react-router-dom";

import AuthLayout from "./pages/_auth/AuthLayout";
import RootLayout from "./pages/_root/RootLayout";
import { SigninForm } from "./pages/_auth/forms/SigninForm";
import { SignupForm } from "./pages/_auth/forms/SignupForm";
import { Dashboard, Tests } from "./pages/_root";
import { Toaster } from "./components/ui/toaster";

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
          <Route index element={<Dashboard />} />
          <Route path="/test" element={<Tests count={0} />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
}

export default App;
