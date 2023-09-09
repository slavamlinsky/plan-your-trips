import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { LOGIN_ROUTE } from "../../utils/consts";
import { LogoutIcon } from "../../assets/icons/svg/logout-icon";
import { SigninIcon } from "../../assets/icons/svg/signin-icon";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  return (
    <div className={styles.header}>
      {user ? (
        <>
          <div className={styles.profile}>
            <img
              className={styles.profile__avatar}
              src={user.photoURL}
              alt="avatar"
            />
            {/* {user.displayName} */}
          </div>
          <button
            className={styles.profile__button}
            onClick={() => auth.signOut()}
            type="button"
          >
            Logout
            <LogoutIcon />
          </button>
        </>
      ) : (
        <Link className={styles.profile__login} to={LOGIN_ROUTE}>
          <SigninIcon />
          Sign In
        </Link>
      )}
    </div>
  );
};

export default Navbar;
