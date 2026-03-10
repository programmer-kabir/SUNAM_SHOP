"use client";
import { useState } from "react";
import LoginModal from "./Login";
import RegisterModal from "./Register";

export default function AuthModal({ close }) {
  const [mode, setMode] = useState("login");

  if (mode === "login") {
    return (
      <LoginModal close={close} switchRegister={() => setMode("register")} />
    );
  }

  return <RegisterModal close={close} switchLogin={() => setMode("login")} />;
}
