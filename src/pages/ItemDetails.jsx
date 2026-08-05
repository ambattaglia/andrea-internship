import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ItemDetails = () => {
  // 1. EXTRACT 'nftId' TO MATCH APP.JS (/:nftId)
  const { nftId } = useParams(); 
  const [item, setItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // 2. FETCH USING 'nftId'
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      )
      .then((res) => {
        setItem(res.data);
      });
  }, [nftId]);

  if (!item) return null;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">

              {/* IMAGE */}
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>

              {/* DETAILS */}
              <div className="col-md-6">
                <div className="item_info">

                  <h2>{item.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>

                  <p>{item.description}</p>

                  {/* OWNER */}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img className="lazy" src={item.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.ownerId}`}>
                            {item.ownerName}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CREATOR */}
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.creatorId}`}>
                            <img
                              className="lazy"
                              src={item.creatorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.creatorId}`}>
                            {item.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    {/* PRICE */}
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={item.tokenImage} alt="" />
                      <span>{item.price}</span>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ItemDetails;