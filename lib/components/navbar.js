import { getCookie } from "cookies-next";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import AuthService from "../services/auth_service";

export default function Navbar({ leftContent, rightContent }) {
  const { data: user } = useQuery(
    "user",
    () => new AuthService().getProfile(),
    {
      enabled: !!getCookie("token"),
    }
  );

  return (
    <nav className="w-full bg-gray-800 p-4">
      <div className="w-full flex flex-wrap items-center justify-between gap-4 container mx-auto">
        <Link href="/">
          <button>Home</button>
        </Link>

        {leftContent ? leftContent : null}

        <div className="flex gap-2 flex-wrap justify-center md:justify-start items-center">
          {user ? (
            <>
              <Link href="/cart">
                <button>Cart</button>
              </Link>

              <Link href="/orders">
                <button>Orders</button>
              </Link>
            </>
          ) : (
            <>
              <button>
                <Link href="/login">Login</Link>
              </button>

              <button>
                <Link href="/register">Register</Link>
              </button>
            </>
          )}

          {user?.data?.is_staff ? (
            <>
              <Link href="/users">
                <button>Users</button>
              </Link>
              <Link href="/products">
                <button>Products</button>
              </Link>
            </>
          ) : null}

          <button>Logout</button>
        </div>

        {rightContent ? rightContent : null}
      </div>
    </nav>
  );
}
