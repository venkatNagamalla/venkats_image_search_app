import { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import Tab from "../Tab";
import Card from "../Card";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const tabsList = [
  {
    tabId: "MOUNTAINS",
    displayText: "Mountains",
  },
  {
    tabId: "FLOWERS",
    displayText: "Flowers",
  },
  {
    tabId: "BEACHES",
    displayText: "Beaches",
  },
  {
    tabId: "CITIES",
    displayText: "Cities",
  },
];

const MainContainer = () => {
  const [search, setSearch] = useState(tabsList[0].tabId.toLowerCase());
  const [inputSearch, setInputSearch] = useState("");
  const [page, setPage] = useState(1);
  const [imageDetails, setImageDetails] = useState({
    imagesData: [],
    apiStatus: apiStatusConstants.initial,
    totalPages:0
  });

  const updateTabSearch = (id) => {
    setSearch(id.toLowerCase());
  };

  const onSearch = () => {
    if (inputSearch !== "") {
      setSearch(inputSearch);
    }
  };

  const onPageDecrement = () => {
    if(page>1){
      setPage(prevPageCount => prevPageCount-1)
    }
  }

  const onPageIncrement = () => {
    if(page < imageDetails.totalPages){
      setPage(prevPageCount => prevPageCount+1)
    }
  }

  const modify = (obj) => ({
    id: obj.id,
    image: obj.urls.small,
    description: obj.description,
    link: obj.links.download,
    alternateDesc: obj.alt_description,
  });

  const getImages = async () => {
    setImageDetails({ apiStatus: apiStatusConstants.inProgress });
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${search}&client_id=_gL_oFlwWEXtrht9DY1foRf9fZbbvN9Kmrd0pnROR7M`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const updatedData = data.results.map((eachImg) => modify(eachImg));
      setImageDetails({
        imagesData: updatedData,
        apiStatus: apiStatusConstants.success,
        totalPages:data.total_pages
      });
    } else {
      setImageDetails({ apiStatus: apiStatusConstants.failure });
    }
  };

  useEffect(() => {
    getImages();
  }, [search,page]);

  const renderLoaderView = () => (
    <div className="container">
      <PropagateLoader color="#4F6F52" />
    </div>
  );

  const renderFailureView = () => (
    <div className="container">
      <h1 className="error-msg">Please try again!</h1>
      <button className="retry-btn" onClick={getImages} type="button">
        Retry
      </button>
    </div>
  );

  const renderSuccessView = () => (
    <ul className="images-container">
      {imageDetails.imagesData.map((eachImg) => (
        <Card key={eachImg.id} imageDetails={eachImg} />
      ))}
    </ul>
  );



  const renderResult = () => {
    switch (imageDetails.apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoaderView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.success:
        return renderSuccessView();

      default:
        return null;
    }
  };

  return (
    <div>
      <header className="top-section">
        <h1 className="main-heading">Image Search App</h1>
        <section className="input-container">
          <input
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            type="search"
            placeholder="Search"
          />
          <button onClick={onSearch} className="search-btn" type="button">
            Search
          </button>
        </section>
      </header>

      <section className="tab-section-container">
        <ul className="tabs-container">
          {tabsList.map((eachTab) => (
            <Tab
              key={eachTab.tabId}
              changeTab={updateTabSearch}
              tabDetails={eachTab}
              activeTab={search}
            />
          ))}
        </ul>
      </section>
      <section className="text-container">
        <p className="text">{search}</p>
        <hr />
      </section>
      <article className="bottom-section">
        <section>{renderResult()}</section>
      </article>
      <footer className='footer'>
         <div>
            <button onClick={onPageDecrement} type="button" className="btn">-</button>
            <p className='page'>{imageDetails.totalPages}</p>
            <button onClick={onPageIncrement} type="button" className='btn'>+</button>
         </div>
      </footer>
    </div>
  );
};

export default MainContainer;
