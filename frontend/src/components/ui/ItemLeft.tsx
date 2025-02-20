import { IoSettingsOutline } from "react-icons/io5";
import { CgMenu } from "react-icons/cg";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/auth/login.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { FaPlus } from "react-icons/fa6";
import "../../Styles/ItemLeft.scss"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRef, useState } from "react";


function ItemLeft() {

  const dispatch = useDispatch<AppDispatch>();
  const loginState = useSelector((state: RootState) => state.loginSlice);

  const logoutHandle = () => {
    dispatch(logout());
  }
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [img, setImg] = useState("");

  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImage = URL.createObjectURL(e.target.files[0]);
      setImg(newImage); 
    }
  };  

  return (
    <div className="item-left">
    <div className="top">
    <div className="logo">
      <img src="https://w7.pngwing.com/pngs/417/941/png-transparent-british-somaliland-italian-somaliland-state-of-somaliland-national-emblem-of-somaliland-turkey-flag-miscellaneous-food-national-emblem-thumbnail.png" />
    </div>
    <div className="menu">
    <CgMenu />
    </div>
    <div className="message">
    <IoChatboxEllipsesOutline />
    </div>
    <div className="calls">
    <IoCallOutline />
    </div>
    <div className="status">
    <HiOutlineStatusOnline />
    </div>
    </div>
      <div className="my-account">
        <button className="setting"><IoSettingsOutline />
        </button>
        <Popover>
<PopoverTrigger>
<div className="profile" style={{border: img ? "": "1px solid #bbb"}}>
  {img ? (
    <img src={img} alt="Profile" />
  ) : (
    loginState.data?.user?.profile ? <img src={loginState.data?.user?.profile} />: <h2>{loginState.data?.user?.full_name[0].toUpperCase()}</h2>
  )}
</div>

</PopoverTrigger>
<PopoverContent>
<div className="frame">

  <div className="together">
  <div className="sec-profile" style={{border: img ? "": "1px solid #bbb"}}>
  {img ? (
    <img src={img} alt="Profile" />
  ) : (
    loginState.data?.user?.profile ? <img src={loginState.data?.user?.profile} />: <h2>{loginState.data?.user?.full_name[0].toUpperCase()}</h2>
  )}
  <span onClick={() => fileInputRef.current?.click()}><input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={upload} 
        style={{ display: "none" }}
      /><label><FaPlus /></label></span>
        </div>
        <div className="sec">
        <div className="h2-name">
        <h2>{loginState.data.user?.full_name}</h2>
        </div>
        <div className="p-email">
        <p>{loginState.data.user?.email}</p>
        </div>
        </div>
  </div>
       <div className="logout">
       <button onClick={logoutHandle} className="logout-btn">Logout</button>
       </div>
</div>
</PopoverContent>
</Popover>
      </div>
    </div>
  )
}

export default ItemLeft