import { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import Loader from "./common/Loader";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import routes from "./routes";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import BasicRoute from "./routes/BasicRoutes";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<BasicRoute />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route element={<DefaultLayout />}>
          <Route index element={<Home />} />

          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
