import { EMISSION_FACTORS } from '../constants/emissionFactors';
import { EmissionsRecord } from '../../../shared/types';

/**
 * Calculates CO2e (in Tonnes) based on intensity metrics and revenue
 */
export const calculateEmissions = (record: Partial<EmissionsRecord>, revenue_cr: number) => {
  // We assume the inputs are intensities per CR, but the prompt says the UI enters absolute?
  // Wait, the prompt says "emissions_records (per ₹ crore revenue — intensity-based)"
  // Let's assume the DB stores intensity, so the input is intensity or we calculate it before storing.
  // The Prompt: Table 2: electricity_mwh_per_cr
  // So DB stores MWh per Cr.
  
  // Calculate Scope 1 (Total Tonnes CO2e = (MWh/Cr * Cr) * factor_per_unit )
  // Wait, 1 MWh = 1000 kWh. 
  const electricity_kwh = (record.electricity_mwh_per_cr || 0) * 1000 * revenue_cr;
  const scope1_elec = (electricity_kwh * EMISSION_FACTORS.scope1.electricity_grid_kwh) / 1000; // in Tonnes

  const diesel_l = (record.diesel_litres_per_cr || 0) * revenue_cr;
  const scope1_diesel = (diesel_l * EMISSION_FACTORS.scope1.diesel_litre) / 1000;

  const lpg_kg = (record.lpg_kg_per_cr || 0) * revenue_cr;
  const scope1_lpg = (lpg_kg * EMISSION_FACTORS.scope1.lpg_kg) / 1000;

  const petrol_l = (record.petrol_litres_per_cr || 0) * revenue_cr;
  const scope1_petrol = (petrol_l * EMISSION_FACTORS.scope1.petrol_litre) / 1000;

  const total_co2e_scope1 = scope1_elec + scope1_diesel + scope1_lpg + scope1_petrol;

  // Calculate Scope 2
  const steam_gj = (record.purchased_steam_gj_per_cr || 0) * revenue_cr;
  const scope2_steam = (steam_gj * EMISSION_FACTORS.scope2.purchased_steam_gj) / 1000;
  const total_co2e_scope2 = scope2_steam;

  // Calculate Scope 3
  const travel_km = (record.business_travel_km_per_cr || 0) * revenue_cr;
  const scope3_travel = (travel_km * EMISSION_FACTORS.scope3.road_travel_km_per_person) / 1000;
  const total_co2e_scope3 = scope3_travel;

  return {
    total_co2e_scope1,
    total_co2e_scope2,
    total_co2e_scope3
  };
};
