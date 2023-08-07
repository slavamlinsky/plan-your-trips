import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { LOGIN_ROUTE } from "../../utils/consts";
import { LogoutIcon } from "../../ui/icons/logout-icon";
import { SigninIcon } from "../../ui/icons/signin-icon";
import styles from "./Navbar.module.css";

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
              style={{ marginRight: 10 }}
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
        <a className={styles.profile__login} href={LOGIN_ROUTE}>
          <SigninIcon />
          Sign In
        </a>
      )}
    </div>
  );
};

export default Navbar;
