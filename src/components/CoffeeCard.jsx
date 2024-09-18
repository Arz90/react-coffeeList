// src/components/CoffeeCard.jsx
import PropTypes from "prop-types";
import "../styles/CoffeeCard.css";
import emptyStar from "../assets/icons/Star.svg";
import filledStar from "../assets/icons/Star_fill.svg";

const CoffeeCard = ({ coffee }) => {
  const { image, name, price, rating, votes, available, popular } = coffee;

  // Elimina el símbolo de dólar y convierte el precio a número
  const formattedPrice = price
    ? parseFloat(price.replace(/^\$/, "")).toFixed(2) // Elimina el símbolo de dólar y formatea el precio
    : "N/A";

  const starIcon = votes > 0 ? filledStar : emptyStar;

  return (
    <div className={`coffee-card ${available ? "" : "unavailable"}`}>
      <div className="coffee-image-container">
        {popular && <span className="popular-tag">Popular</span>}
        <img src={image} alt={name} className="coffee-image" />
      </div>
      <div className="coffee-info">
        <div className="coffee-name-price">
          <h3 className="coffee-name">{name}</h3>
          <p className="coffee-price">${formattedPrice}</p>
        </div>
        <div className="coffee-rating">
          <img
            src={starIcon}
            alt={votes > 0 ? "Voted" : "Not Voted"}
            className="vote-star"
          />
          <span className="rating-value">{rating}</span>
          <span className={votes ? "votes has-votes" : "votes no-votes"}>
            {votes ? `(${votes} votos)` : "No rating"}
          </span>
        {!available && <span className="unavailable-tag">Sold out</span>}
          {/* <span className="votes">{votes ? `(${votes} votos)` : 'No rating'}</span> */}
        </div>
      </div>
    </div>
  );
};

CoffeeCard.propTypes = {
  coffee: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired, // Cambiado a string ya que contiene el símbolo de dólar
    rating: PropTypes.number.isRequired,
    votes: PropTypes.number,
    available: PropTypes.bool.isRequired,
    popular: PropTypes.bool,
  }).isRequired,
};

export default CoffeeCard;
