import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import BaseLayout from "../../lib/layouts/base_layout";
import PermissionService from "../../lib/services/permission_service";
import UserService from "../../lib/services/user_service";

export default function ManageUserPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: user } = useQuery(
    ["user", id],
    () => new UserService().get_user(id),
    {
      onError: (error) => {
        const message = error.response.data.error;
        toast.error(message);
      },
    }
  );

  const [{ data: currentUserPermissions }, { data: availableUserPermissions }] =
    useQueries([
      {
        queryKey: ["permissions", id],
        queryFn: () => new PermissionService().list_permissions({ me: 1 }),
        onError: (error) => {
          const message = error.response.data.error;
          toast.error(message);
        },
      },
      {
        queryKey: ["permissions"],
        queryFn: () => new PermissionService().list_permissions({ me: 0 }),
        onError: (error) => {
          const message = error.response.data.error;
          toast.error(message);
        },
      },
    ]);

  const restrictedUserPermissions = useMemo(() => {
    return availableUserPermissions?.data?.filter(
      (left) =>
        !currentUserPermissions?.data
          ?.map((right) => right.codename)
          .includes(left.codename)
    );
  }, [availableUserPermissions?.data, currentUserPermissions?.data]);

  const queryClient = useQueryClient();

  const { mutate: mutatePermission } = useMutation(
    ([updateAction, codename]) => {
      return new PermissionService().update_permission(
        updateAction,
        id,
        codename
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: "permissions" });
        toast.success("User permission updated");
      },
    }
  );

  const [firstName, setFirstName] = useState(user?.data?.first_name);
  const [lastName, setLastName] = useState(user?.data?.last_name);
  const [username, setUsername] = useState(user?.data?.username);
  const [email, setEmail] = useState(user?.data?.email);
  const [isStaff, setIsStaff] = useState(user?.data?.is_staff);

  const userData = useMemo(() => {
    return {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      is_staff: isStaff,
    };
  }, [email, firstName, isStaff, lastName, username]);

  const { mutate: mutateUser } = useMutation(
    () => {
      return new UserService().update_user(id, userData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: "user" });
        toast.success("User data updated");
      },
    }
  );

  return (
    <BaseLayout>
      <BaseLayout.Navbar />

      <BaseLayout.Container>
        <p className="text-white text-3xl py-2">Manage User</p>

        <form
          className="flex flex-col gap-y-10"
          onSubmit={(e) => {
            e.preventDefault();
            mutateUser();
          }}
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">E-Mail</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">Staff</label>
              <select
                defaultChecked
                value={isStaff}
                onChange={(e) => setIsStaff(e.target.value)}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>

          <button className="w-fit">Save</button>

          <div className="flex flex-col gap-4">
            <p className="text-white">Current Permissions</p>

            <div className="flex flex-wrap gap-4">
              {currentUserPermissions?.data?.map((permission, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-md flex items-center px-2"
                >
                  <p className="p-4 text-white">{permission.name}</p>
                  <button
                    className="px-3 py-1 w-fit h-fit rounded-full bg-gray-900 font-bold"
                    type="button"
                    onClick={() => {
                      mutatePermission(["remove", permission.codename]);
                    }}
                  >
                    -
                  </button>
                </div>
              ))}
            </div>

            <p className="text-white">Available Permissions</p>

            <div className="flex flex-wrap gap-4">
              {restrictedUserPermissions?.map((permission, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-md flex items-center px-2"
                >
                  <p className="p-4 text-white">{permission.name}</p>
                  <button
                    className="px-3 py-1 w-fit h-fit rounded-full bg-gray-900 font-bold"
                    type="button"
                    onClick={() => {
                      mutatePermission(["add", permission.codename]);
                    }}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>
      </BaseLayout.Container>
    </BaseLayout>
  );
}
