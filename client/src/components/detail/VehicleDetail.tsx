// Shows the full technical specifications of a single Star Wars vehicle.
// Vehicles are ground or air transport that cannot travel through hyperspace
// (e.g. AT-AT walkers, Sand Crawlers, Speeder Bikes).

import type { SwapiVehicle } from '../../types/swapi';
import { DetailField } from './DetailField';
import styles from './DetailGrid.module.css';

interface VehicleDetailProps {
  vehicle: SwapiVehicle;
}

export function VehicleDetail({ vehicle }: VehicleDetailProps) {
  return (
    <dl className={styles.grid}>
      <DetailField label="Model" value={vehicle.model} />
      <DetailField label="Class" value={vehicle.vehicle_class} />
      <DetailField label="Manufacturer" value={vehicle.manufacturer} />
      {/* Format large credit amounts with commas for readability */}
      <DetailField label="Cost" value={vehicle.cost_in_credits !== 'unknown' ? `${Number(vehicle.cost_in_credits).toLocaleString()} credits` : 'Unknown'} />
      <DetailField label="Length" value={`${vehicle.length} m`} />
      <DetailField label="Crew" value={vehicle.crew} />
      <DetailField label="Passengers" value={vehicle.passengers} />
      <DetailField label="Cargo Capacity" value={vehicle.cargo_capacity} />
      <DetailField label="Max Speed" value={vehicle.max_atmosphering_speed} />
      <DetailField label="Consumables" value={vehicle.consumables} />
      <DetailField label="Films" value={vehicle.films} />
      <DetailField label="Pilots" value={vehicle.pilots} />
    </dl>
  );
}
