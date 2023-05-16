import React, { useState, useRef } from "react";
import Profile from "../../img/profileImg.png";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction.js";
import axios from "axios";

const PostShare = () => {

  const[image_url, setImageUrl] = useState('')
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const desc = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const imageRef = useRef();

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: user._id,
      username:user.username,
      desc: desc.current.value,
      image_url:''
    };

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
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
          // setImageUrl(res.data)
          let imageUrl = res.data
          newPost.image_url = imageUrl.replace("Input file is missing: ","")
      } catch (err) {
        console.log(err);
      }
    }
    console.log("uploading post...")
    if (newPost.desc === '') {
      alert('Write something in the post')
    }
    else{
      dispatch(uploadPost(newPost));
    }
    console.log(newPost)
    resetShare();
  };

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };
  return (
    <div className="PostShare">
      
      <div>
        <div className="input-img-container">
          <img
            src={
             user && user.profilePicture ? user.profilePicture : Profile
            }
            alt=""
          />
          <input type="text" placeholder="What's happening" ref={desc} />
        </div>
        <div className="postOptions">
          <div
            onClick={() => imageRef.current.click()}
            className="option"
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" >
            <UilPlayCircle />
            Video
          </div>

          <button
            className="button ps-btn"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading" : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>

        {image && (
          <div className="previewImg">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
