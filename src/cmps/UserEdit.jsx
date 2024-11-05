import { useEffect, useState } from "react";
import { UserMsg } from "./UserMsg.jsx";

export function UserEdit({ user, onSaveUser, onCancel }) {
  const [userToUpdate, setUserToUpdate] = useState(user || {});

  useEffect(() => {
    setUserToUpdate(user)
}, [user])

  function handleChange({ target }) {
    let { value, name: field } = target;
    setUserToUpdate((prevUser) => ({ ...prevUser, [field]: value }));
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    onSaveUser(userToUpdate)
  }

  return (
    <section className="user-edit">
        <form onSubmit={onSaveUser}>
            <input type="text" name="fullname" id="fullname" value={userToUpdate.fullname} onChange={handleChange}/>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onCancel}>Cancel</button>
        </form>
      <UserMsg />
    </section>
  );
}
