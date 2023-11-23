import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
  Media_Log,
  Screen,
  Role_permission,
  User_Page,
  Create_Booking,
  User_Account,
} from "../pages";

import User from "../libs/admin";

const Routing = () => {
  const user = User.getCookieData();

  return (
    <>
      <Routes>
        {/* Production */}
        <Route path="/brand" element={<Brands />} />
        <Route path="/user_account" element={<User_Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pdf" element={<Pdf />} />
        {/* <Route path="/brand" element={<Brands />} /> */}
        <Route path="/merchandise" element={<Merchandise />} />
        <Route path="/edit_merchandise/:id" element={<Edit_Merchandises />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/ads_media" element={<Ads_Media />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/event" element={<Event />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/user" element={<User_Page />} />
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
        <Route path="/statics/media_log" element={<Media_Log />} />
        <Route path="/statics/screen" element={<Screen />} />
        <Route path="/setting/role_permission" element={<Role_permission />} />
        <Route path="/booking/create_booking" element={<Create_Booking />} />
        {/* <Route
          path="*"
          element={<div> Not Found or You do not have permission.</div>}
        /> */}
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
    </>
  );
};

export default Routing;
