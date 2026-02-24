"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import useUsers from "@/hooks/useUsers";
import useAllUsers from "@/hooks/useAllUsers";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: users } = useAllUsers();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userToMySite = users?.find((u) => u?.email === email);

    // ❌ যদি user না পাওয়া যায়
    if (!userToMySite) {
      toast.error("User not found");
      return;
    }

    // ✅ সব ঠিক থাকলে login
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res.error) {
      router.push("/");
    } else {
      toast.error("Invalid password");
    }
  };

  return (
    <div className="container-custom flex items-center gap-14 py-10 ">
      <div className="w-[60%]">
        <Image
          height={100}
          width={500}
          src="https://supplylinkbd.com/img/Sunam_Shop/side_image.png"
          alt=""
          className="w-full h-[700px]"
        />
      </div>
      <div className="w-[40%]">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <h2 className="font-semibold text-3xl">Create an account</h2>
            <p className="">Enter your details below</p>
          </div>

          {/* Email */}
          <div>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition"
            />
          </div>

          {/* Create Button */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md transition font-medium"
          >
            Login
          </button>

          {/* Google Button */}

          <div className="flex items-center text-sm justify-between">
            <p className="text-sm text-center text-gray-500">
              New account?{" "}
              <Link
                href="/register"
                className="text-black font-medium underline"
              >
                Register
              </Link>
            </p>
            <p className="text-red-500 underline cursor-pointer">
              Forgot Password
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
