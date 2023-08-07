import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../firebase";
import { getAuth } from "firebase/auth";

const AppRouter = () => {
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  return user ? (
    <Routes>
      {privateRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} exact={true} />
      ))}
      <Route path="*" element={<Navigate to="/plan-your-trips/forecast" />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} exact={true} />
      ))}
      <Route path="*" element={<Navigate to="/plan-your-trips/login" />} />
    </Routes>
  );
};

export default AppRouter;
