import { UserMsg } from "./UserMsg.jsx";
import { LoginSignup } from "./LoginSignup.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { logout } from "../store/actions/user.actions.js";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export function AppHeader() {
  // const dispatch = useDispatch()
  const user = useSelector((storeState) => storeState.userModule.loggedInUser);

  function onLogout() {
    logout()
      .then(() => {
        showSuccessMsg("logout successfully");
      })
      .catch((err) => {
        showErrorMsg("OOPs try again");
      });
  }

  return (
    <header className="app-header">
      <section className="header-container">
        <img src="./src/assets/img/toy-logo.png" alt="toy logo" />
        <section className="header-container-right">
          {user ? (
            <section className="header-container-user">
              <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
              <button onClick={onLogout}>Logout</button>
            </section>
          ) : (
            <section className="header-container-user">
              <LoginSignup />
            </section>
          )}
          <nav className="app-nav">
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/toy">Toys</NavLink>
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/about">About</NavLink>
          </nav>
        </section>
      </section>
      <UserMsg />
    </header>
  );
}
