import React, { useEffect, useRef, useState } from "react";
import { FaFileAudio, FaImage, FaVideo } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import PostCard from "./PostCard";
import { TextInput, FileInput } from "flowbite-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { MdAttachment, MdMic } from "react-icons/md";
const ScrollFeedPosts = () => {
  const { posts, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const imageRef = useRef();
  const [formdata, setFormData] = useState({
    userId: currentUser._id,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    description: "",
    postPicturePath: "",
    location: currentUser.location,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = async () => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`file upload ${uploadProgress}% completed`);
      },
      (error) => {
        console.log(error);
        setError(`filesize is greater than 2mb`);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({
            ...formdata,
            postPicturePath: downloadUrl,
          });
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/post/createpost`,
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        setFormData({
          userId: currentUser._id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          description: "",
          postPicturePath: "",
          location: currentUser.location,
        });
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);
  return (
    <div className=" flex flex-col w-full flex-shrink-0 order-[-1] lg:order-[0] lg:w-[45%] gap-5 overflow-y-auto scrollbar-none">
      <div className="flex flex-col gap-3 p-2 border-2  rounded-lg  dark:border-gray-700 focus:outline-none">
        <div className=" flex gap-4">
          <img
            className=" w-10 h-10 rounded-full"
            src={currentUser.picturePath}
            alt=""
          />
          <input
            type="text"
            name="description"
            value={formdata.description}
            onChange={handleChange}
            id=""
            className=" dark:bg-slate-800 rounded-3xl w-full"
            placeholder="What's on your mind..."
          />
        </div>
        <hr className=" border-[1px] border-gray-600" />
        <FileInput
          name="postPicturePath"
          ref={imageRef}
          className=" hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && <img src={formdata.postPicturePath} alt="" srcset="" />}
        <form className=" flex justify-between" onSubmit={handleSubmit}>
          <div
            className=" flex items-center cursor-pointer gap-1 "
            onClick={() => imageRef.current.click()}
          >
            <CiImageOn />
            <p className="text-sm">Image</p>
          </div>
          <div
            className=" flex items-center cursor-pointer gap-1 "
            onClick={() => imageRef.current.click()}
          >
            <FaVideo />
            <p className="text-sm">Video</p>
          </div>
          <div
            className=" flex items-center cursor-pointer gap-1 "
            onClick={() => imageRef.current.click()}
          >
            <MdAttachment />
            <p className="text-sm">Attachment</p>
          </div>
          <div
            className=" flex items-center cursor-pointer gap-1 "
            onClick={() => imageRef.current.click()}
          >
            <MdMic />
            <p className="text-sm">Audio</p>
          </div>
          <button
            type="submit"
            className=" border-2 border-transparent px-2  bg-sky-600 rounded-2xl text-white hover:border-neutral-900 hover:bg-white hover:text-sky-400"
          >
            Post
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-3 p-2 h-screen rounded-lg  dark:border-gray-700 focus:outline-none">
        <div className=" flex flex-col gap-8 ">
          {
           posts && posts.map((post)=>{

            return <PostCard  key={post._id} post={post}/>
           })
          }
          
        </div>
      </div>
    </div>
  );
};

export default ScrollFeedPosts;
