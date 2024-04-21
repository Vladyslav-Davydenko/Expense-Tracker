import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/QueriesAndMuntations";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";

import { ProfileSceleton } from "./Sceletons";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticate, isLoading } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticate(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={36}
            height={36}
          />
          <p className=" text-lg font-semibold leading-3 tracking-wider">
            Expense Tracker
          </p>
        </Link>

        {isLoading || !user.email ? (
          <div className="h-14">
            <ProfileSceleton />
          </div>
        ) : (
          <Link
            to={`/profile/${user.id}`}
            className="flex gap-3 items-center p-3"
          >
            <img
              src={"/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-[36px] w-[36px] rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white w-[20px] h-[20px] ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button className="flex justify-end" onClick={(e) => handleSignOut(e)}>
        <img
          src="/assets/icons/logout.svg"
          alt="logout"
          className="w-[20px] h-[20px]"
        />
        <p className="text-md pl-2">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
