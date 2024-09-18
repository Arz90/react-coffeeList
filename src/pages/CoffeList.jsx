// src/pages/CoffeeList.jsx
import { useState, useEffect, useCallback } from 'react';
import CoffeeCard from '../components/CoffeeCard';
import '../styles/CoffeeList.css';

const CoffeeList = () => {
  const [coffees, setCoffees] = useState([]);
  const [filteredCoffees, setFilteredCoffees] = useState([]);
  const [showAvailable, setShowAvailable] = useState(false);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json')
      .then(response => response.json())
      .then(data => {        
        setCoffees(data);
        setFilteredCoffees(data);
      })
      .catch(error => console.error('Error fetching coffee data:', error));
  }, []);

  const filterCoffees = useCallback(() => {
    if (showAvailable) {
      setFilteredCoffees(coffees.filter(coffee => coffee.available));
    } else {
      setFilteredCoffees(coffees);
    }
  }, [showAvailable, coffees]); 

  useEffect(() => {
    filterCoffees();
  }, [filterCoffees]); 

  return (
    <div className="coffee-list-page">
      <h1 className="header">Our Collection</h1>
      <p className="description">
      Introducing our Coffee Collection, a selection of unique coffees from different roast types and origins, expertly roasted in small batches and shipped fresh weekly.
      </p>
      <div className="filter-buttons">
        <button onClick={() => setShowAvailable(false)} className={!showAvailable ? 'active' : ''}>All Products</button>
        <button onClick={() => setShowAvailable(true)} className={showAvailable ? 'active' : ''}>Available Now</button>
      </div>
      <div className="coffee-grid">
        {filteredCoffees.map(coffee => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </div>
    </div>
  );
};

export default CoffeeList;
