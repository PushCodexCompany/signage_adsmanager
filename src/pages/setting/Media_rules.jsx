import React, { useEffect, useState } from "react";
import { Header, Navbar } from "../../components";
import { GridTable } from "../../libs/media_rule_grid";
import { useNavigate } from "react-router-dom";
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
        <Header lv1={"Setting"} lv2={"media_rule"} />
        <div className="grid grid-cols-10 mt-10">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl">
              Media Rule
            </div>
          </div>
          <div className="col-span-4 flex justify-end">
            <button
              onClick={() =>
                navigate("/setting/media_rule/create", {
                  state: { isView: false },
                })
              }
              className="bg-[#6425FE]  hover:bg-[#3b1694] text-white text-sm font-poppins w-full lg:w-[300px] lg:h-[45px] rounded-md shadow-sm"
            >
              New Media Rule +
            </button>
          </div>
        </div>
        <div className="mt-5">
          {media_rules.length > 0 ? (
            <GridTable
              media_rules={media_rules}
              getMediaRulesData={getMediaRulesData}
            />
          ) : (
            <div className="flex items-center justify-center h-[550px] text-center ">
              <div className="font-poppins text-5xl text-[#dedede]">
                --- No Media rule(s) ---
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Media_rules;
