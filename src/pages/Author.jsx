import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch author data
  useEffect(() => {
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      )
      .then((res) => {
        setAuthor(res.data);
        setItems(res.data.nftCollection || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">

              {/* PROFILE HEADER */}
<div className="col-md-12">
  {loading ? (
    // SKELETON HEADER
    <div className="d_profile de-flex">
      <div className="de-flex-col">
        <div className="profile_avatar">
          <div
            className="skeleton-box"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
            }}
          ></div>

          <div className="profile_name" style={{ marginTop: "20px" }}>
            <div
              className="skeleton-box"
              style={{ width: "200px", height: "25px", marginBottom: "10px" }}
            ></div>
            <div
              className="skeleton-box"
              style={{ width: "150px", height: "20px", marginBottom: "10px" }}
            ></div>
            <div
              className="skeleton-box"
              style={{ width: "250px", height: "20px" }}
            ></div>
          </div>
        </div>
      </div>

      <div className="profile_follow de-flex">
        <div className="de-flex-col">
          <div
            className="skeleton-box"
            style={{ width: "120px", height: "20px", marginBottom: "10px" }}
          ></div>
          <div
            className="skeleton-box"
            style={{ width: "100px", height: "35px" }}
          ></div>
        </div>
      </div>
    </div>
  ) : (
    // REAL HEADER
    <div className="d_profile de-flex">
      <div className="de-flex-col">
        <div className="profile_avatar">
          <img src={author?.authorImage} alt={author?.authorName} />
          <i className="fa fa-check"></i>

          <div className="profile_name">
            <h4>
              {author?.authorName}
              <span className="profile_username">@{author?.tag}</span>
              <span id="wallet" className="profile_wallet">
                {author?.address}
              </span>
              <button id="btn_copy" title="Copy Text">
                Copy
              </button>
            </h4>
          </div>
        </div>
      </div>

      <div className="profile_follow de-flex">
        <div className="de-flex-col">
          <div className="profile_follower">
            {author?.followers} followers
          </div>
          <Link to="#" className="btn-main">
            Follow
          </Link>
        </div>
      </div>
    </div>
  )}
</div>


              {/* AUTHOR ITEMS */}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={items}
                    loading={loading}
                    author={author}
                  />
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
