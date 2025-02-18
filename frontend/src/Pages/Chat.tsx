import { useParams } from "react-router-dom";
import "../Styles/Chat.scss";
import NotFound from "./NotFound";
import { IoIosSend } from "react-icons/io";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { userListFn } from "@/redux/slices/user.list.slice";

interface UserMessages {
  [key: number]: string[]; // Maps user IDs to their respective messages
}

function Chat() {

  const [messageInput, setMessageInput] = useState("");
  const [userMessages, setUserMessages] = useState<UserMessages>({});
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Handle message sending
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      if (editingIndex !== null) {
        // Update existing message
        setUserMessages((prevMessages) => {
          const updatedMessages = [...(prevMessages[userId] || [])];
          updatedMessages[editingIndex] = messageInput;
          return { ...prevMessages, [userId]: updatedMessages };
        });
        setEditingIndex(null);
      } else {
        // Add new message
        setUserMessages((prevMessages) => ({
          ...prevMessages,
          [userId]: [...(prevMessages[userId] || []), messageInput],
        }));
      }
      setMessageInput("");
    }
  };

  // Handle message editing
  const handleEditMessage = (index: number) => {
    setMessageInput(userMessages[userId][index]);
    setEditingIndex(index);
  };

  // Handle message deletion
  const handleDeleteMessage = (index: number) => {
    setUserMessages((prevMessages) => {
      const updatedMessages = [...(prevMessages[userId] || [])];
      updatedMessages.splice(index, 1);
      return { ...prevMessages, [userId]: updatedMessages };
    });
  };

  const dispatch = useDispatch<AppDispatch>();
  const listUsersState = useSelector((state:RootState) => state.listSlice);

  useEffect(()=> {
    dispatch(userListFn());
  },[]);

  const { ID } = useParams();
  const userId = Number(ID);
  const users = listUsersState.data?.users || []
  const FindUser = users.find((user) => user.id === userId);
  if (!FindUser) return <NotFound />;

  return (
    <div className="chat">
      <header>
        <div className="header">
          <div className="profile">
            {FindUser.full_name[0].toUpperCase()}
          </div>
          <div className="name">
            <h2>{FindUser.full_name}</h2>
            <p>Offline</p>
          </div>
        </div>
      </header>

      <div className="chat-messages">
        {(userMessages[userId] || []).map((msg, index) => (
          <div key={index} className="message-bubble">
            <p>{msg}</p>
            <div className="message-actions">
              <button className="btn-edit" onClick={() => handleEditMessage(index)}><FaRegEdit /></button>
              <button className="btn-delete" onClick={() => handleDeleteMessage(index)}><MdDelete /></button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <div className="footer">
          <div className="frame">
            <div className="send">
              <label onClick={handleSendMessage} >
                <IoIosSend />
              </label>
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
