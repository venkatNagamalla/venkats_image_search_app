import { IoMdDownload } from "react-icons/io";
import "./index.css";

const Card = (props) => {
  const { imageDetails } = props;
  const { image, description, alternateDesc, link } = imageDetails;
  return (
    <li className="card">
      <img className="card-img" src={image} alt={alternateDesc} />
      <div className="desc-container">
        <a href={link} target="_blank">
          download  <IoMdDownload/>
        </a>
        <p className='desc'>{description}</p>
      </div>
    </li>
  );
};

export default Card;
