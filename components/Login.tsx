"use client"

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Login = () => {

  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const result = await signIn("credentials", {
        redirect: false,
        email, password,
    })
    setLoading(false)

    if (result?.error) {
        toast.error(result.error);
    } else {
        router.replace("/")
    }
  }

  return (
    <div className="row wrapper wrapper-auth">
      <div className="col-10 col-lg-5">
        <form onSubmit={handleSubmit} className="shadow rounded bg-body">
          <h1 className="mb-3">Login</h1>
          <div className="mb-2">
            <label className="form-label" htmlFor="email_field"> Email </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="form-label" htmlFor="password_field"> Password </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <Link href="/password/forgot" className="float-end">
            Forgot Password?
          </Link>

          <button
            id="login_button"
            type="submit"
            className="form-btn w-100 py-2"
            disabled={loading}
          >
            {loading ? <div className='lds-dual-ring'></div> : "Login"}
          </button>

          <div className="mt-3">
            <Link href="/register" className="float-end"> New User? Register Here </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
