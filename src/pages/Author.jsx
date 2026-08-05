import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../images/author_banner.jpg";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // States to manage the Follow/Unfollow interaction locally
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    const top = document.getElementById("top");
    if (top) top.scrollIntoView({ behavior: "smooth" });

    // 1. Reset state so the loading skeleton shows up when switching authors
    setLoading(true);
    setAuthor(null);
    setFollowing(false);

    // Fetch author data
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      )
      .then((res) => {
        setAuthor(res.data);
        setFollowers(res.data.followers); // Set initial follower count from API
        
        const itemsWithOwnerData = res.data.nftCollection.map((item) => ({
          ...item,
          ownerId: res.data.authorId,
          ownerImage: res.data.authorImage,
        }));
        
        setItems(itemsWithOwnerData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching author details:", error);
        setLoading(false);
      });
  }, [authorId]);

  // Function to toggle follower count and button text
  const toggleFollow = () => {
    if (following) {
      setFollowers((prev) => prev - 1);
    } else {
      setFollowers((prev) => prev + 1);
    }
    setFollowing((prev) => !prev);
  };

  // Function to copy the wallet address to clipboard
  const copyAddress = () => {
    if (author && author.address) {
      navigator.clipboard.writeText(author.address);
      alert("Wallet address copied to clipboard!");
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* Banner */}
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        {/* Profile Details */}
        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading ? (
                // Detailed Shadow Skeleton for the Profile Info
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div className="skeleton-box" style={{ width: "150px", height: "150px", borderRadius: "50%" }}></div>
                        <div className="profile_name" style={{ marginTop: "15px" }}>
                          <div className="skeleton-box" style={{ width: "200px", height: "24px", marginBottom: "10px" }}></div>
                          <div className="skeleton-box" style={{ width: "120px", height: "16px", marginBottom: "10px" }}></div>
                          <div className="skeleton-box" style={{ width: "250px", height: "16px" }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="skeleton-box" style={{ width: "100px", height: "20px", marginBottom: "10px" }}></div>
                        <div className="skeleton-box" style={{ width: "110px", height: "40px", borderRadius: "4px" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                author && (
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={author.authorImage} alt={author.authorName} />
                          <i className="fa fa-check"></i>

                          <div className="profile_name">
                            <h4>
                              {author.authorName}
                              <span className="profile_username">@{author.tag}</span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text" onClick={copyAddress}>
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>

                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {followers} followers
                          </div>
                          {/* Working Follow Button */}
                          <button className="btn-main" onClick={toggleFollow}>
                            {following ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}

              {/* Tabs + Items Grid */}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={items} loading={loading} />
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