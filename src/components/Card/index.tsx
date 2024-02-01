import { Link } from "react-router-dom";
import "./styles.scss";

type CardProps = {
  code: string;
  title: string;
  description: string;
  images: string[];
};

const Card = ({ title, code, description, images }: CardProps) => {
  return (
    <div className="card">
      <img className="card-img-top" src={images[0]} alt="Imagem do post" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description.substring(0, 100)}...</p>
        <Link to={`${code}`} className="btn btn-primary">
          Ver post
        </Link>
      </div>
    </div>
  );
};

export default Card;
