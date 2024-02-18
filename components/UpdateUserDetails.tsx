"use client";

import { IUser } from "@/backend/models/user";
import { useUpdateUserDetailsMutation } from "@/globalStore/api/userApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  data: {
    user: IUser;
  };
}

const UpdateUserDetails = ({ data }: Props) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    role: "",
  });

  const { name, email, role } = userDetails;
  const router = useRouter();

  const [updateDetails, { isSuccess, error, isLoading }] = useUpdateUserDetailsMutation();

  useEffect(() => {
    if (error && 'data' in error) {
        //@ts-ignore
        toast.error(error?.data?.message);
    }
    if (isSuccess) {
        router.refresh();
        router.push("/admin/users")
    }
  }, [error, isSuccess])

  useEffect(() => {
    if (data) {
      setUserDetails({
        name: data?.user?.name,
        email: data?.user?.email,
        role: data?.user?.role,
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;

    setUserDetails({
      ...userDetails,
      [target.name]: target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateDetails({body: userDetails, id: data?.user?._id})
  }

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-12">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4">Update User</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role_field" className="form-label">
              Role
            </label>
            <select
              id="role_field"
              className="form-select"
              name="role"
              value={role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="form-btn w-100 mt-4 mb-3 py-2" disabled={isLoading}>
          {isLoading ? <div className="lds-dual-ring"></div> : "UPDATE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserDetails;
