import { BiSolidEdit } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./HomeBanner.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HomeBannerContext } from "../UseContexts/SeekerUseContext/HomeBannerContext";

export default function HomeBanner() {
  const { banners, loading, error } = useContext(HomeBannerContext); // ✅ use context
  const [viewedRows, setViewedRows] = useState([]);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setBannerList(bannerList.filter((b) => b.id !== id));
    setViewedRows(viewedRows.filter((rowId) => rowId !== id)); // remove if deleted
  };

  const handleView = (id) => {
    setViewedRows((prev) =>
      prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id]
    );
  };

  if (loading) return <p>Loading banners...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!banners.length) return <p>No banners available.</p>;

  return (
    <div className="homebanner-container">
      <div className="homebanner-top-row">
        {banners.slice(0, 2).map((banner, index) => (
          <div className="homebanner-card" key={banner.id}>
            <img src={banner.image_url} alt="Banner" /> {/* ✅ API field */}
            <p>Banner {index + 1}</p>
          </div>
        ))}
      </div>

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
                  <th>Banner</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <tr
                    key={banner.id}
                    className={viewedRows.includes(banner.id) ? "viewed-row" : ""}
                  >
                    <td>
                      <img
                        src={banner.image_url} // ✅ API field
                        alt="banner"
                        className="homebanner-img"
                      />
                    </td>
                    <td>{banner.postedOn || "N/A"}</td>
                    <td>{banner.createdBy || "Admin"}</td>
                    <td className="homebanner-actions">
                      <button
                        className="homebanner-btn view-btn"
                        onClick={() => handleView(banner.id)}
                      >
                        {viewedRows.includes(banner.id) ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                      <button
                        className="homebanner-btn edit-btn"
                        onClick={() =>
                          navigate(`/dashboard/home-banner/edit/${banner.id}`)
                        }
                      >
                        <BiSolidEdit />
                      </button>
                      {/* <button
                        className="homebanner-btn delete-btn"
                        onClick={() => handleDelete(banner.id)}
                      >
                        <AiOutlineDelete />
                      </button> */}
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
