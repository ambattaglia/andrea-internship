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

    calculateTimeLeft(); // Run immediately
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

  // Reset pagination count back to 8 when new filtered items are loaded
  useEffect(() => {
    setVisibleItemsCount(8);
  }, [items]);

  return (
    <>
      {/* Styled Filter Dropdown */}
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
        // Render Skeletons when Loading
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div
              className="nft__item skeleton-box"
              style={{ height: "380px", borderRadius: "10px" }}
            ></div>
          </div>
        ))
      ) : (
        // Render Items from props
        items.slice(0, visibleItemsCount).map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              {/* Author Avatar */}
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

              {/* Countdown Timer */}
              {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}

              {/* NFT Image */}
              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
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

              {/* Details Info */}
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

      {/* Load More Button */}
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
