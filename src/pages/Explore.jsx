import React, { useEffect, useState } from "react";
import ExploreItems from "../components/explore/ExploreItems";
import SubHeader from "../images/subheader.jpg";

const Explore = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItems("all");
  }, []);

  const fetchItems = (filterType) => {
    setLoading(true);

    
    const url = filterType === "all"
      ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
      : `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterType}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  };

  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setFilter(selected);
    fetchItems(selected);
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">

              {/* ITEMS SECTION (Now includes the styled filter dropdown inside it) */}
              <ExploreItems 
                items={items} 
                loading={loading} 
                filter={filter} 
                onFilterChange={handleFilterChange} 
              />

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
