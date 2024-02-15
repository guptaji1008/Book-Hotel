"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTachometerAlt, FaHotel, FaReceipt, FaUser, FaStar } from "react-icons/fa";

const AdminSidebar = () => {

  const [select, setSelect] = useState(0)
  const pathname = usePathname()

  const menuItem: { name: string, url: string, iconNo: number }[] = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      iconNo: 1,
    },
    {
      name: "Rooms",
      url: "/admin/rooms",
      iconNo: 2,
    },
    {
      name: "Bookings",
      url: "/admin/bookings",
      iconNo: 3,
    },
    {
      name: "Users",
      url: "/admin/users",
      iconNo: 4,
    },
    {
      name: "Reviews",
      url: "/admin/reviews",
      iconNo: 5,
    },
  ];

  useEffect(() => {
    if (pathname) {
      const [item] = menuItem.filter((i) => pathname.startsWith(i.url))
      setSelect(item?.iconNo)
    }
  }, [pathname])

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
            {item.iconNo === 1 && <FaTachometerAlt />}
            {item.iconNo === 2 && <FaHotel />}
            {item.iconNo === 3 && <FaReceipt />}
            {item.iconNo === 4 && <FaUser />}
            {item.iconNo === 5 && <FaStar />}
            <span className="ms-2">{item.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminSidebar;
