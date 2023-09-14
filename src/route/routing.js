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
} from "../pages";

import User from "../libs/admin";

const Routing = () => {
  const user = User.getCookieData();

  return (
    <>
      <Routes>
        {/* Production */}
        <Route exact path="/" element={<Brands />} />
        <Route path="/dashboard" element={<Main_Dashboard />} />
        <Route path="/pdf" element={<Pdf />} />
        <Route path="/brand" element={<Brands />} />
        <Route path="/merchandise" element={<Merchandise />} />
        <Route path="/edit_merchandise/:id" element={<Edit_Merchandises />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/ads-media" element={<Ads_Media />} />

        {/* Components */}
        <Route path="/dashboard_mockup" element={<Dashboard />} />
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
