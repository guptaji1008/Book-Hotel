"use client"

import { useUpdatePasswordMutation } from "@/globalStore/api/userApi";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react"
import toast from "react-hot-toast";

const UpdatePassword = () => {

  const [passInfo, setPassInfo] = useState({
    oldPassword: "",
    newPassword: ""
  })

  const { oldPassword, newPassword } = passInfo;
  const router = useRouter()

  const [updatePassword, { isLoading, error, isSuccess }] = useUpdatePasswordMutation()

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setPassInfo({ ...passInfo, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (oldPassword && newPassword) {
        updatePassword(passInfo)
    } else {
        toast.error("Please fill the fields")
    }
  }

  useEffect(() => {
    if (error && "data" in error) {
        //@ts-ignore
        toast.error(error?.data?.message)
    }

    if (isSuccess) {
        toast.success("Password updated");
        router.refresh();
    }
  }, [error, isSuccess])

  return (
    <div className="wrapper wrapper-update">
      <div className="col-10 col-lg-12">
        <form onSubmit={handleSubmit} className="shadow rounded bg-body">
          <h2 className="mb-3">Update Password</h2>
          <div className="mb-2">
            <label className="form-label" htmlFor="oldPass_field">
              Old Password
            </label>
            <input
              type="password"
              id="oldPass_field"
              className="form-control"
              value={oldPassword}
              name="oldPassword"
              onChange={onChange}
            />
          </div>

          <div className="mb-2">
            <label className="form-label" htmlFor="newPass_field">
              New Password
            </label>
            <input
              type="password"
              id="newPass_field"
              className="form-control"
              value={newPassword}
              name="newPassword"
              onChange={onChange}
            />
          </div>

          <button
            id="login_button"
            type="submit"
            className="form-btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? <div className="lds-dual-ring"></div> : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword
