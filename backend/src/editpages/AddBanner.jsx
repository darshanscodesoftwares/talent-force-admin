import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBanner.css";
import { AiOutlineCloudUpload } from "react-icons/ai";

export default function AddBanner() {
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="addbanner-container">
            <div className="addbanner-card">
                <h2 className="addbanner-title">Add Thumbnail Photo</h2>

                {/* Image Upload */}
                <div className="addbanner-upload">
                    
                    {preview ? (
                        <img src={preview} alt="Preview" className="addbanner-preview" />
                    ) : (
                        <label htmlFor="banner-upload" className="addbanner-dropzone">
                            <span>
                                <div className="upload-warp">
                                <AiOutlineCloudUpload className="upload-icon"/>
                                Drop your images here or{" "}
                                
                                <span className="browse-text">click to browse</span>
                                </div>
                            </span>
                            <p>1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed</p>
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

                {/* Action Buttons */}
                <div className="addbanner-actions">
                    <button
                        type="button"
                        className="addbanner-cancel"
                        onClick={() => navigate("/dashboard/home-banner")}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="addbanner-save"
                        onClick={() => navigate("/dashboard/home-banner")}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
