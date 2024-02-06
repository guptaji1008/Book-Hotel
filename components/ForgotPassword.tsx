"use client"

import { useForgotPasswordMutation } from "@/globalStore/api/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter()

  const [forgotPassword, { isLoading: loading, error, isSuccess }] =
    useForgotPasswordMutation();

  useEffect(() => {
    if (error && "data" in error) {
        //@ts-ignore
        toast.error(error?.data?.message)
    }
    if (isSuccess) {
        toast.success("Link sent to your email")
    }
  }, [error, isSuccess])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    forgotPassword({ email })
  }

  return (
    <div className="row wrapper wrapper-auth">
      <div className="col-10 col-lg-5">
        <form onSubmit={handleSubmit} className="shadow rounded bg-body">
          <h1 className="mb-3">Forgot Password</h1>
          <div>
            <label className="form-label" htmlFor="email_field">
              
              Enter Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            id="login_button"
            type="submit"
            className="form-btn w-100 py-2"
            disabled={loading}
          >
            {loading ? <div className="lds-dual-ring"></div> : "Send Link"}
          </button>

          <div className="mt-3">
            <Link href="/login" className="float-end">
              
              Remember password? Login Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
