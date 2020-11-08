import React from 'react';

import SidePanelMaps from './SidePanelMaps';
import LatLngProvider from './LatLngProvider';

export default function MapsWrapper() {
  const panel_ref = React.createRef(null);
  return (
    <LatLngProvider>
      <SidePanelMaps ref={panel_ref} />
    </LatLngProvider>
  );
}
