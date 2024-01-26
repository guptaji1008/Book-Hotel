"use client"

import { useLazyUpdateSessionQuery, useUpdateProfileMutation } from "@/globalStore/api/userApi";
import { useAppDispatch, useAppSelector } from "@/globalStore/hooks";
import { setUser } from "@/globalStore/slices/userSlice";
import { useRouter } from "next/navigation";
import React, { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateProfile = () => {

  const [userInfo, setUserInfo] = useState({
    name: "", email: ""
  })
  const router = useRouter()

  const { user: currentUser } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  const [ updateProfile, { isLoading, error, isSuccess } ] = useUpdateProfileMutation()
  const [updateSession, { data, isSuccess: isSuccessSession, error: errorSession }] = useLazyUpdateSessionQuery()

  if (data) dispatch(setUser(data?.user))

  useEffect(() => {
    if (currentUser) {
        setUserInfo({...userInfo, name: currentUser.name, email: currentUser.email})
    }

    if (error && "data" in error) {
        //@ts-ignore
        toast.error(error?.data?.message);
    }
    if (errorSession && "data" in errorSession) {
        //@ts-ignore
        toast.error(errorSession?.data?.message);
    }
    if (isSuccess) {
        //@ts-ignore
        updateSession()
        router.refresh()
    }

    if (isSuccessSession) {
        toast.success("Updated successfully")
    }
  }, [currentUser, error, isSuccess, errorSession, isSuccessSession])

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateProfile(userInfo)
  }

  const { name, email } = userInfo

  return (
    <div className="wrapper wrapper-update">
      <div className="col-10 col-lg-12">
        <form onSubmit={handleSubmit} className="shadow rounded bg-body">
          <h2 className="mb-3">Update Profile</h2>
          <div className="mb-2">
            <label className="form-label" htmlFor="name_field">
              Name
            </label>
            <input
              type="name"
              id="name_field"
              className="form-control"
              value={name}
              name="name"
              onChange={onChange}
            />
          </div>

          <div className="mb-2">
            <label className="form-label" htmlFor="email_field">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              name="email"
              onChange={onChange}
            />
          </div>

          <button
            id="login_button"
            type="submit"
            className="form-btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? <div className="lds-dual-ring"></div> : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;

