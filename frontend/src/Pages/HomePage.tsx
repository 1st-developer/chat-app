import { Outlet, useNavigate } from "react-router-dom"
import "../Styles/HomePage.scss"
import ItemLeft from "../components/ui/ItemLeft";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import UserList from "./UserList";



function HomePage() {

  const navigate = useNavigate();
  const loginState = useSelector((state: RootState) => state.loginSlice);

  useEffect(() => {
      if(loginState.data.isSuccess) {
          navigate("/");
      }else{
        navigate("/auth/login")
      }
  }, [loginState.data.isSuccess]);

  return (
    <div className="body">
      <ItemLeft />
      <div className="home">
        <UserList />
      <div className="right-page">
        <Outlet />
      </div>
      </div>
    </div>
  )
}

export default HomePage