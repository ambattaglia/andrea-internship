import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems";
// 1. IMPORT THE LOCAL BANNER IMAGE
import AuthorBanner from "../images/author_banner.jpg";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const top = document.getElementById("top");
    if (top) top.scrollIntoView({ behavior: "smooth" });

    // Single API call to get all author information and items
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      )
      .then((res) => {
        setAuthor(res.data);
        
        // Map the items array to attach the ownerId and ownerImage
        const itemsWithOwnerData = res.data.nftCollection.map((item) => ({
          ...item,
          ownerId: res.data.authorId,
          ownerImage: res.data.authorImage,
        }));
        
        setItems(itemsWithOwnerData);
        setLoading(false);
      });
  }, [authorId]);

  if (!author) return null;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* Banner - Uses the imported local AuthorBanner image */}
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        {/* Profile */}
        <section aria-label="section">
          <div className="container">
            <div className="row">

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
                        {author.followers} followers
                      </div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs + Items */}
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