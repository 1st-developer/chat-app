import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/UserList.scss"
import { Skeleton } from "@/components/ui/skeleton"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { userListFn } from "@/redux/slices/user.list.slice";

function UserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const listUsersState = useSelector((state: RootState) => state.listSlice);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(userListFn());
  }, []);

  if (listUsersState.loading) return <Skeleton />;
  if (listUsersState.error) return <p className="text-red-600 text-xl">{listUsersState.error}</p>;

  const users = listUsersState.data?.users || [];

  const filterUser = users.filter((u) =>
    u.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="left-page">
      <div className="user-search">
        <input onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search name" />
      </div>
      <div className="container">
        {filterUser.map((u) => (
          <div className="parent" key={u.id}>
            <div onClick={() => navigate(`/chat/${u.id}`)} className="user">
              <div className="together">
                <div className="profile">
                {u.profile ? <img src={u.profile} /> : <h2>{u.full_name[0].toUpperCase()}</h2>}
                </div>
                <div className="details">
                  <h2 className="name">{u.full_name}</h2>
                  <p className="description">{u.email}</p>
                </div>
              </div>
              <div className="time"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
