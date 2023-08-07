import { useEffect, useState } from "react";
import { app, googleAuthProvider } from "../../firebase";

import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleIcon } from "../../ui/icons/google-icon";
import styles from "./Login.module.css";

const Login = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((maybeUser) => {
      if (maybeUser != null) {
        return setUser(maybeUser);
      }

      signInWithPopup(auth, googleAuthProvider)
        .then((credentials) => {
          setUser(credentials.user);
        })
        .catch((e) => console.error(e));
    });
    return unsub;
  }, [auth]);

  const login = async () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((credentials) => {
        setUser(credentials.user);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className={styles.login__bg}>
      <div className={styles.login__box}>
        <h2>Welcome to TripPlanner</h2>
        <br></br>
        {user && <h3>{user.displayName}</h3>}
        <button type="button" onClick={login} className={styles.login__btn}>
          <GoogleIcon />
          Login by Google
        </button>
      </div>
    </div>
  );
};

export default Login;
