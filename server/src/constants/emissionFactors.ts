export const EMISSION_FACTORS = {
  // SCOPE 1 — Direct (kg CO2e per unit)
  scope1: {
    electricity_grid_kwh: 0.71,        // kgCO2e/kWh — CEA India national grid 2023
    diesel_litre: 2.68,                // kgCO2e/litre — IPCC AR5 / MoEFCC
    lpg_kg: 1.56,                      // kgCO2e/kg
    petrol_litre: 2.31,                // kgCO2e/litre
    png_scm: 2.00,                     // kgCO2e/SCM (piped natural gas)
    coal_tonne: 2390,                  // kgCO2e/tonne
    furnace_oil_litre: 3.15,           // kgCO2e/litre
  },
  // SCOPE 2 — Indirect energy
  scope2: {
    purchased_electricity_kwh: 0.71,   // Same as grid factor
    purchased_steam_gj: 56.1,          // kgCO2e/GJ (natural gas boiler)
  },
  // SCOPE 3 — Value chain (simplified)
  scope3: {
    air_travel_km_per_person: 0.255,   // kgCO2e/km/passenger (economy)
    road_travel_km_per_person: 0.14,   // kgCO2e/km/passenger
    freight_road_tonne_km: 0.062,      // kgCO2e/tonne-km
  }
};

export const FACTOR_SOURCES = {
  grid: 'https://cea.nic.in',
  ghg_protocol: 'https://ghgprotocol.org/corporate-value-chain-standard',
  ipcc: 'https://www.ipcc.ch/report/ar6-wg1/',
  brsr: 'https://www.sebi.gov.in/legal/circulars/may-2021/business-responsibility-and-sustainability-reporting-by-listed-entities_50032.html',
  bee_india: 'https://beeindia.gov.in',
};
