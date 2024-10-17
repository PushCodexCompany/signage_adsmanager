import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Navbar } from "../../components";
import { GridTable } from "../../libs/media_libraly_grid";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { BsCheckCircle } from "react-icons/bs";
import useCheckPermission from "../../libs/useCheckPermission";
import Filter from "../../components/Filter";
import User from "../../libs/admin";
import Permission from "../../libs/permission";
import Swal from "sweetalert2";

const Media_Libraly = () => {
  useCheckPermission();
  const navigate = useNavigate();
  const { token } = User.getCookieData();
  const [showModal, setShowModal] = useState(false);
  const [media_libraly_data, setMediaLibralyData] = useState([]);
  const [all_pages, setAllPages] = useState(null);
  const [filter_screen, setFilterScreen] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);

  const [uploads, setUploads] = useState({
    upload1: {
      content: null,
      name: null,
      progress: 0, // Add progress property
    },
    upload2: {
      content: null,
      name: null,
      progress: 0, // Add progress property
    },
    upload3: {
      content: null,
      name: null,
      progress: 0, // Add progress property
    },
  });
  const [page_permission, setPagePermission] = useState([]);

  useEffect(() => {
    getMediaLibralyData();
  }, [searchTerm]);

  useEffect(() => {
    getPermission();
  }, []);

  const getMediaLibralyData = async () => {
    if (searchTerm === null) {
      const data = await User.getMedias(token, 1);
      setMediaLibralyData(data.media);
      if (data.pagination.length > 0) {
        setAllPages(data.pagination[0].totalpage);
      }
    } else {
      const data = await User.getMedias(token, 1, searchTerm);
      setMediaLibralyData(data.media);
      if (data.pagination.length > 0) {
        setAllPages(data.pagination[0].totalpage);
      }
    }
  };

  const uploadFile = (uploadKey) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".mp4, .m3u8, .jpg, .png";
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploads((prevUploads) => ({
            ...prevUploads,
            [uploadKey]: {
              content: e.target.result,
              name: file.name,
            },
          }));
        };
        reader.readAsDataURL(file);
      }
    });
    fileInput.click();
  };

  const closeModal = () => {
    setShowModal(!showModal);
    setUploads({
      upload1: {
        content: null,
        name: null,
      },
      upload2: {
        content: null,
        name: null,
      },
      upload3: {
        content: null,
        name: null,
      },
    });
  };

  const getPermission = async () => {
    const { user } = User.getCookieData();
    const { permissions } = Permission.convertPermissionValuesToBoolean([user]);
    if (!permissions.media.view) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาติดต่อ Admin",
      });
      navigate("/dashboard");
      return;
    }
    setPagePermission(permissions.media);
  };

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

      <div className="m-1 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
        <Header lv1={"media_libraly"} />

        <div className="grid grid-cols-10 mt-10">
          <div className="col-span-6">
            <div className="font-poppins font-semibold text-2xl ">
              Media Libraly
            </div>
          </div>
          <div className="col-span-4"></div>
        </div>
        <Filter
          setFilterScreen={setFilterScreen}
          filter_screen={filter_screen}
        />
        {media_libraly_data.length > 0 ? (
          <div className="mt-5">
            <GridTable
              media_libraly_data={media_libraly_data}
              all_pages={all_pages}
              searchTerm={searchTerm}
              page_permission={page_permission}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[550px] text-center ">
            <div className="font-poppins text-5xl text-[#dedede]">
              --- No data ---
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Media_Libraly;
