import React, { useState, useEffect } from "react";
import { AiOutlineCloudUpload, AiOutlineCloseCircle } from "react-icons/ai";
import { IoIosClose, IoIosAddCircle } from "react-icons/io";
import { BsCheckCircle, BsUpload, BsTrash } from "react-icons/bs";
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
  const [uploads, setUploads] = useState([]);
  const [forms, setFormData] = useState({});
  const [disableButton, setDisableButton] = useState(false);
  const [uploads_file, setUploadFile] = useState([]);

  const [file_type, setFileTyle] = useState("");

  useEffect(async () => {
    const {
      configuration: { contenttype },
    } = await User.getConfiguration(token);

    const extensions = contenttype
      .flatMap((type) => type.ContentTypeSub || []) // Flatten the array and filter out items without ContentTypeSub
      .map((sub) => `.${sub.ContentTypeSubName}`) // Format as `.jpg`, `.png`, etc.
      .join(", "); // Join into a single string
    setFileTyle(extensions);
  }, []);

  useEffect(() => {
    setNewMediaPlayList();
  }, [uploads_file]);

  const uploadFile = (id) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = file_type;

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
              const duration = video.duration || 0;
              const width = video.videoWidth;
              const height = video.videoHeight;
              const fileSize = file.size / (1024 * 1024); // Convert to MB

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
                setUploads((prevUploads) =>
                  prevUploads.map((upload) =>
                    upload.id === id
                      ? {
                          ...upload,
                          name: file.name,
                          size: file.size,
                          formData: form,
                        }
                      : upload
                  )
                );
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
              const width = img.width;
              const height = img.height;
              const fileSize = file.size / (1024 * 1024); // Convert to MB

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

                setUploads((prevUploads) =>
                  prevUploads.map((upload) =>
                    upload.id === id
                      ? {
                          ...upload,
                          name: file.name,
                          size: file.size,
                          formData: form,
                        }
                      : upload
                  )
                );
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

  const handleUploadMediaByBooking = async () => {
    if (uploads.length > 0) {
      setDisableButton(true);

      const { brand_code } = User.getBrandCode();
      const filteredItems = uploads.filter((item) => item.name !== null);

      // Initialize upload status for all items
      setUploads((prevUploads) =>
        prevUploads.map((item) => ({ ...item, status: "waiting" }))
      );

      // Function to upload a single file
      const uploadFile = (upload, index) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              const percentComplete = (event.loaded / event.total) * 100;
              setUploads((prevUploads) =>
                prevUploads.map((item, idx) =>
                  idx === index
                    ? {
                        ...item,
                        progress: percentComplete,
                        status: "uploading",
                      }
                    : item
                )
              );
            }
          });

          xhr.upload.addEventListener("loadstart", () => {
            const progressContainer = document.getElementById(
              `uploadProgressContainer-${upload.id}`
            );
            if (progressContainer) {
              progressContainer.style.display = "block";
            }
          });

          xhr.upload.addEventListener("loadend", () => {
            const progressContainer = document.getElementById(
              `uploadProgressContainer-${upload.id}`
            );
            if (progressContainer) {
              progressContainer.style.display = "none";
            }
          });

          xhr.open(
            "POST",
            `https://cds.push-signage.com/adsmanager/api/v1/create_content?bookingid=${bookingId}&advertiserid=${advertiserId}&brandcode=${brand_code}`,
            true
          );

          xhr.setRequestHeader("Authorization", `Bearer ${token}`);

          xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              const data = JSON.parse(xhr.responseText);
              if (xhr.status === 200) {
                setUploadFile((prevItems) => {
                  const updatedItems = [...prevItems, ...data.contentids];
                  return updatedItems;
                });
                updateMediaPlaylist();
                setUploads((prevUploads) =>
                  prevUploads.map((item, idx) =>
                    idx === index ? { ...item, status: "completed" } : item
                  )
                );
                resolve(); // Resolve the promise when done
              } else {
                Swal.fire({
                  icon: "error",
                  title: "เกิดข้อผิดพลาด!",
                  text: data.message || "Unknown error",
                });
                setUploads((prevUploads) =>
                  prevUploads.map((item, idx) =>
                    idx === index ? { ...item, status: "error" } : item
                  )
                );
                reject(); // Reject the promise on error
                setDisableButton(false);
              }
            }
          };

          xhr.send(upload.formData);
        });
      };

      // Process uploads sequentially
      const processUploads = async () => {
        for (let i = 0; i < filteredItems.length; i++) {
          try {
            await uploadFile(filteredItems[i], i);
          } catch {
            break; // Stop processing further uploads if one fails
          }
        }
        setDisableButton(false);
      };

      processUploads();
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "กรุณาเลือกไฟล์ที่ต้องการอัพโหลด",
      });
      setDisableButton(false);
    }
  };

  const bytesToMB = (bytes) => {
    return bytes / (1024 * 1024);
  };

  const bytesToGB = (bytes) => {
    return bytes / (1024 * 1024 * 1024);
  };

  const convertFileSize = (size) => {
    let size_file;

    if (size >= 1024 * 1024 * 1024) {
      const spaceInGB = bytesToGB(size);
      size_file = `${spaceInGB.toFixed(2)} GB`;
    } else {
      const spaceInMB = bytesToMB(size);
      size_file = `${spaceInMB.toFixed(2)} MB`;
    }

    return size_file;
  };

  const updateMediaPlaylist = async () => {
    const media_list = await User.getMediaPlaylist(bookingId, token);
    setItemsPanel2(media_list);
  };

  // for update upload media to Panel1

  const setNewMediaPlayList = async () => {
    const filteredItems = uploads.filter((item) => item.name !== null);
    if (uploads_file.length > 0) {
      if (uploads_file.length === filteredItems.length) {
        const media_list = await User.getMediaPlaylist(bookingId, token);
        const updatedMediaList = [...itemsPanel1.value.medias];

        uploads_file.map((items, index) => {
          const media_data = media_list.find(
            (item) => item.ContentID === parseInt(items)
          );

          updatedMediaList[index] = media_data;
          updatedMediaList[index].duration = 15;
          updatedMediaList[index].slot_size = 1;
        });

        setItemsPanel1((prevState) => ({
          ...prevState,
          value: {
            ...prevState.value,
            medias: updatedMediaList,
          },
        }));

        Swal.fire({
          icon: "success",
          title: "เพิ่ม media สำเร็จ!",
          text: `เพิ่ม media สำเร็จสำหรับ Playlist`,
        }).then((result) => {
          setOpenModalUploadMedia(false);
          setDisableButton(false);
        });
      }
    }
  };

  const addUploadBox = () => {
    if (uploads.length + 1 > itemsPanel1?.value?.slots) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "คุณไม่สามารถอัพโหลดไฟล์เกินจำนวน Slot ที่จองมาได้",
      });
    } else {
      const newUploadBox = {
        id: uploads.length + 1,
        name: null,
        size: 0,
        progress: 0,
      };
      setUploads([...uploads, newUploadBox]);
    }
  };

  const handleDeleteFile = (id) => {
    setUploads(uploads.filter((upload) => upload.id !== id));
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
        <div className="flex justify-center items-center mt-2"></div>

        <div className="mt-5 p-5 h-[500px] overflow-y-auto space-y-2 ">
          {uploads.length > 0 ? (
            uploads.map((upload) => (
              <div
                key={upload.id}
                className="flex flex-col max-w-md mx-auto border shadow-sm rounded-xl "
              >
                <div className="p-4 md:p-5 space-y-7">
                  <div className="mb-2 flex justify-between items-center">
                    <div className="flex items-center gap-x-3">
                      <span className="size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg">
                        <button onClick={() => uploadFile(upload.id)}>
                          <BsUpload
                            size={24}
                            className="text-gray-500 hover:text-gray-300"
                          />
                        </button>
                      </span>
                      <div>
                        <div className="text-xl font-poppins text-gray-800">
                          {upload.name || "No File..."}
                        </div>
                        <div className="text-md font-poppins text-gray-500">
                          {upload.size
                            ? convertFileSize(upload.size)
                            : "No File ..."}
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-x-2">
                      {upload.name ? (
                        <>
                          <svg
                            className="shrink-0 size-4 text-teal-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                          </svg>
                          <button
                            onClick={() => handleDeleteFile(upload.id)}
                            type="button"
                            className="relative text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            <BsTrash
                              size={24}
                              className="text-gray-500 hover:text-gray-300"
                            />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleDeleteFile(upload.id)}
                            type="button"
                            className="relative text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            <BsTrash
                              size={24}
                              className="text-gray-500 hover:text-gray-300"
                            />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    id={`uploadProgressContainer-${upload.id}`}
                    className="w-full"
                  >
                    <progress
                      id={`uploadProgress-${upload.id}`}
                      value={upload.progress || 0}
                      max="100"
                      className="w-full h-3"
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
          <div className="flex flex-col max-w-md mx-auto border shadow-sm rounded-xl">
            <div className="p-4 md:p-5 space-y-7">
              <div className="mb-2 flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <div className="size-8 flex justify-center items-center text-gray-500 rounded-lg">
                    <button
                      onClick={addUploadBox}
                      className="flex justify-center items-center"
                    >
                      <IoIosAddCircle
                        size={40}
                        className="text-gray-500 hover:text-gray-300"
                      />
                    </button>
                  </div>
                  <div>
                    <div className="text-xl font-poppins text-gray-800">
                      Add New File ...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-1">
          <button
            onClick={() => handleUploadMediaByBooking()}
            className={`bg-[#6425FE] disabled:bg-[#bda5fa] w-72 h-10 text-white font-poppins rounded-lg`}
            disabled={disableButton}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking_Upload_Media;
