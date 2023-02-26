import { createContext } from "react";

export interface ILocationContext {
    latitude: number;
    setLatitude: (arg: number) => void;
    longitude: number;
    setLongitude: (arg: number) => void;
    marker: any
    setMarker: (arg: any) => void;
    isFullScreen: boolean
    setIsFullScreen: (arg: boolean) => void;
    addressDetails: any;
    setAddressDetails: (arg: any) => void;
}

const LocationContext = createContext<ILocationContext>({} as ILocationContext);

export default LocationContext;