import { useParams } from "react-router-dom";
import "../Styles/Chat.scss";
import NotFound from "./NotFound";
import { IoIosSend } from "react-icons/io";
import { FormEvent, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { userListFn } from "@/redux/slices/user.list.slice";
import { createMessageFn } from "@/redux/slices/Message.slice";
import { getAllMessageFn } from "@/redux/slices/getAllMessage.slice";

function Chat() {
  const [messageInput, setMessageInput] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const listUsersState = useSelector((state: RootState) => state.listSlice);
  const messageState = useSelector((state: RootState) => state.createMessageSlice);
  const getAllMessagesState = useSelector((state: RootState) => state.getAllMessageSlice);
  const loginState = useSelector((state: RootState) => state.loginSlice);

  useEffect(() => {
    dispatch(userListFn());
  }, [dispatch]);

  const { ID } = useParams();
  const users = listUsersState.data?.users || [];
  const FindUser = users.find((user) => user.id === +ID!);
  if (!FindUser) return <NotFound />;


  const createMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) {
      alert("Please enter a valid comment");
      return;
    }
  
    dispatch(
      createMessageFn({
        user_Id: loginState.data.user.id,
        content: messageInput, 
        to_user_Id: +ID!,
        token: loginState.data?.token
      }));

      dispatch(getAllMessageFn({
        token: loginState.data?.token
      }));
  
    setMessageInput("");
  };
  

  return (
    <div className="chat">
      <header>
        <div className="header">
          <div className="profile">{FindUser.profile ? <img src={FindUser.profile} /> : FindUser.full_name[0].toUpperCase()}</div>
          <div className="name">
            <h2>{FindUser.full_name}</h2>
            <p>Offline</p>
          </div>
        </div>
      </header>

      <div className="chat-messages">
        {getAllMessagesState.data?.Messages?.map((text) => 
        <div className="message-bubble" key={text.id}>
          <p>{text.content}</p>
        </div>)}
      </div>

      <form onSubmit={createMessage}>
        <div className="footer">
          <div className="frame">
            <div className="send">
              <button type="submit" disabled={messageState.loading}>
                {messageState.loading ? "Loading" : <IoIosSend />}
              </button>
            </div>
            <input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              type="text"
              placeholder="Type a message"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Chat;