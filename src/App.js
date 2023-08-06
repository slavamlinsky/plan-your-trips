import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRouter";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";

import { app } from "./firebase";
import { getAuth } from "firebase/auth";
import Loader from "./components/Loader";

const App = () => {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  if (error) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>An Error During Authentification</h1>
      </div>
    );
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
