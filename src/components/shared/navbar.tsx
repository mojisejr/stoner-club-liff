import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLine } from "~/context/lineContext";
import { useRouter } from "next/router";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const Navbar = () => {
  const { loggedIn, login, logout } = useLine();
  const { pathname, back } = useRouter();

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="navbar-start">
        {pathname != "/" ? (
          <div className="pl-2">
            <button onClick={() => back()}>
              <IoArrowBackCircleSharp size={30} />
            </button>
          </div>
        ) : (
          <figure className="w-14 ">
            <Image
              src="/images/logo.png"
              width={1000}
              height={700}
              alt="logo"
            />
          </figure>
        )}
      </div>
      <div className="navbar-center font-bold">$toner Club</div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            Menu
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 bg-secondary p-2 shadow"
          >
            {loggedIn ? (
              <>
                <li>
                  <Link
                    href="/profile"
                    className={`${pathname == "/profile" ? "bg-primary font-bold" : null}`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/menu"
                    className={`${pathname.includes("/menu") ? "bg-primary font-bold" : null}`}
                  >
                    Menu
                  </Link>
                </li>
              </>
            ) : null}
            <>
              {loggedIn ? (
                <li>
                  <button onClick={() => logout()}>Logout</button>
                </li>
              ) : (
                <li>
                  <button onClick={() => login()}>Connect</button>
                </li>
              )}
            </>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
