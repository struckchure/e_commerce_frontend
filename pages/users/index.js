import moment from "moment";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import BaseLayout from "../../lib/layouts/base_layout";
import UserService from "../../lib/services/user_service";

export default function UsersPage() {
  const { data: users, isLoading } = useQuery(
    "users",
    () => new UserService().list_users(),
    {
      onError: (error) => {
        const message = error.response.data.error;
        toast.error(message);
      },
    }
  );

  return (
    <BaseLayout isLoading={isLoading}>
      <BaseLayout.Navbar />

      <BaseLayout.Container>
        <p className="text-white text-3xl my-2">Users</p>

        <div className="overflow-hidden rounded-md bg-gray-800">
          <table>
            <thead>
              <tr>
                <th className="w-5">#</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Username</th>
                <th>E-Mail</th>
                <th>Staff</th>
                <th>Date Joined</th>
                <th>Last Updated</th>
                <th>Last Login</th>
                <th className="w-10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.data?.map((user, index) => (
                <tr key={index}>
                  <td className="w-5">{index + 1}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.is_staff ? "Yes" : "No"}</td>
                  <td>{moment(user.created_at).format("lll")}</td>
                  <td>{moment(user.updated_at).format("lll")}</td>
                  <td>{moment(user.last_login).format("lll")}</td>
                  <th className="w-10 p-2">
                    <Link href={`/users/${user.id}`}>
                      <button className="text-sm">Manage</button>
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BaseLayout.Container>
    </BaseLayout>
  );
}
