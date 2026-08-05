import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ items, loading }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">

          {loading ? (
            // Detailed Shadow Skeleton loading matching the loaded card shape
            new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div className="skeleton-box" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="skeleton-box" style={{ width: "100%", height: "200px" }}></div>
                  </div>
                  <div className="nft__item_info" style={{ marginTop: "15px" }}>
                    <div className="skeleton-box" style={{ width: "120px", height: "20px", marginBottom: "10px" }}></div>
                    <div className="skeleton-box" style={{ width: "60px", height: "15px" }}></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Dynamic items from API
            items.map((item) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={item.id}
              >
                <div className="nft__item">

                  {/* Owner */}
                  <div className="author_list_pp">
                    <Link to={`/author/${item.ownerId}`}>
                      <img className="lazy" src={item.ownerImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  {/* NFT Image */}
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <a href="#" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <a href="#" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <a href="#">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title}
                      />
                    </Link>
                  </div>

                  {/* Info */}
                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>

                    <div className="nft__item_price">
                      {item.price} ETH
                    </div>

                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default AuthorItems;