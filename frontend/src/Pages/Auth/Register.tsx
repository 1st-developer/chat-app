import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Register.scss";
import { MdEmail, MdAddCall } from "react-icons/md";
import { FaLock, FaPlus } from "react-icons/fa6";
import { GiAtom } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logout, registerFn } from "@/redux/slices/auth/register.slice";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import "../../Styles/loading.css"
import { IRegisterBody } from "@/types/register";
import axios from "axios";

function Register() {

    const dispatch = useDispatch<AppDispatch>();
    const registerState = useSelector((state: RootState) => state.registerSlice);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeToTerms: false,
        },
        validationSchema: yup.object({
            fullName: yup.string().min(4, "Full name must have at least 4 characters!").required("Full name is required"),
            phone: yup.string().matches(/^\d{9,14}$/, "Phone number must be between 9 and 14 digits").required("Phone number is required"),
            email: yup.string().email("Please enter a valid email").required("Email is required"),
            password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
            confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm Password is required"),
            agreeToTerms: yup.boolean().oneOf([true], "You must accept the terms & conditions"),
        }),
        onSubmit(values) {
            const data: IRegisterBody = {
                full_name: values.fullName,
                phone_number: values.phone.toString(),
                email: values.email,
                password: values.password,
                cornfirm_password: values.confirmPassword, 
                profile: img
            };            
            dispatch(registerFn(data))
        },
    });
    
    useEffect(() => {
        if(registerState.error) {
            toast.error(registerState.error)
        }
        if(registerState.data.isSuccess) {
            toast.success("Successfully login in");
            localStorage.setItem("userData", JSON.stringify(registerState.data));
            navigate("/auth/login");
        }
    }, [registerState.error, registerState.data.isSuccess]);


    const fileInputRef = useRef<HTMLInputElement>(null);
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);

    const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
          const file = e.target.files;
          if (file && file[0]) {
            setLoading(true);
            const data = new FormData();
            data.append("file", file[0]);
            data.append("upload_preset", "my_cloudinary_store");
            data.append("cloud_name", "dytzmdcdt");
      
            const response = await axios.post("https://api.cloudinary.com/v1_1/dytzmdcdt/image/upload", data,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            
            if (response.data.secure_url) {
              setImg(response.data.secure_url);
              setLoading(false);
            }
          }
        } catch (error) {
          console.error(error);
        }
      };
    


    return (
        <div className="Register">
            <div className="Register-page">
                <div className="wrapper-details">
                    <div className="img" style={{border: img ? "": "1px solid #bbb"}}>
                        {loading ? <div className="loader">
                            <div className="loader-orbits">
                              <div className="loader-orbits__electron"></div>
                              <div className="loader-orbits__electron"></div>
                              <div className="loader-orbits__electron"></div>
                            </div>
                            </div>: img ? <img src={img} />: <h2>{formik.touched.email}</h2>}
                    </div>
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={upload} style={{display: "none"}} />
                    <button disabled={loading} onClick={() => fileInputRef.current?.click()}><FaPlus /></button>
                </div>
                <div className="wrapper">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form">
                            <div className="wrapper-logo">
                                <GiAtom />
                            </div>
                            <div className="details">
                                <h2>Registration</h2>
                                <p>Please enter your details</p>
                            </div>

                            {/* Full Name Input */}
                            <div className="input-box">
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder=" "
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.fullName}
                                />
                                <label>Full name</label>
                                <div className="iconic">
                                    <IoPerson />
                                </div>
                            </div>
                            <p className="error">{formik.touched.fullName && formik.errors.fullName}</p>

                            {/* Phone Number Input */}
                            <div className="input-box">
                                <input
                                    type="number"
                                    name="phone"
                                    placeholder=" "
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                />
                                <label>Phone number</label>
                                <div className="iconic">
                                    <MdAddCall />
                                </div>
                            </div>
                            <p className="error">{formik.touched.phone && formik.errors.phone}</p>

                            {/* Email Input */}
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

                            {/* Password Input */}
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

                            {/* Confirm Password Input */}
                            <div className="input-box">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder=" "
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmPassword}
                                />
                                <label>Confirm Password</label>
                                <div className="iconic">
                                    <FaLock />
                                </div>
                            </div>
                            <p className="error">{formik.touched.confirmPassword && formik.errors.confirmPassword}</p>

                            {/* Terms & Conditions */}
                            <div className="remember-forgot">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        checked={formik.values.agreeToTerms}
                                    />
                                    I agree to the terms & conditions
                                </label>
                                <p className="error">{formik.touched.agreeToTerms && formik.errors.agreeToTerms}</p>
                            </div>

                            {/* Register Button */}
                            <div className="form-button">
                            <button disabled={registerState.loading || !formik.isValid} type="submit" style={{background: registerState.loading ? "#fff": "#000"}}>{registerState.loading ? 
                                    <div className="loader">
                                    <div className="loader-orbits">
                                      <div className="loader-orbits__electron"></div>
                                      <div className="loader-orbits__electron"></div>
                                      <div className="loader-orbits__electron"></div>
                                    </div>
                            </div>: "Register"}</button>
                            </div>

                            {/* Footer */}
                            <div className="form-footer">
                                <p>Already have an account?</p>
                                <Link to="/auth/Login">Login</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;

