import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../hooks/usePrivateAxios";
import useAxiosPrivate2 from "../hooks/usePrivateAxios2";
import toast from "react-hot-toast";

const UserSettings = () => {
  const privateAxiosTwo = useAxiosPrivate2();
  const privateAxios = useAxiosPrivate();

  const { id } = useParams();
  const {
    id: user_id,
    username,
    email,
    full_name,
    coverPic,
    profilePic,
    bio,
    location,
    website,
  } = useSelector((state) => state.auth.user);

  const [usernameInput, setUsernameInput] = useState(username || "");
  const [emailInput, setEmailInput] = useState(email || "");
  const [fullnameInput, setFullnameInput] = useState(full_name || "");
  const [coverPicInput, setCoverPicInput] = useState(coverPic || "");
  const [profilePicInput, setProfilePicInput] = useState(profilePic || "");
  const [bioInput, setBioInput] = useState(bio || "");
  const [locationInput, setLocationInput] = useState(location || "");
  const [websiteInput, setWebsiteInput] = useState(website || "");

  const uploadCover = async () => {
    try {
      const formData = new FormData();
      formData.append("image", coverPicInput);
      const res = await privateAxiosTwo.post("/upload", formData);
      console.log("res from uploadCover: ", res.data);
      return res.data;
    } catch (err) {
      console.log("err from upload addpost: ", err);
    }
  };
  const uploadProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("image", profilePicInput);
      const res = await privateAxiosTwo.post("/upload", formData);
      console.log("res from uploadProfile: ", res.data);
      return res.data;
    } catch (err) {
      console.log("err from upload addpost: ", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const coverUrl = await uploadCover();
    const profileUrl = await uploadProfile();
    console.log("coverUrl: ", coverUrl);
    console.log("profileUrl: ", profileUrl);
    console.log("profilePicInput: ", profilePicInput);
    console.log("coverPicInput: ", coverPicInput);

    try {
      const req = await privateAxios.put("/users/update", {
        username: usernameInput,
        email: emailInput,
        full_name: fullnameInput,
        coverPic: coverUrl,
        profilePic: profileUrl,
        bio: bioInput,
        location: locationInput,
        website: websiteInput,
        user_id: user_id,
      });
      if (req.status === 200) {
        toast(req.data.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      if (error)
        console.log("error from userSettings handleSubmit trycatch: ", error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={fullnameInput}
            onChange={(e) => setFullnameInput(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="coverPic">Cover:</label>
          <input
            type="file"
            id="coverPic"
            name="coverPic"
            onChange={(e) => setCoverPicInput(e.target.files[0])}
          />
        </div>

        <div>
          <label htmlFor="profilePic">Profile Picture:</label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            onChange={(e) => setProfilePicInput(e.target.files[0])}
          />
        </div>

        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={bioInput}
            onChange={(e) => setBioInput(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="location">Location:</label>
          <textarea
            id="location"
            name="location"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="website">Website:</label>
          <textarea
            id="website"
            name="website"
            value={websiteInput}
            onChange={(e) => setWebsiteInput(e.target.value)}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
export default UserSettings;
