"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser, FaUserCircle, FaLock } from "react-icons/fa";

const UserSidebar = () => {

  const [select, setSelect] = useState(0)
  const pathname = usePathname()

  const menuItem = [
    {
      name: "Update Profile",
      url: "/me/update",
      iconNo: 1,
    },
    {
      name: "Update Avatar",
      url: "/me/upload_avatar",
      iconNo: 2,
    },
    {
      name: "Update Password",
      url: "/me/update_password",
      iconNo: 3,
    },
  ];

  useEffect(() => {
    if (pathname) {
      //@ts-ignore
      const { iconNo } = menuItem.find((i) => i.url === pathname)
      setSelect(iconNo)
    }
  }, [menuItem, pathname])

  return (
    <div className="list-group mt-lg-5 pl-4 gap-2">
      {menuItem.map((item) => (
        <Link
        key={item.iconNo}
          href={item.url}
          onClick={() => setSelect(item.iconNo)}
          className={`${select === item.iconNo ? "list-group-item-active " : "list-group-item "} fw-bold`}
          aria-current={select === item.iconNo ? "true" : "false"}
        >
          <div className="d-flex align-items-center">
            {item.iconNo === 1 && <FaUser />}
            {item.iconNo === 2 && <FaUserCircle />}
            {item.iconNo === 3 && <FaLock />}
            <span className="ms-2">{item.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserSidebar;
