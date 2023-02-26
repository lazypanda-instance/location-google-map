import React, { ReactElement, useContext, useEffect, useMemo, useRef, useState } from "react";
import LocationContext from "../../context/locationContext";
import './interactiveMap.css';

type Props = {
    center: any,
    zoom: number,
    mapTypeId: string,
    children: ReactElement
}

const InteractiveMap = (props: Props) => {

    const { center, zoom, mapTypeId, children } = props;
    const {
        latitude,
        longitude,
        setLatitude,
        setLongitude,
        addressDetails,
        setAddressDetails,
        setIsFullScreen,
        isFullScreen
    } = useContext(LocationContext);

    const ref = useRef(null);
    const [map, setMap] = useState();


    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center,
                zoom,
                streetViewControl: false,
                mapTypeControl: false,
                controlSize: 30
            }))
        }
    }, [ref, map]);

    return (
        <>
            <div ref={ref} className='mapContainer' id='map'></div>

            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { map })
                }
            })}
        </>
    );
}

export default InteractiveMap;