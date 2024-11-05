import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { logout } from "../store/actions/user.actions.js";
import { UserMsg } from "../cmps/UserMsg.jsx";
import { UserEdit } from "../cmps/UserEdit.jsx";
import { saveUser } from "../store/actions/user.actions.js";

export function UserProfile() {
  const navigate = useNavigate();
  const user = useSelector((storeState) => storeState.userModule.loggedInUser);
  const [isEditing, setIsEditing] = useState(false);

  function onLogout() {
    logout()
      .then(() => {
        showSuccessMsg("logout successfully");
        navigate("/");
      })
      .catch((err) => {
        showErrorMsg("OOPs try again");
      });
  }

  function onSaveUser(updatedUser) {
    saveUser(updatedUser)
      .then(() => {
        showSuccessMsg("User updated!");
        setIsEditing(false);
      })
      .catch((err) => {
        console.log("Had issues in user update", err);
        showErrorMsg("Had issues in user update");
      });
  }

  function onEdit() {
    setIsEditing(true);
  }

  function onCancel(ev) {
    ev.preventDefault();
    setIsEditing(false);
  }

  return (
    <section className="user-profile">
      {user && (
        <div>
          {isEditing ? (
            <>
              <UserEdit user={user} onSaveUser={onSaveUser} onCancel={onCancel} />
            </>
          ) : (
            <section className="user-profile-info">
              <div className="user-profile-names-info">
                <h3 className="user-profile-fullname">Full Name:</h3>
                <span>{user.fullname}</span>
              </div>
              <div className="user-profile-names-info">
                <h3 className="user-profile-username">User Name:</h3>
                <span>{user.username}</span>
              </div>
              {user.isAdmin ? (
                <div className="user-profile-names-info">
                <h3 className="user-profile-username">Info:</h3>
                <span>You are admin in this store</span>
                </div>
              ) : (
                <div className="user-profile-names-info">
                <h3 className="user-profile-username">Info:</h3>
                <span>You are customer in this store</span>
                </div>
              )}
              <div className="user-profile-btns">
                <button className="user-profile-logout" onClick={onLogout}>
                  Logout
                </button>
                <button className="user-profile-edit" onClick={onEdit}>
                  Edit
                </button>
              </div>
            </section>
          )}
        </div>
      )}
      <UserMsg />
    </section>
  );
}
