import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getSpot, editSpot } from "../../store/spots";
import "./editSpot.css";

export default function EditSpot() {
  const { spotId } = useParams(); 
  const spot = useSelector((state) => state.spots.singleSpot);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSpot(spotId));
  }, [dispatch, spotId]);

  const [address, setAddress] = useState(spot.address || '');
  const [city, setCity] = useState(spot.city || '');
  const [state, setState] = useState(spot.state || '');
  const [country, setCountry] = useState(spot.country || '');
  const [lat, setLat] = useState(spot.lat || '');
  const [lng, setLng] = useState(spot.lng || '');
  const [name, setName] = useState(spot.name || '');
  const [description, setDescription] = useState(spot.description || '');
  const [price, setPrice] = useState(spot.price || '');
  const [previewImage, setPreviewImage] = useState(spot.previewImage?.url || '');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setAddress(spot.address || '');
    setCity(spot.city || '');
    setState(spot.state || '');
    setCountry(spot.country || '');
    setLat(spot.lat || '');
    setLng(spot.lng || '');
    setName(spot.name || '');
    setDescription(spot.description || '');
    setPrice(spot.price || '');
    setPreviewImage(spot.previewImage?.url || '');
  }, [spot]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let formErrors = {};

    if (!address) {
      formErrors = { ...formErrors, address: "Streed address is required" };
    }
    if (!country) {
      formErrors = { ...formErrors, country: "Country is required" };
    }
    if (!city) {
      formErrors = { ...formErrors, city: "City is required" };
    }
    if (!state) {
      formErrors = { ...formErrors, state: "State is required" };
    }
    if (!lat) {
      formErrors = { ...formErrors, lat: "Latitude is required" };
    }
    if (!lng) {
      formErrors = { ...formErrors, lng: "Longitude is required" };
    }
    if (!description) {
      formErrors = { ...formErrors, description: "Description is required" };
    }
    if (!name) {
      formErrors = { ...formErrors, name: "Name is required" };
    }
    if (!price) {
      formErrors = { ...formErrors, price: "Price is required" };
    }

    const editedSpot = {
      id: spot.id,
      address,
      city,
      state,
      country,
      lat: 34,
      lng: 833,
      name,
      description,
      price,
      previewImage,
    };

    const response = await dispatch(editSpot({ spotId, spot: editedSpot, previewImage }))
      .then(async (res) => {
        if (res) {
          history.push(`/spots/${res.id}`); 
        }
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && !data.errors) {
          setErrors(data.errors);
        }
      });

    if (response) {
      reset();
    }
  };

  const reset = () => {
    setAddress('');
    setCity('');
    setState('');
    setCountry('');
    setLat('');
    setLng('');
    setName('');
    setDescription('');
    setPrice('');
    setPreviewImage('');
  };

  if (!spot.id) return null;

  return (
        <div className="create-form-inputBox">
      <form className="create-spot-form" onSubmit={handleSubmit}>
        <h1 className="create-spot-header">Update your Spot</h1>
        <div className="create-form-place-located-question">
          <h2>Where's your place located?</h2>
          <p>
            Guests will only get your exact address once they booked a reservation. (Unless they Google it)
          </p>
        </div>
        <div className="create-form-spot-address">
          <label></label>
          <label className="address-label">Country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            name="country"
            placeholder="Country"
            className="create-form-country-address" 
          />
          <div className="create-form-errors">{errors.country}</div>
          <label></label>
          <label className="address-label">Address</label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="Address"
            name="address"
            className="create-form-country-address"
          />
          <div className="create-form-errors">{errors.address}</div>
          <div className="city-state-create-form">
            <div className="city-state-lat-lng-labels"> 
              <div className="address-label-city">City</div>
              <div className="address-label-state">State</div>
            </div>
            <div className="city-state-inputs">
              <input
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                placeholder="City"
                className="create-form-cit-state-lat-lng"
                name="city"
              />
              ,
              <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                name="state"
                placeholder="State"
                className="create-form-cit-state-lat-lng" 
              />
            </div>
          </div>
          <div className="create-form-errors">{errors.city}</div>
          <div className="create-form-errors">{errors.state}</div>
          <div className="lat-long-create-form"> 
            <div className="city-state-lat-lng-labels">
              <div className="address-label-lat">Latitude</div>
              <div className="address-label-lng">Longitude</div>
            </div>
            <input
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              name="lat"
              placeholder="Latitude"
              className="create-form-cit-state-lat-lng" 
            />
            ,
            <input
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              name="lng"
              placeholder="Longitude"
              className="create-form-cit-state-lat-lng" 
            />
          </div>
          <div className="create-form-errors">{errors.lat}</div>
          <div className="create-form-errors">{errors.lng}</div>
        </div>
        <div className="create-form-description-textarea"> 
          <h2>Describe your place to guests</h2>
          <p>
          Mention the best features of your space, this is your chance to wow the guests about why your boba is better than others 😎
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            placeholder="description"
          ></textarea>
          <label className="create-form-errors">{errors.description}</label>
        </div>
        <div className="create-form-spot-name"> 
          <h2>Create a title for your spot</h2>
          <p>
            Name of your boba spot. The punnier the better.
          </p>
          <input
            className="create-spot-name-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="name"
          ></input>
          <label className="create-form-errors">{errors.name}</label>
        </div>
        <div className="create-form-spot-price">
          <h2>Set a base price for your spot</h2>
          <p>
            Competitive pricing can help your listing stand out and rank higher in
            search results.
          </p>
          <label>$</label>
          <input
            className="create-spot-price-field"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            placeholder="price"
          ></input>
          <label className="create-form-errors">{errors.price}</label>
        </div>
        <div className="button-div">
          <button className="create-form-submit-button" type="submit">
            Update Spot
          </button>
        </div>
      </form>
    </div>
  );
}
