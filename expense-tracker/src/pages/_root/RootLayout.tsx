import LeftSidebar from "@/components/shared/LeftSideBar";
import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <LeftSidebar />
      <Topbar />

      <section className="flex flex-1 h-full pl-4">
        <Outlet />
      </section>

      {/* <Bottombar /> */}
    </div>
  );
};

export default RootLayout;
