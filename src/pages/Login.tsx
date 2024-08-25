import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyAccessToken } from "../utils/verifyAccessToken";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "admin123",
    },
  });
  const [login] = useLoginMutation();
  const onsubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in", {});
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap(); // here unwrap used for remove other layer
      const user = verifyAccessToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res?.data.accessToken }));
      navigate(`/${user?.role}/dashboard`);
      toast.success("Logged in", { id: toastId, duration: 2000 });
    } catch (err) {
      toast.error("Something Want wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="id">Password:</label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Log in</Button>
    </form>
  );
};

export default Login;
