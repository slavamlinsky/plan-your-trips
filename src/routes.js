import Forecast from "./components/Forecast";
import Login from "./components/Login";
import { FORECAST_ROUTE, LOGIN_ROUTE } from "./utils/consts";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: <Login />,
  },
];

export const privateRoutes = [
  {
    path: FORECAST_ROUTE,
    Component: <Forecast />,
  },
];
