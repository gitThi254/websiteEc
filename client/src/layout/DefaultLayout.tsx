import Header from "../components/Header";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useVerify } from "../hooks/auth.hook";
import Loader from "../common/Loader";

const DefaultLayout = () => {
  const { data: user, isPending } = useVerify();
  if (isPending) return <Loader />;
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return (
    <>
      <main>
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Outlet />
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default DefaultLayout;
