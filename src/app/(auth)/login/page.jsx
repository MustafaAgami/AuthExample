"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username: e.target.username.value,
      password: e.target.password.value,
      redirect: false, // Change to true to redirect to dashboard after sign in
    });
    console.log("signIn success", res);
    if (res && res.ok) {
      router.push("/dashboard");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
