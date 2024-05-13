import { useUserContext } from "@/context/AuthContext";
import { Input } from "../ui/input";
import { useState } from "react";

import { ProfileSceleton } from "./Sceletons";

const Topbar = () => {
  const { user, isLoading } = useUserContext();
  const [search, setSearch] = useState<string>("");
  return (
    <div className="flex justify-between items-center absolute top-2 right-2 left-2 px-8 py-2 bg-primary rounded-md">
      <h2>Welcome Back, {user.name}</h2>
      <div className="flex justify-center items-center gap-2">
        <div className="relative flex justify-center items-center">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            className="w-[20px] h-[20px] absolute left-2"
          />
          <Input
            className="bg-primary-dark border-0 pl-8"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {isLoading || !user.email ? (
          <div className="h-14">
            <ProfileSceleton />
          </div>
        ) : (
          <div className="flex gap-2 justify-center items-center">
            <img
              src={"/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-[36px] w-[36px] rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
