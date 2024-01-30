import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginReq, logoutReq, verifyReq } from "../api/auth.api";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginReq,
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem("auth", JSON.stringify(data));
      }
      queryClient.setQueryData(["auth"], data);
      navigate("/");
    },
    onError(error: any) {
      error.message = error?.response?.data;
    },
  });
};
export const useVerify = () => {
  const queryClient = useQueryClient();
  const authDefault = JSON.parse(localStorage.getItem("auth")) ?? null;
  const user = useQuery({
    queryKey: ["auth"],
    queryFn: verifyReq,
    refetchIntervalInBackground: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    initialData: authDefault,
  });
  if (user.error && !user.isLoading) {
    queryClient.setQueryData(["auth"], null);
    localStorage.removeItem("auth");
  }
  if (user.data) {
    localStorage.setItem("auth", JSON.stringify(user.data));
  }

  return user ?? null;
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: logoutReq,
    onSuccess: () => {
      localStorage.removeItem("auth");
      queryclient.removeQueries({ queryKey: ["auth"], exact: true });
      queryclient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/signin");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
