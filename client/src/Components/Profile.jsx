import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Button, FileInput, Modal, Spinner, TextInput } from "flowbite-react";
import { React, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  signInFailure,
  signInStart,
  signInSuccess,
  signOutSuccess,
} from "../redux/reducers/userSlice";
import { stateContext } from "../Context/stateContext";

const Profile = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const {setLogin} = useContext(stateContext);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const imageRef = useRef();
  const [modalText, setModalText] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  const [error, setError] = useState(null);
  const [formdata, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    location: currentUser.location,
    picturePath: currentUser.picturePath,
  });

  const handleImageUpload = () => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`file upload completed ${Math.floor(progress)}%`);
      },
      (error) => {
        setError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadUrl) => {
            setFormData({
              ...formdata,
              picturePath: downloadUrl,
            });
          })
          .catch((error) => {
            setError(error);
          });
      }
    );
  };

  const signOutUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/auth/signout/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        dispatch(signOutSuccess());
        setLogin(false);
        <Navigate to={"/login"} />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (file) {
      handleImageUpload();
    }
  }, [file]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await axios.patch(
        `http://localhost:8000/api/user/updateUser/${currentUser._id}`,
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        console.log(response.data);
        dispatch(signInSuccess(response.data.rest));
      }
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className={toggleModal?`flex flex-col blur-sm  max-w-2xl md:mx-auto p-4 md:min-h-screen gap-6 mt-7`:"flex flex-col  max-w-2xl md:mx-auto p-4 md:min-h-screen gap-6 mt-7"}>
        <h1 className=" text-center text-2xl font-semibold">User Profile</h1>
        <div className=" cursor-pointer mx-auto flex justify-center items-center w-32 h-32 rounded-full border-2 ">
          <img
            className=" w-28 h-28 rounded-full"
            onClick={() => imageRef.current.click()}
            src={formdata.picturePath}
            alt=""
          />
        </div>
        <FileInput
          ref={imageRef}
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <form action="" className="flex flex-col gap-2" onSubmit={handleProfileUpdate}>
          <TextInput
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formdata.firstName}
            onChange={handleChange}
          />
          <TextInput
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formdata.lastName}
            onChange={handleChange}
          />
          <TextInput
            type="email"
            placeholder="User Email"
            value={currentUser.email}
            disabled
          />
          <TextInput
            type="text"
            placeholder="User Location"
            name="location"
            value={formdata.location}
            onChange={handleChange}
          />
          <Button gradientDuoTone={"purpleToPink"} type="submit" outline>
            {loading ? (
              <>
                <Spinner /> <span className=" ml-1">Loading...</span>
              </>
            ) : (
              "Update Profile"
            )}
          </Button>
          <div className=" flex text-md text-red-600 justify-between cursor-pointer">
            <p
              onClick={() => {
                setModalText("signout");
                setToggleModal(true);
              }}
            >
              Sign Out
            </p>
            <p
              onClick={() => {
                setModalText("delete this account");
                setToggleModal(true);
              }}
            >
              Delete Account
            </p>
          </div>
        </form>
        <Modal
          show={toggleModal}
          size="md"
          onClose={() => setToggleModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {`Are you sure you want to ${modalText}?`}
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color={"failure"}
                  onClick={() => {
                    if (modalText === "signout") {
                      signOutUser(currentUser._id);
                    } else {
                      console.log("Delete Account");
                    }
                  }}
                >
                  Yes
                </Button>
                <Button color={"success"} onClick={() => setToggleModal(false)}>
                  No
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>

      {/* modal */}
    </>
  );
};

export default Profile;
