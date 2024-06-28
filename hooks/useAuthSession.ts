import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const checkAuthSession = async () => {
      if (!token) return;
      try {
        const response = await fetch("/api/auth/session", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user session");
        }
        const data = await response.json();
        dispatch(setUser(data.user));
      } catch (error) {
        dispatch(clearAuth());
      }
    };

    checkAuthSession();
  }, [token, dispatch]);

  return user;
};

export default useAuthSession;
