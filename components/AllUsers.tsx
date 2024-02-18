"use client"

import { IUser } from "@/backend/models/user";
import { useDeleteUserMutation } from "@/globalStore/api/userApi";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  data: {
    users: IUser[];
  };
}

const AllUsers = ({ data }: Props) => {
  const users = data?.users;
  const [userId, setUserId] = useState("")

  const router = useRouter()

  const [deleteUser, { error, isLoading, isSuccess }] = useDeleteUserMutation()

  useEffect(() => {
    if (error && 'data' in error) {
        //@ts-ignore
        toast.error(error?.data?.message)
    }
    if (isSuccess) {
        router.refresh()
        toast.success("User deleted")
    }
  }, [isSuccess, error])

  const deleteUserHandler = (id: string) => {
    setUserId(id);
    deleteUser(id)
  }

  const setUsers = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
            label: "ID",
            field: "id",
            sort: "asc",
        },
        {
            label: "Name",
            field: "name",
            sort: "asc",
        },
        {
            label: "Email",
            field: "email",
            sort: "asc",
        },
        {
            label: "Role",
            field: "role",
            sort: "asc",
        },
        {
            label: "Actions",
            field: "actions",
            sort: "asc",
        },
      ],
      rows: [],
    };

    users.forEach((user) => (
        data?.rows?.push({
            id: user._id,
            name: user?.name,
            email: user?.email,
            role: user?.role,
            actions: (
                <>
                    <Link href={`/admin/users/${user._id}`} className="btn btn-sm btn-outline btn-primary">
                        <FaEdit />
                    </Link>
                    <button className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => deleteUserHandler(user?._id)}
                    disabled={isLoading && userId === user?._id}
                    >
                        <FaTrash />
                    </button>
                </>
            )
        })
    ))
    return data;
  };

  return <div>
    <h2 className="mb-5">{data?.users?.length} Users</h2>
    <MDBDataTable 
    //@ts-ignore
    data={setUsers()}
    bordered
    striped
    hover
    />
  </div>;
};

export default AllUsers;