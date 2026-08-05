import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Helper component for the countdown timer on the cards
const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiryDate) return;

    const calculateTimeLeft = () => {
      const distance = expiryDate - Date.now();

      if (distance < 0) {
        setTimeLeft("Expired");
      } else {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!expiryDate) return null;
  return <div className="de_countdown">{timeLeft}</div>;
};

const ExploreItems = ({ items, loading, filter, onFilterChange }) => {
  const [visibleItemsCount, setVisibleItemsCount] = useState(8);

  const loadMore = () => {
    setVisibleItemsCount((prevCount) => prevCount + 4);
  };

  useEffect(() => {
    setVisibleItemsCount(8);
  }, [items]);

  return (
    <>
      <div className="col-md-12">
        <div className="items_filter">
          <select id="filter-items" value={filter} onChange={onFilterChange}>
            <option value="all">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
      </div>

      {loading ? (
        // Detailed Shadow Skeleton loading
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
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
        items.slice(0, visibleItemsCount).map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
            data-aos="flip-up" /* Changed zoom-in-up to flip-up */
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}

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

              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`}>
                  <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {!loading && visibleItemsCount < items.length && (
        <div className="col-md-12 text-center">
          <button onClick={loadMore} id="loadmore" className="btn-main g-color">
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;