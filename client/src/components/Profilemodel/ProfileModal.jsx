import { useDisclosure } from "@mantine/hooks";
import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {uploadImage} from '../../actions/UploadAction.js'
import { updateUser } from "../../actions/userAction.js";
import axios from 'axios'


function ProfileModal({ modalOpened, setModalOpened, data }) {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        // dispatch(uploadImage(data));
        const res = await axios.post(
          "http://localhost:8080/upload",
          data,{
            headers:{
              'Content-Type': 'multipart/form-data'
            }
          }
          );
          let imageUrl = res.data
          UserData.profilePicture = imageUrl.replace("Input file is missing: ","")
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        const res = await axios.post(
          "http://localhost:8080/upload",
          data,{
            headers:{
              'Content-Type': 'multipart/form-data'
            }
          }
          );
          let imageUrl = res.data
          UserData.coverPicture = imageUrl.replace("Input file is missing: ","")
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <>
      <Modal
        size={"auto"} title={"Edit Your Profile"}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        
      >
        <form className="infoForm">
          <>
            <input
              onChange={handleChange}
              type="text"
              name="firstname"
              className="info-input"
              placeholder="First Name"
              value={formData.firstname}
            />
            <input
              value={formData.lastname}
              onChange={handleChange}
              type="text"
              name="lastname"
              className="info-input"
              placeholder="Last Name"
            />
          </>
          <>
            <input
              value={formData.worksAt}
              onChange={handleChange}
              type="text"
              name="worksAt"
              className="info-input"
              placeholder="Branch"
            />
          </>
          <>
            <input
              value={formData.livesin}
              onChange={handleChange}
              type="text"
              name="livesin"
              className="info-input"
              placeholder="LivesIn"
            />
            <input
              value={formData.country}
              onChange={handleChange}
              type="text"
              name="country"
              className="info-input"
              placeholder="country"
            />
          </>
          <>
            <input
              value={formData.relationship}
              onChange={handleChange}
              type="text"
              className="info-input"
              placeholder="relationship status"
              name="relationship"
            />
          </>

          <>
            Profile Image
            <input onChange={onImageChange} type="file" name="profileImage" />
            Cover Image
            <input onChange={onImageChange} type="file" name="coverImage" />
          </>

          <button className="button info-btn" onClick={handleSubmit}>Update</button>
        </form>
      </Modal>
    </>
  );
}

export default ProfileModal;
