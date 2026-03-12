"use client";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function LoginModal({ close, switchRegister }) {
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
      close();
    } else {
      toast.error("Invalid credentials");
      close();
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 animate-fadeIn">
      {" "}
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-xl relative p-6 animate-modalPop">
        {" "}
        {/* CLOSE */}
        <button onClick={close} className="absolute top-3 right-3">
          <X />
        </button>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 text-center"
        >
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
            <p className="text-red-500 underline cursor-pointer text-end">
              Forgot Password
            </p>
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
          <div className="text-sm text-center">
            <p className="text-gray-500">
              Don't have an account?
              <span
                onClick={switchRegister}
                className="text-blue-500 font-medium underline"
              >
                {" "}
                Sign up
              </span>
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Or, login with</p>
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
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
