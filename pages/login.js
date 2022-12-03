import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import AuthService from "../services/auth_service";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loginMutation = useMutation(
    (userCredentials) => {
      return new AuthService().login(userCredentials);
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.data.token);
        router.push("/");
      },
    }
  );

  const loginUser = () => {
    loginMutation.mutate({
      username,
      password,
    });
  };

  return (
    <main className="bg-gray-900 grid place-items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginUser();
        }}
        className="flex flex-col gap-4"
      >
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button>Login</button>
      </form>
    </main>
  );
}
