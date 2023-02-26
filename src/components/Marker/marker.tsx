import { useContext, useEffect, useState } from "react";
import LocationContext from "../../context/locationContext";

const Marker = (props: any) => {
    const [popup, setPopup] = useState<any>();
    const {
        latitude,
        longitude,
        setLatitude,
        setLongitude,
        setAddressDetails,
        marker,
        setMarker
    } = useContext(LocationContext);

    useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
            setPopup(new google.maps.InfoWindow({
                content: 'Please Drag & Drop me!'
            }))

            handleDragMarker()
        }

        return () => {
            if (marker) marker.setMap(null)
        }
    }, [marker]);

    const handleDragMarker = (event?: any) => {
        if (event) {
            setLatitude(event.latLng.lat());
            setLongitude(event.latLng.lng());
        }

        setTimeout(() => {
            const geocoder = new google.maps.Geocoder();
            const latlng = {
                lat: event?.latLng.lat() ?? latitude,
                lng: event?.latLng.lng() ?? longitude
            }

            geocoder.geocode({ 'latLng': latlng }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    const placeData = results && results[0];
                    const addressDetails = placeData?.address_components;
                    setAddressDetails(addressDetails);
                }
            })
        }, 500);
        props?.map?.setCenter(marker?.getPosition())
    }

    useEffect(() => {
        if (marker) {
            marker.setOptions(props);
            popup?.open({
                anchor: marker,
                shouldFocus: false
            });
            props?.map?.setCenter(marker?.getPosition());
            marker.addListener('dragend', (event) => handleDragMarker(event));
        }
    }, [marker, props])

    return null;
}

export default Marker;