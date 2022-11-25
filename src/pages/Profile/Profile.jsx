import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { IoLocationSharp } from "react-icons/io5";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import useAdmin from "../../hooks/useAdmin";
import useSeller from "../../hooks/useSeller";
const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
  return (
    <>
      <div className="flex items-center bg-slate-200 mb-5 h-96 px-10 gap-10">
        <div className="bg-slate-100 w-80 h-80 rounded-lg p-3">
          <img src={user?.photoURL} className="w-full h-full" alt="" />
        </div>
        <div className="flex-1 bg-slate-100 h-80 p-4 rounded-lg">
          <div className="flex bg-white gap-10 p-6 rounded-lg">
            <div>
              <h1 className="text-3xl">{user?.displayName}</h1>
              <br />
              {isAdmin && <h6 className="text-2xl">Role : Admin</h6>}
              {isSeller && <h6 className="text-2xl">Role : Seller</h6>}
              {!isSeller && !isAdmin && (
                <h6 className="text-2xl">Role : Buyer</h6>
              )}
            </div>
            <div className="flex justify-center items-center text-blue-400 text-4xl">
              <IoLocationSharp />
              <p>Location : Bangladesh</p>
            </div>
          </div>
          <div>
            <p className="text-3xl">Ratings</p>
            <div className="flex items-center gap-3 text-xl">
              <p className="font-bold">8.6</p>
              <div className="flex ">
                <AiFillStar className="text-blue-600" />
                <AiFillStar className="text-blue-600" />
                <AiFillStar className="text-blue-600" />
                <AiFillStar className="text-blue-600" />
                <AiOutlineStar className="text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
