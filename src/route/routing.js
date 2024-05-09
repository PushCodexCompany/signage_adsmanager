import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Dashboard,
  Pdf,
  Brands,
  Merchandise,
  Edit_Merchandises,
  Setting,
  Campaign,
  Ads_Media,
  Booking,
  Inbox,
  Logout,
  User_Management,
  Content_type,
  Media_Rule,
  Create_Media_Rule,
  Tag_management,
  Media_Libraly,
  Activity_Log,
  Media_Log,
  Static_Screen,
  Screen,
  Role_permission,
  User_Page,
  Create_Booking,
  User_Account,
  New_screen,
  Booking_Summary,
  Select_Booking,
} from "../pages";

// import User from "../libs/admin";

const Routing = () => {
  // const user = User.getCookieData();

  const navigate = useNavigate();
  return (
    <>
      <Routes>
        {/* Production */}
        <Route path="/brand" element={<Brands />} />
        <Route path="/user_account" element={<User_Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pdf" element={<Pdf />} />
        <Route path="/merchandise" element={<Merchandise />} />
        <Route path="/edit_merchandise/:id" element={<Edit_Merchandises />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/ads_media" element={<Ads_Media />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/inbox" element={<Inbox />} />
        {/* <Route path="/event" element={<Event />} /> */}
        <Route path="/logout" element={<Logout />} />
        <Route path="/user" element={<User_Page />} />
        <Route path="/screen" element={<Screen />} />
        <Route path="/screen/create/:id" element={<New_screen />} />
        <Route
          path="/setting/user_management/user"
          element={<User_Management />}
        />
        <Route path="/setting/content_type" element={<Content_type />} />
        <Route path="/setting/media_rule" element={<Media_Rule />} />
        <Route
          path="/setting/media_rule/create"
          element={<Create_Media_Rule />}
        />
        <Route path="/setting/Tag_management" element={<Tag_management />} />
        <Route path="/ad_media/media_libraly" element={<Media_Libraly />} />
        <Route path="/statics/activities_log" element={<Activity_Log />} />
        <Route path="/statics/media_log" element={<Media_Log />} />
        <Route path="/statics/screen" element={<Static_Screen />} />
        <Route
          path="/setting/user_management/role_permission"
          element={<Role_permission />}
        />
        <Route path="/booking/:name" element={<Create_Booking />} />
        <Route path="/booking/select/:name" element={<Select_Booking />} />
        <Route
          path="/booking/booking_pricing_summary"
          element={<Booking_Summary />}
        />

        <Route
          path="*"
          element={<RedirectToAdsManager navigate={navigate} />}
        />
      </Routes>
    </>
  );
};

const RedirectToAdsManager = ({ navigate }) => {
  React.useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default Routing;
