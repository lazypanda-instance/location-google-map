import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { useContext } from 'react';
import LocationContext from '../../context/locationContext';
import Address from '../AddressDetails';
import InteractiveMap from '../InteractiveMap';
import Marker from '../Marker';
import SearchBar from '../SearchBar';
import './location.css';

const Location = () => {
    const {
        latitude,
        setLatitude,
        longitude,
        setLongitude,
        addressDetails,
        setAddressDetails
    } = useContext(LocationContext);

    const render = (status: Status) => {
        return <h1>{status}</h1>
    }

    const center = { lat: latitude, lng: longitude };
    const zoom = 15;

    return (
        <div className='root'>
            <Wrapper
                apiKey='*** Your Google Map Key ***'
                libraries={['places']}
                render={render}>

                <p>Search Bar</p>
                <SearchBar
                    apiKey='*** Your Google Map Key ***'
                    onPlaceSelected={(selectedPlace: any) => {
                        console.log('selectedPlace: ', selectedPlace)
                        const lat = selectedPlace?.geometry.location.lat() || parseFloat(selectedPlace.name.split(',')[0].trim());
                        const lng = selectedPlace?.geometry.location.lng() || parseFloat(selectedPlace.name.split(',')[0].trim());
                        const geocoder = new google.maps.Geocoder();
                        const latlng = { lat, lng };

                        geocoder.geocode({ 'latLng': latlng }, (result, status) => {
                            if (status === google.maps.GeocoderStatus.OK) {
                                const placeData = result && result[0];
                                const addressDetails = placeData?.address_components;
                                setAddressDetails(addressDetails);
                            }
                        });
                        setLatitude(lat);
                        setLongitude(lng);
                    }}
                    options={{
                        componentRestrictions: { country: 'IN' }
                    }} />

                <div className='locationContainer'>
                    <div>
                        <p>Address details</p>
                        <Address address={addressDetails} />
                    </div>
                    <div>
                        <p>Interactive Map</p>
                        <InteractiveMap center={center} zoom={zoom} mapTypeId={'roadMap'}>
                            <Marker position={center} draggable={true}></Marker>
                        </InteractiveMap>
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default Location;