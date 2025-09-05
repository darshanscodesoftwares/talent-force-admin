import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBanner.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { HomeBannerContext } from "../UseContexts/SeekerUseContext/HomeBannerContext";

export default function AddBanner() {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const { addBanner } = useContext(HomeBannerContext); // ✅ use context function
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("createdBy", "Admin"); // or from user auth

    await addBanner(formData); // ✅ call context function
    navigate("/dashboard/home-banner"); // go back after saving
  };

  return (
    <div className="addbanner-container">
      <div className="addbanner-card">
        <h2 className="addbanner-title">Add Thumbnail Photo</h2>

        <div className="addbanner-upload">
          {preview ? (
            <img src={preview} alt="Preview" className="addbanner-preview" />
          ) : (
            <label htmlFor="banner-upload" className="addbanner-dropzone">
              <AiOutlineCloudUpload className="upload-icon"/>
              <span>Drop your images here or <span className="browse-text">click to browse</span></span>
              <p>1600 x 1200 (4:3) recommended. PNG, JPG, GIF allowed</p>
            </label>
          )}
          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="addbanner-input"
          />
        </div>

        <div className="addbanner-actions">
          <button type="button" className="addbanner-cancel" onClick={() => navigate("/dashboard/home-banner")}>
            Cancel
          </button>
          <button type="button" className="addbanner-save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
