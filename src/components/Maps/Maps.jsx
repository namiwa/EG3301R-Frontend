import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxOption,
} from '@reach/combobox';
import { makeStyles } from '@material-ui/core/styles';
import '@reach/combobox/styles.css';

import './Map.css';
import { LatLngContext } from './LatLngProvider';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'absolute',
  },
  mapTitle: {
    textAlign: 'center',
    marginTop: 45,
    marginLeft: 230,
  },
  placesSearch: {
    position: 'absolute',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 400,
    zIndex: 10,
    marginLeft: 330,
  },
});

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

// India as center
const center = {
  lat: 20.5937,
  lng: 78.9629,
};
// can import custom stles
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ['places'];

export const Maps = React.forwardRef((props, ref) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const { setCurrentLatLng } = React.useContext(LatLngContext);
  const classes = useStyles();

  const onMapClick = React.useCallback(
    (event) => {
      setMarkers(() => [
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date(),
        },
      ]);
      setCurrentLatLng(() => ({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      }));
    },
    [setCurrentLatLng],
  );

  //reference to map instance
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return 'Error Loading Maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <div className={classes.root} ref={ref}>
      <Search panTo={panTo} className={classes.placesSearch} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </GoogleMap>
    </div>
  );
});

const Search = ({ panTo, className }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 20.5937, lng: () => 78.9629 },
      radius: 200 * 1000,
    },
  });

  return (
    <div className={className}>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();

          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (error) {
            console.log(error);
          }

          console.log(address);
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder={'Enter Location'}
        />
        <ComboboxPopover>
          {status === 'OK' &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id + description} value={description} />
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default Maps;
