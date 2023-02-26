import { useState } from 'react'
import './App.css'
import Location from './components/Location'
import LocationContext, { ILocationContext } from './context/locationContext'

function App() {

  const [latitude, setLatitude] = useState(22.9065254);
  const [longitude, setLongitude] = useState(88.3940619);
  const [marker, setMarker] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [addressDetails, setAddressDetails] = useState({});

  const locationContextProviderValue: ILocationContext = {
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    marker,
    setMarker,
    isFullScreen,
    setIsFullScreen,
    addressDetails,
    setAddressDetails
  }

  return (
    <div className="App">
      <LocationContext.Provider value={locationContextProviderValue}>
        <Location />
      </LocationContext.Provider>
    </div>
  )
}

export default App
