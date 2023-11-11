import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useTheme from '../Context/theme';
import { useApiData } from '../Context/API/ApiProvider';

const MyMap = () => {
  const { themeMode } = useTheme();
  const { mapData } = useApiData();
  const [map, setMap] = useState(null);

  useEffect(() => {
    // console.log(mapData.forEach((e)=>{e.latitude}));
    mapboxgl.accessToken = 'pk.eyJ1IjoiZm94MiIsImEiOiJjbG9lN3Y0dnkwZnIyMmtxcHRmYXVobjFoIn0.nFMYY_W2-17MdoaQXM3ytw';

    const newMap = new mapboxgl.Map({
      container: 'map',
      center: [-90.96, -1.47],
      zoom: 1.2,
      style: themeMode === 'dark' ? 'mapbox://styles/mapbox/light-v10' : 'mapbox://styles/mapbox/dark-v10',
    });

    setMap(newMap);
    console.log("Map Initialization", newMap)
    
    
    newMap.on('load', () => {
      if (newMap && mapData && Array.isArray(mapData)) {
        console.log(JSON.stringify(mapData, null, 2)) ;
        newMap.addSource('points', {
          type: 'geojson',
          data: { 
            type: 'FeatureCollection',
            features: mapData.map((location) => {
              if (location && typeof location.latitude !== 'undefined' && typeof location.longitude !== 'undefined') {
                return {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: [location.latitude, location.longitude],
                  },
                };
              }
              return null;
            }).filter(Boolean), // Remove any null values from the array
          },
        });

        newMap.addLayer({
          id: 'circle',
          type: 'circle',
          source: 'points',
          paint: {
            'circle-color': '#4264fb',
            'circle-radius': 4,
            'circle-stroke-width': 0.5,
            'circle-stroke-color': '#ffffff',
          },
        });

        newMap.on('click', 'circle', (e) => {
          newMap.flyTo({
            center: e.features[0].geometry.coordinates,
          });
        });

        newMap.on('mouseenter', 'circle', () => {
          newMap.getCanvas().style.cursor = 'pointer';
        });

        newMap.on('mouseleave', 'circle', () => {
          newMap.getCanvas().style.cursor = '';
        });
      }
    });

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [themeMode, mapData]);

  return (
    <div id="map" style={{ width: '100%', height: '400px', backgroundColor: 'rgba(46, 47, 66, 1)', padding: '20px' }}></div>
  );
};

export default MyMap;
