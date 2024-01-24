"use client"

import { useRegisterMutation } from "@/globalStore/api/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Register = () => {

  const [user, setUser] = useState({
    name: "", email: "", password: ""
  })
  const router = useRouter()

  const [register, { isLoading, isSuccess, error }] = useRegisterMutation()

  useEffect(() => {
    if (error && "data" in error) {
        //@ts-ignore
        toast.error(error?.data?.message);
    }
    if (isSuccess) {
        router.push("/login")
        toast.success("Registered successfully.")
    }
  }, [error, isSuccess])

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    register(user)
  }

  const { name, email, password } = user

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form onSubmit={handleSubmit} className="shadow rounded bg-body">
          <h1 className="mb-3">Register</h1>
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

          <div className="mb-2">
            <label className="form-label" htmlFor="password_field">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={password}
              name="password"
              onChange={onChange}
            />
          </div>

          <button
            id="login_button"
            type="submit"
            className="form-btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? <div className="lds-dual-ring"></div> : "Register"}
          </button>

          <div className="mt-3">
            <Link href="/login" className="float-end">
              Already exist? Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
