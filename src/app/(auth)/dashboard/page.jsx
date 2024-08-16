"use client";
import React from "react";
import { signOut } from "next-auth/react";

export default function page() {
  return (
    <div>
      Dashboard
      <button
        onClick={async () => {
          await signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
}
