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
import axios from "axios";


function ItemLeft() {

  const dispatch = useDispatch<AppDispatch>();
  const loginState = useSelector((state: RootState) => state.loginSlice);

  const logoutHandle = () => {
    dispatch(logout());
  }

  const user = loginState.data?.user

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
<div className="profile" style={{border: user?.profile ? "": img ? "": "1px solid #bbb"}}>
  {loading ? <div className="loader">
    <div className="loader-orbits">
      <div className="loader-orbits__electron"></div>
      <div className="loader-orbits__electron"></div>
      <div className="loader-orbits__electron"></div>
    </div>
  </div>: img ? (
  <img src={img} alt="Profile" />
  ) : (
    user?.profile ? <img src={user.profile} />: <h2>{user?.full_name[0]?.toUpperCase()}</h2>
  )}
</div>

</PopoverTrigger>
<PopoverContent>
<div className="frame">

  <div className="together">
  <div className="sec-profile" style={{border: user?.profile ? "": "1px solid #bbb"}}>
  {loading ? <div className="loader">
    <div className="loader-orbits">
      <div className="loader-orbits__electron"></div>
      <div className="loader-orbits__electron"></div>
      <div className="loader-orbits__electron"></div>
    </div>
  </div>: img ? (
  <img src={img} />
  ) : (
    user?.profile ? <img src={user.profile} />: <h2>{user?.full_name[0]?.toUpperCase()}</h2>
  )}
  <button disabled={loading} onClick={() => fileInputRef.current?.click()}><input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={upload} 
        style={{ display: "none" }}
      /><label><FaPlus /></label></button>
        </div>
        <div className="sec">
        <div className="h2-name">
        <h2>{user?.full_name}</h2>
        </div>
        <div className="p-email">
        <p>{user?.email}</p>
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