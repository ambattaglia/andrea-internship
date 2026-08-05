import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      });
  }, []);

  const options = {
    loop: true,
    margin: 15,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 },
    },
  };

  return (
    <section id="section-new-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>

        {loading ? (
          <div className="row">
            {new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                <div
                  className="nft__item skeleton-box"
                  style={{ height: "300px", borderRadius: "10px" }}
                ></div>
              </div>
            ))}
          </div>
        ) : (
          <OwlCarousel className="owl-theme" {...options}>
            {items.map((item) => (
              <div className="item" key={item.id}>
                <div className="nft__item">
                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${item.id}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title}
                      />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.id}`}>
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
            ))}
          </OwlCarousel>
        )}
      </div>
    </section>
  );
};

export default NewItems;
