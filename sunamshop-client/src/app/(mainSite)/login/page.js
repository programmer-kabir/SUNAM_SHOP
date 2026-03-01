"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      identifier: data.identifier,
      password: data.password,
      redirect: false,
    });

    if (!res?.error) {
      toast.success("Login successful");
      router.push("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="container-custom lg:flex lg:items-center lg:gap-14 py-10 overflow-hidden">
      <div className="w-[60%] hidden lg:inline">
        <Image
          height={100}
          width={500}
          src="https://supplylinkbd.com/img/Sunam_Shop/side_image.png"
          alt="login"
          className="w-full h-[700px]"
        />
      </div>

      <div className="lg:w-[40%]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="font-semibold text-3xl">Login</h2>
            <p>Enter your email or phone and password</p>
          </div>

          {/* Email or Phone */}
          <div>
            <input
              type="text"
              placeholder="Email or Phone"
              {...register("identifier", {
                required: "Email or phone is required",
              })}
              className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition"
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">
                {errors.identifier.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md transition font-medium disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {/* Links */}
          <div className="flex items-center text-sm justify-between">
            <p className="text-gray-500">
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
