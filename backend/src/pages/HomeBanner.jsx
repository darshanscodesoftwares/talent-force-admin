import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import "./HomeBanner.css";
import { useState } from "react";
import { banners } from "../data/contentData.js";
import { useNavigate } from "react-router-dom";

export default function HomeBanner() {
  const [bannerList, setBannerList] = useState(banners);
  const navigate = useNavigate();

  const handleEdit = (banner) => {
    console.log("Edit", banner);
  };

  const handleDelete = (id) => {
    setBannerList(bannerList.filter((b) => b.id !== id));
  };

  return (
    <div className="homebanner-container">
      {/* Top Banner Cards */}
      <div className="homebanner-top-row">
        {bannerList.slice(0, 2).map((banner, index) => (
          <div className="homebanner-card" key={banner.id}>
            <img src={banner.image} alt="Banner" />
            <p>Banner {index + 1}</p>
          </div>
        ))}
      </div>

      {/* Banner List Table */}
      <div className="homebanner-rec-seek">
        <div className="homebanner-section">
          <div className="banner-button">
            <h2>All Banner List</h2>
            <button
              className="homebanner-add-btn"
              onClick={() => navigate("/dashboard/home-banner/add")}
            >
              Add Banner
            </button>
          </div>
          <div className="homebanner-table-container">
            <table className="homebanner-table">
              <thead>
                <tr>
                  {/* <th></th> */}
                  <th>Banner</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bannerList.map((banner) => (
                  <tr key={banner.id}>
                    {/* <td>
                      <input type="checkbox" />
                    </td> */}
                    <td>
                      <img
                        src={banner.image}
                        alt="banner"
                        className="homebanner-img"
                      />
                    </td>
                    <td>{banner.postedOn}</td>
                    <td>{banner.createdBy}</td>
                    <td className="homebanner-actions">
                      <button
                        className="homebanner-btn view-btn"
                        onClick={() => console.log("View", banner)}
                      >
                        <FaRegEye />
                      </button>
                      <button
                        className="homebanner-btn edit-btn"
                        onClick={() => navigate(`/dashboard/home-banner/edit/${banner.id}`)}
                      >
                        <BiSolidEdit />
                      </button>
                      <button
                        className="homebanner-btn delete-btn"
                        onClick={() => handleDelete(banner.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
