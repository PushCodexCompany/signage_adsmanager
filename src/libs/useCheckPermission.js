import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import User from "./admin"; // adjust import path as needed

const useCheckPermission = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkPermission = () => {
      const { user } = User.getCookieData();
      const account = User.getAccount();
      const brand = User.getCampaign();

      if (user.role === "Super Admin") {
        if (!account) {
          navigate("/user_account");
        }

        if (!brand) {
          navigate("/brand");
        }
      }

      if (!brand) {
        navigate("/brand");
      }
    };

    checkPermission();
  }, [navigate]);

  return null; // Custom hooks should return something
};

export default useCheckPermission;
