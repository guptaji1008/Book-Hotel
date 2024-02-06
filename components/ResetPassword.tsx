"use client"

import { useResetPasswordMutation } from "@/globalStore/api/authApi"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface Props {
    token: string;
}

const ResetPassword = ({ token }: Props) => {

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  const [resetPassword, { isLoading, error, isSuccess }] = useResetPasswordMutation()

  useEffect(() => {
    if (error && "data" in error) {
        //@ts-ignore
        toast.error(error?.data?.message)
        console.log(error)
    }
    if (isSuccess) {
        toast.success("Password updated successfully")
        router.push("/login")
        
    }
  }, [error, isSuccess])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password && confirmPassword && password === confirmPassword) {
        resetPassword({ body: { password }, token })
    } else {
        toast.error("Please fill the fields correctly.")
    }
  }

  return (
    <div className="row wrapper wrapper-auth">
      <div className="col-10 col-lg-5">
        <form onSubmit={handleSubmit} className="shadow rounded bg-body">
          <h1 className="mb-3">Forgot Password</h1>
          <div className="mb-2">
            <label className="form-label" htmlFor="pass_field">
              
              New Password
            </label>
            <input
              type="password"
              id="pass_field"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label" htmlFor="con_pass_field">
              
              Confirm New Password
            </label>
            <input
              type="text"
              id="con_pass_field"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            id="login_button"
            type="submit"
            className="form-btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? <div className="lds-dual-ring"></div> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
