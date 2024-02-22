import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  async function signup({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) {
    const check = handleInputError({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!check) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/sigup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, signup };
};

function handleInputError({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("全て項目を入力してください。");
    return false;
  }
  if (confirmPassword !== password) {
    toast.error("パスワードが不一致");
    return false;
  }
  if (password.length < 6) {
    toast.error("パスワードの長さが6文字以上");
    return false;
  }
  return true;
}

export default useSignup;
