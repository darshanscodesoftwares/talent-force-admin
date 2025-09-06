import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HomeBannerContext } from "../UseContexts/SeekerUseContext/HomeBannerContext";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./EditBanner.css";

export default function EditBanner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { banners, updateBanner } = useContext(HomeBannerContext); // ✅ use updateBanner from context

  const [banner, setBanner] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Load banner details
useEffect(() => {
  if (Array.isArray(banners) && banners.length > 0) {
    const foundBanner = banners.find((b) => b?.id?.toString() === id);
    if (foundBanner) {
      setBanner(foundBanner);
      setPreview(foundBanner.banner_image);
    } else {
      setErrorMsg("Banner not found");
    }
  }
}, [id, banners]);


  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = async () => {
    if (!banner) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const formData = new FormData();
      if (file) formData.append("banner_image", file);

      await updateBanner(id, formData); // ✅ delegate to context

      navigate("/dashboard/home-banner");
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to update banner. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!banner) return <p>{errorMsg || "Loading banner..."}</p>;

  return (
    <div className="editbanner-container">
      <h2>Edit Banner</h2>

      <div className="editbanner-controls">
        <label htmlFor="banner-upload" className="editbanner-upload-btn">
          Change Banner
        </label>
        <input
          id="banner-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />
        <button type="button" className="editbanner-delete-btn">
          <RiDeleteBin5Line />
        </button>
      </div>

      <div className="editbanner-preview-box">
        {preview && (
          <img
            src={preview}
            alt="Banner Preview"
            className="editbanner-preview-img"
          />
        )}
      </div>

      <div className="editbanner-actions">
        <button
          type="button"
          className="editbanner-cancel"
          onClick={() => navigate("/dashboard/home-banner")}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="button"
          className="editbanner-save"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
