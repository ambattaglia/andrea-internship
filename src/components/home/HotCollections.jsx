import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((res) => {
        setCollections(res.data);
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center" data-aos="fade-in">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>

        {loading ? (
          <div className="row">
            {new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap skeleton-box" style={{ height: "200px" }}></div>
                  <div className="nft_coll_pp skeleton-box"></div>
                  <div className="nft_coll_info">
                    <div className="skeleton-box" style={{ width: "100px", height: "20px" }}></div>
                    <div className="skeleton-box" style={{ width: "60px", height: "15px" }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <OwlCarousel className="owl-theme" {...options} data-aos="fade-left">
            {collections.map((item) => (
              <div className="item" key={item.id}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img src={item.nftImage} className="lazy img-fluid" alt={item.title} />
                    </Link>
                  </div>

                  <div className="nft_coll_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img src={item.authorImage} className="lazy pp-coll" alt={item.title} />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>

                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{item.title}</h4>
                    </Link>
                    <span>ERC-{item.code}</span>
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

export default HotCollections;