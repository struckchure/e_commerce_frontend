import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import AuthService from "../services/auth_service";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const registerMutation = useMutation(
    (userCredentials) => {
      return new AuthService().register(userCredentials);
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.data.token);
        router.push("/");
      },
    }
  );

  const registerUser = () => {
    registerMutation.mutate({
      username,
      email,
      password,
    });
  };

  return (
    <main className="bg-gray-900 grid place-items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerUser();
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
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <button>Register</button>
      </form>
    </main>
  );
}
