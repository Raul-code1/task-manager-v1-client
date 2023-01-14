import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'animate.css';

import {
  ErrorPage,
  RegisterPage,
  HomePage,
  TaskPage,
  ProtectedRoute,
  AllBoardsPage,
  UserProfilePage,
  EditBoardPage,
} from "./pages";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          >
            <Route index element={<AllBoardsPage />} />
            <Route path="/board" element={<EditBoardPage />} />
            <Route path="/board/:boardId" element={<TaskPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
          </Route>
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          closeOnClick
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
};

export default App;
