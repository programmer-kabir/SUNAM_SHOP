"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();

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

    // 🔥 Auto login
    const login = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (!login.error) {
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="container-custom lg:flex items-center lg:gap-14 py-10 ">
      <div className="lg:w-[60%] hidden lg:inline">
        <Image
          height={100}
          width={500}
          src="https://supplylinkbd.com/img/Sunam_Shop/side_image.png"
          alt=""
          className="w-full h-[700px]"
        />
      </div>
      <div className="lg:w-[40%] w-full">
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

          {/* Create Button */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md transition font-medium"
          >
            Create Account
          </button>

          {/* Google Button */}
          <button
            onClick={() =>
              signIn("google", { callbackUrl: "/userDashboard/dashboard" })
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

          {/* Login Link */}
          <p className="text-sm text-center text-gray-500 mt-4">
            Already have account?{" "}
            <Link href="/login" className="text-black font-medium underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
