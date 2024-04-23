import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { GridTable } from "../../libs/media_rule_grid";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components";
import useCheckPermission from "../../libs/useCheckPermission";
import User from "../../libs/admin";

const Media_rules = () => {
  const navigate = useNavigate();
  useCheckPermission();

  const [media_rules, setMediaRulesData] = useState([]);

  useEffect(() => {
    getMediaRulesData();
  }, []);

  const getMediaRulesData = async () => {
    const { token } = User.getCookieData();
    const media_rules = await User.getMediaRules(token);
    setMediaRulesData(media_rules);
  };

  return (
    <>
      <Navbar />
      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header category="Page" title="Home" />
        <div className="grid grid-cols-5 gap-4 mt-10">
          <div className="col-span-4">
            <div className="font-poppins font-semibold text-2xl">
              Media Rule
            </div>
          </div>

          <button
            onClick={() => navigate("/setting/media_rule/create")}
            className="bg-[#6425FE]  hover:bg-[#3b1694] text-white text-sm font-poppins w-full lg:w-[300px] lg:h-[45px] rounded-md"
          >
            New Media Rule +
          </button>
        </div>
        <div className="w-auto mt-10 h-[600px] border border-[#DBDBDB] rounded-lg">
          {media_rules.length > 0 ? (
            <GridTable media_rules={media_rules} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Media_rules;
