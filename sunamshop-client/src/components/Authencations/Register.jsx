"use client";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function RegisterModal({ close, switchLogin }) {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    number: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.email || !form.password || !form.number) {
      toast.error("All fields required");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }
    console.log(form?.email, form.password);
    // 🔥 Auto login
    const login = await signIn("credentials", {
      identifier: form.email,
      password: form.password,
      redirect: false,
    });
if(login.ok){
  toast.success("Register Success")
}
    if (!login.error) {
      close();
    } else {
      close();
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-xl shadow-xl relative p-6 animate-modalPop">
        <button onClick={close} className="absolute top-3 right-3">
          <X />
        </button>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="font-semibold text-3xl">Create an account</h2>
            <p className="">Enter your details below</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Number"
              onChange={(e) => setForm({ ...form, number: e.target.value })}
              className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition"
            />
          </div>

          <button className="w-full bg-red-500 text-white py-3 rounded-md">
            Create Account
          </button>
          <button
            onClick={() =>
              signIn("google", { callbackUrl: "/" })
            }
            type="button"
            className="w-full border border-gray-300 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-gray-50 transition"
          >
            <Image
              width={5}
              height={5}
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>
          <p className="text-center text-sm mt-4">
            Already have an account?
            <span
              onClick={switchLogin}
              className="text-blue-500 underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>,
    document.body,
  );
}
