import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext()
  const login = async (username, password) => {
    const check = handleInputError(username, password);
    if (!check) return;
    try {
      setLoading(true);
      const rest = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await rest.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data)
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleInputError(username, password) {
  if (!username || !password) {
    toast.error("全て項目を入力してください。");
    return false;
  }

  if (password.length < 6) {
    toast.error("パスワードの長さが6文字以上");
    return false;
  }
  return true;
}
