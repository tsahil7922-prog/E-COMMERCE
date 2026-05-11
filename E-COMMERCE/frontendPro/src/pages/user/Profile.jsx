import React, { useEffect } from "react";
import MyOrdersPage from "./MyOrdersPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  const handleLogOut=()=>{
    dispatch(logout())
    dispatch(clearCart())
    navigate("/login")
  }
  return (
    <div className="min-h-screen flrx flex-col">
      <div className="container flex-grow p-4 md:p-6 mx-auto">
        <div className="md:flex-row flex flex-col md:space-x-6 space-y-6 md:space-y-0">
          {/* left sectin */}
          <div className="w-full md:w-1/3 lg:w-1/4 rounded-lg p-6 shadow-md">
            <h1 className="text-2xl md:3xl font-bold mb-4">{user?.name}</h1>
            <p className="text-gray-600 mb-4 text-lg">{user?.email}</p>
            <button onClick={handleLogOut} className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
              Log Out
            </button>
          </div>
          {/* right section */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
