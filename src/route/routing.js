import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
  Main_Dashboard,
  Pdf,
  Brands,
  Merchandise,
  Edit_Merchandises,
  Setting,
  Campaign,
  Ads_Media,
  Booking,
  Inbox,
  Event,
  Logout,
  Dashboard_mockup,
  User_Setting,
  Content_type,
  Media_Rule,
  Create_Media_Rule,
  Tag_management,
  Media_Libraly,
  Activity_Log,
} from "../pages";

import User from "../libs/admin";

const Routing = () => {
  const user = User.getCookieData();

  return (
    <>
      <Routes>
        {/* Production */}
        <Route exact path="/" element={<Brands />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pdf" element={<Pdf />} />
        <Route path="/brand" element={<Brands />} />
        <Route path="/merchandise" element={<Merchandise />} />
        <Route path="/edit_merchandise/:id" element={<Edit_Merchandises />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/ads_media" element={<Ads_Media />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/event" element={<Event />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/setting/user_management/user"
          element={<User_Setting />}
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
        {/* Components */}
        <Route path="/dashboard_mockup" element={<Dashboard_mockup />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/color-picker" element={<ColorPicker />} />
        <Route path="/line" element={<Line />} />
        <Route path="/area" element={<Area />} />
        <Route path="/bar" element={<Bar />} />
        <Route path="/pie" element={<Pie />} />
        <Route path="/financial" element={<Financial />} />
        <Route path="/color-mapping" element={<ColorMapping />} />
        <Route path="/pyramid" element={<Pyramid />} />
        <Route path="/stacked" element={<Stacked />} />
      </Routes>
      {/* example ซ่อน Menu สำหรับ role */}
      {/* {user.position === "admin" ? (
				<>
					<Route exact path="/user/list" component={UserList} />
					
				</>
			) : (
				""
			)} */}
    </>
  );
};

export default Routing;
