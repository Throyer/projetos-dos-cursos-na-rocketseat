import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';

import { Landing } from "./pages/landing";
import { OrphanagesMap } from "./pages/orphanages-map";
import { CreateOrphanage } from "./pages/create-orphanage";
import { Orphanage } from "./pages/orphanage";

export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<OrphanagesMap />} />
        <Route path="/orphanages/create" element={<CreateOrphanage />} />
        <Route path="/orphanages/:orphanage_id" element={<Orphanage />} />
      </ReactRoutes>
    </BrowserRouter>
  )
} 