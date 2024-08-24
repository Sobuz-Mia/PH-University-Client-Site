import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyAccessToken } from "../utils/verifyAccessToken";

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "admin123",
    },
  });
  const [login, { error }] = useLoginMutation();
  const onsubmit = async (data) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    const res = await login(userInfo).unwrap(); // here unwrap used for remove other layer
    const user = verifyAccessToken(res.data.accessToken);
    dispatch(setUser({ user: user, token: res?.data.accessToken }));
  };

  console.log("This is a error =>", error);
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
      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default Login;
