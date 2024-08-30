import React, { useState, useEffect } from "react";
import { AiOutlineCloudUpload, AiOutlineCloseCircle } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { BsCheckCircle } from "react-icons/bs";
import Swal from "sweetalert2";
import User from "../libs/admin";
import { values } from "lodash";

const Booking_Upload_Media = ({
  setOpenModalUploadMedia,
  openModalUploadNewMedia,
  setOpenAdsAllocationModal,
  openAdsAllocationModal,
  bookingId,
  advertiserId,
  media_rules_select,
  setItemsPanel1,
  itemsPanel1,
  setItemsPanel2,
  itemsPanel2,
  media_allocation_upload_index,
}) => {
  const { token } = User.getCookieData();
  const [uploads, setUploads] = useState({});
  const [forms, setFormData] = useState({});
  const [disableButton, setDisableButton] = useState(false);

  // useEffect(async () => {
  //   const data = await User.getConfiguration(token);
  // }, []);

  const uploadFile = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".mp4, .jpg, .png";
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          let fileType;
          let fileProperties = {};
          if (file.type.includes("video")) {
            fileType = file.type;
            const video = document.createElement("video");
            video.addEventListener("loadedmetadata", () => {
              // Accessing video properties after it's loaded

              const duration = video.duration || 0;
              const width = video.videoWidth;
              const height = video.videoHeight;

              // for convert filesize
              const fileSize = file.size / (1024 * 1024);

              fileProperties = {
                duration: duration.toString(),
                width: width.toString(),
                height: height.toString(),
                size: fileSize.toString(),
              };

              if (
                media_rules_select.width === width &&
                media_rules_select.height === height
              ) {
                const form = new FormData();
                form.append("file[]", file);
                form.append("contenttype", fileType);
                form.append(
                  "contentproperties",
                  JSON.stringify(fileProperties)
                );

                setUploads(file);
                setFormData(form);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "เกิดข้อผิดพลาด!",
                  text: "ขนาดของ Video ไม่ตรงกับ Media Rule",
                });
              }
            });
            video.src = e.target.result;
          } else if (file.type.includes("image")) {
            fileType = file.type;
            if (fileType === "image/jpeg") {
              fileType = file.type.replace("jpeg", "jpg");
            }
            const img = new Image();
            img.onload = () => {
              // Accessing image properties after it's loaded
              const width = img.width; // Width of the image in pixels
              const height = img.height; // Height of the image in pixels

              // for convert filesize
              const fileSize = file.size / (1024 * 1024);

              // Store the file information along with width and height
              fileProperties = {
                width: width.toString(),
                height: height.toString(),
                size: fileSize.toString(),
              };
              if (
                media_rules_select.width === width &&
                media_rules_select.height === height
              ) {
                const form = new FormData();
                form.append("file[]", file);
                form.append("contenttype", fileType);
                form.append(
                  "contentproperties",
                  JSON.stringify(fileProperties)
                );

                setUploads(file);
                setFormData(form);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "เกิดข้อผิดพลาด!",
                  text: "ขนาดของ Image ไม่ตรงกับ Media Rule",
                });
              }
            };
            img.src = e.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    });
    fileInput.click();
  };

  // const handleUploadMediaByBooking = async () => {
  //   if (uploads.name) {
  //     setDisableButton(!disableButton);
  //     try {
  //       // Function to update progress
  //       const onUploadProgress = (progressEvent) => {
  //         const { loaded, total } = progressEvent;
  //         const percentCompleted = Math.floor((loaded * 100) / total);
  //         console.log(`Upload progress: ${percentCompleted}%`);
  //         setUploadProgress(percentCompleted); // Update state with the current progress
  //       };

  //       const data = await User.createContent(
  //         bookingId,
  //         advertiserId,
  //         forms,
  //         token,
  //         onUploadProgress // Pass the progress function to the API call
  //       );

  //       if (data.code !== 404) {
  //         Swal.fire({
  //           icon: "success",
  //           title: "เพิ่ม media สำเร็จ!",
  //           text: `เพิ่ม media สำเร็จ!`,
  //         }).then((result) => {
  //           if (
  //             result.isConfirmed ||
  //             result.dismiss === Swal.DismissReason.backdrop
  //           ) {
  //             setNewMediaPlayList(data.contentids);
  //             updateMediaPlaylist();
  //             setOpenModalUploadMedia(!openModalUploadNewMedia);
  //             setDisableButton(!disableButton);
  //           }
  //         });
  //       } else {
  //         Swal.fire({
  //           icon: "error",
  //           title: "เกิดข้อผิดพลาด!",
  //           text: data.message,
  //         });
  //       }
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "เกิดข้อผิดพลาด!",
  //       text: "กรุณาเลือกไฟล์ที่ต้องการอัพโหลด",
  //     });
  //   }
  // };

  const handleUploadMediaByBooking = async () => {
    if (uploads.name) {
      setDisableButton(!disableButton);

      const { brand_code } = User.getBrandCode();

      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          document.getElementById("uploadProgress").value = percentComplete;
        }
      });

      xhr.upload.addEventListener("loadstart", () => {
        document.getElementById("uploadProgressContainer").style.display =
          "block";
      });

      xhr.upload.addEventListener("loadend", () => {
        document.getElementById("uploadProgressContainer").style.display =
          "none";
      });

      xhr.open(
        "POST",
        `https://cds.push-signage.com/adsmanager/api/v1/create_content?bookingid=${bookingId}&advertiserid=${advertiserId}&brandcode=${brand_code}`,
        true
      ); // Replace "/upload-endpoint" with your actual upload endpoint
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          const data = JSON.parse(xhr.responseText);
          if (xhr.status !== 404) {
            Swal.fire({
              icon: "success",
              title: "เพิ่ม media สำเร็จ!",
              text: `เพิ่ม media สำเร็จ!`,
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.backdrop
              ) {
                setNewMediaPlayList(data.contentids);
                updateMediaPlaylist();
                setOpenModalUploadMedia(!openModalUploadNewMedia);
                setDisableButton(!disableButton);
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด!",
              text: data.message,
            });
            setDisableButton(!disableButton);
          }
        }
      };

      xhr.send(forms);
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณาเลือกไฟล์ที่ต้องการอัพโหลด",
      });
    }
  };

  const updateMediaPlaylist = async () => {
    const media_list = await User.getMediaPlaylist(bookingId, token);
    setItemsPanel2(media_list);
  };

  // for update upload media to  Panel1

  const setNewMediaPlayList = async (media_id) => {
    const media_list = await User.getMediaPlaylist(bookingId, token);
    const media_data = media_list.find(
      (item) => item.ContentID === parseInt(media_id[0])
    );

    const updatedMediaList = [...itemsPanel1.value.medias];

    updatedMediaList[media_allocation_upload_index] = media_data;
    updatedMediaList[media_allocation_upload_index].duration = 15;
    updatedMediaList[media_allocation_upload_index].slot_size = 1;
    setItemsPanel1((prevState) => ({
      ...prevState,
      value: {
        ...prevState.value,
        medias: updatedMediaList,
      },
    }));
  };

  const handleDeleteFile = () => {
    setUploads({});
    setDisableButton(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 overflow-x-auto">
      {/* Main centered content container */}
      <div className="relative bg-[#FFFFFF] w-4/5 h-5/6 rounded-md max-h-screen overflow-y-auto">
        {/* Close button - adjust positioning */}
        <div className={`absolute -top-4 -right-4 m-4 z-30`}>
          <div className="bg-[#E8E8E8] border-3 border-black rounded-full w-10 h-10 flex justify-center items-center">
            <button
              onClick={() => {
                setOpenModalUploadMedia(!openModalUploadNewMedia);
                // setOpenAdsAllocationModal(!openAdsAllocationModal);
                setUploads({});
              }}
            >
              <IoIosClose size={25} color={"#6425FE"} />
            </button>
          </div>
        </div>

        {/* Content  */}
        <div className="flex justify-center items-center mt-8">
          <div className="font-poppins text-5xl font-bold">New Media</div>
        </div>
        <div className="flex justify-center items-center mt-2">
          {/* <div className="font-poppins text-xs lg:text-lg text-[#8A8A8A]">
      Lorem Ipsum is simply dummy text of the printing and typesetting
      industry.
    </div> */}
        </div>

        <div className="flex justify-center items-center mt-2 p-5">
          <div className="col-span-1 border-dashed border-gray-300 border-1 relative">
            {uploads?.name ? (
              <button
                className="absolute top-0 right-0 mt-2 mr-2"
                onClick={() => handleDeleteFile()}
              >
                {/* Add delete button with onClick handler */}
                <AiOutlineCloseCircle size={24} color={"#FF0000"} />
              </button>
            ) : (
              <></>
            )}

            <div className="p-4">
              <div className="flex items-center justify-center mt-2">
                <div className="font-poppins text-3xl font-bold">
                  Rule Set 1
                </div>
              </div>
              <div className="flex items-center justify-center mt-7">
                {!uploads.name ? (
                  <div>
                    <button onClick={() => uploadFile()}>
                      <AiOutlineCloudUpload size={100} color={"#D9D9D9"} />
                    </button>
                    {uploads.content && (
                      <div>
                        <p>File Uploaded:</p>
                        <img src={uploads} alt="Uploaded File" />
                      </div>
                    )}
                  </div>
                ) : (
                  <BsCheckCircle size={100} color={"#00CB45"} />
                )}
              </div>
              <div className="flex items-center justify-center mt-14">
                <div className="font-poppins text-xl font-bold">
                  {uploads.name}
                </div>
              </div>
              <div className="flex items-center justify-center mt-5">
                <div className="font-poppins text-xl font-bold">
                  Requirements *
                </div>
              </div>
              <div className="flex items-center justify-center ">
                <div className="font-poppins text-xl font-bold">
                  Resolution : {media_rules_select?.width} x{" "}
                  {media_rules_select?.height}
                </div>
              </div>
              <div className="flex items-center justify-center mb-16">
                <div className="font-poppins text-xl font-bold">
                  {`Size : <100Mb`}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-center items-center mt-1">
          {uploadProgress > 0 && (
            <div id="uploadProgressContainer">
              <progress id="uploadProgress" value={uploadProgress} max="100">
                {uploadProgress}%
              </progress>
            </div>
          )}
        </div> */}
        <div className="flex justify-center items-center mt-1">
          <div id="uploadProgressContainer" style={{ display: "none" }}>
            <progress id="uploadProgress" value="0" max="100"></progress>
          </div>
        </div>

        <div className="flex justify-center items-center mt-1">
          <button
            onClick={() => handleUploadMediaByBooking()}
            className={`bg-[#6425FE] disabled:bg-[#bda5fa] w-72 h-10 text-white font-poppins`}
            disabled={disableButton}
          >
            Submit
          </button>
        </div>
        <div className="flex justify-center items-center mt-3 mb-3">
          <div className="text-sm font-poppins">
            Ensure compliance with predefined media rules for each screen. Your
            ads must adhere to specific guidelines for seamless display
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking_Upload_Media;
