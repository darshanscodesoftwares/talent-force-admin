import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { banners } from "../data/contentData.js";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./EditBanner.css";

export default function EditBanner() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const foundBanner = banners.find((b) => b.id.toString() === id);
    if (foundBanner) setBanner(foundBanner);
  }, [id]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBanner({
        ...banner,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSave = () => {
    console.log("Updated Banner:", banner);
    navigate("/dashboard/home-banner");
  };

  if (!banner) return <p>Loading banner...</p>;

  return (
    <div className="editbanner-container">
      <h2>Add Thumbnail Photo</h2>
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
        <img
          src={banner.image}
          alt="Banner Preview"
          className="editbanner-preview-img"
        />

        
      </div>

      <div className="editbanner-actions">
        <button
          type="button"
          className="editbanner-cancel"
          onClick={() => navigate("/dashboard/home-banner")}
        >
          Cancel
        </button>
        <button type="button" className="editbanner-save" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
