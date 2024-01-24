"use client";
import { useAppDispatch, useAppSelector } from "@/globalStore/hooks";
import { setIsAuth, setUser } from "@/globalStore/slices/userSlice";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

const Header = () => {
  const { data } = useSession();
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.user)

  const handleLogOut = () => {
    signOut();
  };

  useEffect(() => {
    if (data) {
      dispatch(setUser(data?.user))
      dispatch(setIsAuth(true))
    }
  }, [data])

  return (
    <nav className="navbar sticky-top py-2">
      <div className="container d-flex align-items-center justify-space-between">
        <div className="p-0">
          <div className="navbar-brand">
            <Link href="/">
              <img
                style={{ cursor: "pointer" }}
                src="/images/bookit_logo.png"
                alt="BookIT"
              />
            </Link>
          </div>
        </div>

        <div className="d-flex align-items-center mt-3 mt-md-0">
          {data !== null ? (
            <>
              {data !== undefined ? (
                <div className="dropdown d-line">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <figure className="avatar avatar-nav">
                      <img
                        src={
                          //@ts-ignore
                          user?.avatar
                          //@ts-ignore
                            ? user?.avatar?.url
                            : "/images/default_avatar.jpg"
                        }
                        alt="John Doe"
                        className="rounded-circle placeholder-glow"
                        height="50"
                        width="50"
                      />
                    </figure>
                    <span className="placeholder-glow ps-1">
                      {user?.name}
                    </span>
                  </button>

                  <div
                    className="dropdown-menu w-100"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <Link href="/admin/dashboard" className="dropdown-item">
                      Dashboard
                    </Link>
                    <Link href="/bookings/me" className="dropdown-item">
                      My Bookings
                    </Link>
                    <Link href="/me/update" className="dropdown-item">
                      Profile
                    </Link>
                    <Link
                      href="/"
                      onClick={handleLogOut}
                      className="dropdown-item text-danger"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              ) : (
                <div
                  className="d-flex align-items-center"
                  style={{ width: "10rem" }}
                >
                  <figure
                    className="placeholder avatar avatar-nav"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                  ></figure>
                  <div
                    className="placeholder-glow ps-2"
                    style={{ width: "6rem" }}
                  >
                    <div className="placeholder col-12"></div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {data === null && (
                <div className="py-2">
                  <Link
                    href={"/login"}
                    className="btn btn-danger px-4 text-white login-header-btn float-right"
                  >
                    Login
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
