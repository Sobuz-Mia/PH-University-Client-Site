import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyAccessToken } from "../utils/verifyAccessToken";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PHForm from "../components/form/PHForm";
import PHInput from "./../components/form/PHInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const defaultValues = {
    id: "A-0001",
    password: "admin123",
  };
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
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onsubmit} defaultValues={defaultValues}>
        <PHInput label="ID" type="text" name="id"></PHInput>
        <PHInput label="Password" type="text" name="password"></PHInput>
        <Button htmlType="submit">Log in</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
