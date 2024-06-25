import { Link } from "react-router-dom";
import "./styles.scss";

type CardProps = {
  code: string;
  title: string;
  description: string;
  images: string[];
  foto?: string;
  link?: string;
  price?: string;
};

const Card = ({ title, link, description, foto }: CardProps) => {
  return (
    <div className="card">
      <img
        className="card-img-top"
        src={
          foto
            ? foto
            : "https://static3.depositphotos.com/1000138/101/i/450/depositphotos_1018082-stock-photo-empty-room.jpg"
        }
        alt="Imagem do post"
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {/* <p className="card-text">{description}</p> */}
        <a
          style={{
            width: "100%",
          }}
          href={link}
          target="_black"
          className="btn btn-primary"
        >
          Ver
        </a>
      </div>
    </div>
  );
};

export default Card;
