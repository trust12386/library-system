import { FC } from "react";
import useAuth from "./hooks/useAuth";
import AuthContext from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import Todo from "./pages/Todo";
import AdminRoute from "./Components/AdminRoute";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Home from "./pages/Home";

const App: FC = () => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route
                index
                element={
                  <PrivateRoute>
                    {auth.token && <Todo />}
                  </PrivateRoute>
                }
              />
              <Route
                path="admin"
                element={
                  <AdminRoute>
                    <Admin />
                  </AdminRoute>
                }
              />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
