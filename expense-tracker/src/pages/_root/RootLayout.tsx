import LeftSidebar from "@/components/shared/LeftSideBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <LeftSidebar />

      <section className="flex flex-1 h-full pl-4 relative">
        <Outlet />
      </section>

      {/* <Bottombar /> */}
    </div>
  );
};

export default RootLayout;
