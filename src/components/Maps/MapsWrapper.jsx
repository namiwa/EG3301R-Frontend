import React from "react";

import SidePanelMaps from "./SidePanelMaps";
import LatLngProvider from "./LatLngProvider";

export default function MapsWrapper() {
  return (
    <LatLngProvider>
      <SidePanelMaps />
    </LatLngProvider>
  );
}
