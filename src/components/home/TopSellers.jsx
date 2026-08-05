import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((res) => {
        setSellers(res.data);
        setLoading(false);
      });
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">

          {/* Title */}
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {/* List */}
          <div className="col-md-12">
            <ol className="author_list">

              {/* Skeleton */}
              {loading &&
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp skeleton-box"
                      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    ></div>

                    <div className="author_list_info">
                      <div className="skeleton-box"
                        style={{ width: "120px", height: "20px", marginBottom: "6px" }}
                      ></div>
                      <div className="skeleton-box"
                        style={{ width: "60px", height: "15px" }}
                      ></div>
                    </div>
                  </li>
                ))}

              {/* API DATA */}
              {!loading &&
                sellers.map((seller) => (
                  <li key={seller.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt={seller.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>
                        {seller.authorName}
                      </Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>
                ))}

            </ol>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TopSellers;
