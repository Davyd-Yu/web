import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { plantService } from '../api/api'; 
import { ClipLoader } from 'react-spinners';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from './cartSlice';
import { toast } from "react-toastify";
import imageMap from '../utils/imageMap'; 

const ItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPlant = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await plantService.getPlantById(id); 
                setPlant(data);
            } catch (err) {
                setError('Failed to fetch plant details. Please check the ID or network connection.');
                console.error("Fetch item error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlant();
    }, [id]);

    const handleAddToCart = () => {
        if (plant) {
            const plantToAdd = {
                ...plant,
                price: parseFloat(plant.price),
            };
            dispatch(addToCart(plantToAdd));
            toast.success(`${plant.title} added to cart!`, { position: "bottom-left" });
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <ClipLoader color="#958643" loading={loading} size={50} />
            </div>
        );
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>{error}</div>;
    }

    if (!plant) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Plant not found.</div>;
    }

    return (
        <div className="detail_info">
            <div className='img-box'>
                <img src={imageMap[plant.image]} alt={plant.title} id='img-box' />
            </div>
            <div className='item_detail'>
                <h2 className='item_page_title'>{plant.title}</h2>
                <p className='item_page_price'>Price: ${parseFloat(plant.price).toFixed(2)}</p>
                <p className='item_page_des'>{plant.des}</p>
                <p className='item_page_category'>Category: {plant.category}</p>
                <div className='item_page_btn'>
                    <Button
                        className='secondary-button-item'
                        onClick={handleAddToCart}
                        variant="contained"
                    >
                        Add To Cart
                    </Button>
                    <Button
                        className='secondary-button-item-go-back'
                        onClick={() => navigate(`/catalog`)}
                        variant="outlined"
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;