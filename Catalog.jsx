import React, { useEffect } from 'react';
import { plantService } from '../api/api';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Button from '@mui/material/Button';
import { AiOutlineSearch } from "react-icons/ai";
import imageMap from '../utils/imageMap';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryFilter, setSearchQuery, clearAllFilters } from '../Components/filterSlice';
import { useState } from 'react'; 

function Catalog() {
    const categoryFilter = useSelector((state) => state.filters.categoryFilter);
    const searchQuery = useSelector((state) => state.filters.searchQuery);
    const dispatch = useDispatch(); 

    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const availableCategories = ["Normal", "Post", "Baby"];

    useEffect(() => {
        const fetchPlants = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await plantService.getAllPlants({
                    category: categoryFilter,
                    search: searchQuery
                });
                setPlants(data);
            } catch (err) {
                setError('Failed to fetch plants. Please try again later.');
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlants();
    }, [categoryFilter, searchQuery]); 

    const handleCategoryButtonClick = (category) => {
        dispatch(setCategoryFilter(categoryFilter === category ? '' : category));
    };

    const handleSearchInputChange = (event) => {
        dispatch(setSearchQuery(event.target.value));
    };

    const handleClearAll = () => {
        dispatch(clearAllFilters());
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ClipLoader color="#958643" loading={loading} size={50} />
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="catalog-page">
            <h1>Our Catalog</h1>

            <div className="filters-search-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search plants..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <AiOutlineSearch className="search-icon" />
                </div>

                <div className="buttons-container">
                    <Button
                        onClick={() => handleCategoryButtonClick('')}
                        variant={categoryFilter === '' ? "contained" : "outlined"}
                        sx={{ margin: '5px', backgroundColor: categoryFilter === '' ? '#958643' : 'transparent', color: categoryFilter === '' ? 'white' : '#958643', borderColor: '#958643' }}
                    >
                        All
                    </Button>
                    {availableCategories.map((category) => (
                        <Button
                            key={category}
                            onClick={() => handleCategoryButtonClick(category)}
                            variant={categoryFilter === category ? "contained" : "outlined"}
                            sx={{ margin: '5px', backgroundColor: categoryFilter === category ? '#958643' : 'transparent', color: categoryFilter === category ? 'white' : '#958643', borderColor: '#958643' }}
                        >
                            {category}
                        </Button>
                    ))}
                    <Button
                        onClick={handleClearAll}
                        variant="contained"
                        sx={{ margin: '5px', backgroundColor: '#958643', color: 'white' }}
                    >
                        Clear All
                    </Button>
                </div>
            </div>

            <div className="items-container">
                {plants.length > 0 ? (
                    plants.map(plant => (
                        <div key={plant.id} className="work-section-info">
                            <div className="info-boxes-img-container">
                                <img src={imageMap[plant.image]} className="image_catal" alt={plant.title} />
                            </div>
                            <h2>{plant.title}</h2>
                            <p>${parseFloat(plant.price).toFixed(2)}</p>
                            <p className="category">Category: {plant.category}</p>
                            <Link to={`/item/${plant.id}`} state={{ detail: plant }}>
                                <Button variant="contained" sx={{ mt: 1 }}>View Details</Button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No plants found matching your criteria.</p>
                )}
            </div>
        </div>
    );
}

export default Catalog;