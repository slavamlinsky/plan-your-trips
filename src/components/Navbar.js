import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";
import { LOGIN_ROUTE } from "../utils/consts";
import { LogoutIcon } from "../ui/icons/logout-icon";
import { SigninIcon } from "../ui/icons/signin-icon";

const Navbar = () => {
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  return (
    <div className="header">
      {user ? (
        <>
          <div className="profile">
            <img
              className="profile__avatar"
              src={user.photoURL}
              style={{ marginRight: 10 }}
              alt="avatar"
            />
            {/* {user.displayName} */}
          </div>
          <button
            className="profile__button"
            onClick={() => auth.signOut()}
            type="button"
          >
            Logout
            <LogoutIcon />
          </button>
        </>
      ) : (
        <a className="profile__login" href={LOGIN_ROUTE}>
          <SigninIcon />
          Sign In
        </a>
      )}
    </div>
  );
};

export default Navbar;
