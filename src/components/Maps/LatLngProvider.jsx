import React from 'react';

export const LatLngContext = React.createContext();

export function LatLngProvider({ children }) {
  const [currentLatLng, setCurrentLatLng] = React.useState({
    lat: 20.5937,
    lng: 78.9629,
  });

  return (
    <LatLngContext.Provider value={{ currentLatLng, setCurrentLatLng }}>
      {children}
    </LatLngContext.Provider>
  );
}

export default LatLngProvider;
