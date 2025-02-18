import "../../Styles/Login.scss";
import "../../Styles/loading.css"
import { GiAtom } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useFormik } from "formik";
import * as yup from "yup";
import { loginFn } from "../../redux/slices/auth/login.slice";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const loginState = useSelector((state: RootState) => state.loginSlice);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit(values) {
            const data = {
                email: values.email,
                password: values.password,
            }
            dispatch(loginFn(data))
        },
        validationSchema: yup.object({
            email: yup.string().email("Please enter a valid email").required("Email is required"),
            password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
        }),
    });

    useEffect(() => {
        if(loginState.error) {
            toast.error(loginState.error)
        }
        if(loginState.data.isSuccess) {
            toast.success("Successfully login in");
            localStorage.setItem("userData", JSON.stringify(loginState.data));
            navigate("/");
        }
    }, [loginState.error, loginState.data.isSuccess]);

    return (
        <div className="Login">
            <div className="login-page">
                <div className="wrapper-details">
                <img src="/img/tree.svg" alt="Background" />
                </div>
                <div className="wrapper">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form">
                            <div className="wrapper-logo">
                                <GiAtom />
                            </div>
                            <div className="details">
                                <h2>Login</h2>
                                <p>Enter your credentials to access your account</p>
                            </div>

                            <div className="input-box">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder=" "
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                <label>Email</label>
                                <div className="iconic">
                                    <MdEmail />
                                </div>
                            </div>
                            <p className="error">{formik.touched.email && formik.errors.email}</p>

                            <div className="input-box">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder=" "
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                <label>Password</label>
                                <div className="iconic">
                                    <FaLock />
                                </div>
                            </div>
                            <p className="error">{formik.touched.password && formik.errors.password}</p>

                            <div className="remember-forgot">
                                <label>
                                    <input type="checkbox" /> Remember me
                                </label>
                                <Link to="/reset_password">Forgot password?</Link>
                            </div>

                            <div className="form-button">
                                <button disabled={loginState.loading || !formik.isValid} type="submit" style={{background: loginState.loading ? "#fff": "#000"}}>{loginState.loading ? 
                                    <div className="loader">
                                    <div className="loader-orbits">
                                      <div className="loader-orbits__electron"></div>
                                      <div className="loader-orbits__electron"></div>
                                      <div className="loader-orbits__electron"></div>
                                    </div>
                            </div>: "Login"}</button>
                                <button className="btn-google">
                                    <label>
                                        <FcGoogle />
                                    </label>
                                    Login with Google
                                </button>
                            </div>

                            <div className="form-footer">
                                <p>Don't have an account?</p>
                                <Link to="/auth/register">Register</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
