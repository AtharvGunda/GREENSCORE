import { calculateGreenScore } from './services/scoringAlgorithm.service';
import { calculateEmissions } from './services/carbonEngine.service';
import { EmissionsRecord, SectorBenchmark } from '../../shared/types';

interface TestCompany {
  name: string;
  sector: string;
  revenue: number;
  record: Partial<EmissionsRecord>;
  expected_co2e: number;
  expected_score: number;
}

const SECTOR_BENCHMARKS: Record<string, any> = {
  'Textile & Apparel': { id: '', sector: 'Textile & Apparel', avg_electricity_mwh_per_cr: 45, avg_diesel_litres_per_cr: 120, avg_water_kl_per_cr: 1400, avg_waste_t_per_cr: 2.2, avg_renewable_pct: 5, avg_greenscore: 55.6, data_source: 'Excel' },
  'Food Processing': { id: '', sector: 'Food Processing', avg_electricity_mwh_per_cr: 50, avg_diesel_litres_per_cr: 150, avg_water_kl_per_cr: 700, avg_waste_t_per_cr: 1.5, avg_renewable_pct: 6, avg_greenscore: 55.6, data_source: 'Excel' },
  'Auto Parts': { id: '', sector: 'Auto Parts', avg_electricity_mwh_per_cr: 60, avg_diesel_litres_per_cr: 200, avg_water_kl_per_cr: 800, avg_waste_t_per_cr: 2.2, avg_renewable_pct: 8, avg_greenscore: 55.6, data_source: 'Excel' },
  'Logistics': { id: '', sector: 'Logistics', avg_electricity_mwh_per_cr: 10, avg_diesel_litres_per_cr: 4000, avg_water_kl_per_cr: 200, avg_waste_t_per_cr: 0.5, avg_renewable_pct: 4, avg_greenscore: 55.6, data_source: 'Excel' },
  'IT Services': { id: '', sector: 'IT Services', avg_electricity_mwh_per_cr: 15, avg_diesel_litres_per_cr: 50, avg_water_kl_per_cr: 140, avg_waste_t_per_cr: 0.22, avg_renewable_pct: 10, avg_greenscore: 55.6, data_source: 'Excel' },
  'Chemical': { id: '', sector: 'Chemical', avg_electricity_mwh_per_cr: 70, avg_diesel_litres_per_cr: 800, avg_water_kl_per_cr: 3000, avg_waste_t_per_cr: 4.5, avg_renewable_pct: 8, avg_greenscore: 55.6, data_source: 'Excel' },
};

const TEST_COMPANIES: TestCompany[] = [
  {
    name: 'Vardhman Textiles Ltd',
    sector: 'Textile & Apparel',
    revenue: 9800.0,
    record: {
      electricity_mwh_per_cr: 38.0,
      diesel_litres_per_cr: 520.0,
      lpg_kg_per_cr: 180.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 1200.0,
      water_withdrawal_kl_per_cr: 1100.0,
      water_recycled_pct: 62.0,
      wastewater_treated_pct: 88.0,
      waste_generated_t_per_cr: 1.8,
      hazardous_waste_pct: 6.0,
      waste_recycled_pct: 72.0,
      renewable_energy_pct: 28.0,
      has_env_policy: true,
      has_reduction_targets: true,
      third_party_verified: true
    },
    expected_co2e: 1808.0,
    expected_score: 81.4
  },
  {
    name: 'Arvind Ltd',
    sector: 'Textile & Apparel',
    revenue: 7200.0,
    record: {
      electricity_mwh_per_cr: 44.0,
      diesel_litres_per_cr: 610.0,
      lpg_kg_per_cr: 220.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 1800.0,
      water_withdrawal_kl_per_cr: 1350.0,
      water_recycled_pct: 48.0,
      wastewater_treated_pct: 82.0,
      waste_generated_t_per_cr: 2.1,
      hazardous_waste_pct: 10.0,
      waste_recycled_pct: 58.0,
      renewable_energy_pct: 15.0,
      has_env_policy: true,
      has_reduction_targets: true,
      third_party_verified: false
    },
    expected_co2e: 2169.0,
    expected_score: 73.2
  },
  {
    name: 'Welspun India Ltd',
    sector: 'Textile & Apparel',
    revenue: 8900.0,
    record: {
      electricity_mwh_per_cr: 52.0,
      diesel_litres_per_cr: 780.0,
      lpg_kg_per_cr: 310.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 2100.0,
      water_withdrawal_kl_per_cr: 1650.0,
      water_recycled_pct: 38.0,
      wastewater_treated_pct: 76.0,
      waste_generated_t_per_cr: 2.6,
      hazardous_waste_pct: 14.0,
      waste_recycled_pct: 44.0,
      renewable_energy_pct: 8.0,
      has_env_policy: true,
      has_reduction_targets: false,
      third_party_verified: false
    },
    expected_co2e: 2798.0,
    expected_score: 64.8
  },
  {
    name: 'Trident Group',
    sector: 'Textile & Apparel',
    revenue: 6100.0,
    record: {
      electricity_mwh_per_cr: 47.0,
      diesel_litres_per_cr: 690.0,
      lpg_kg_per_cr: 260.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 1500.0,
      water_withdrawal_kl_per_cr: 1480.0,
      water_recycled_pct: 42.0,
      wastewater_treated_pct: 79.0,
      waste_generated_t_per_cr: 2.3,
      hazardous_waste_pct: 11.0,
      waste_recycled_pct: 50.0,
      renewable_energy_pct: 12.0,
      has_env_policy: true,
      has_reduction_targets: true,
      third_party_verified: false
    },
    expected_co2e: 2422.0,
    expected_score: 70.9
  },
  {
    name: 'Nitin Spinners Ltd',
    sector: 'Textile & Apparel',
    revenue: 1650.0,
    record: {
      electricity_mwh_per_cr: 62.0,
      diesel_litres_per_cr: 920.0,
      lpg_kg_per_cr: 380.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 800.0,
      water_withdrawal_kl_per_cr: 2100.0,
      water_recycled_pct: 18.0,
      wastewater_treated_pct: 55.0,
      waste_generated_t_per_cr: 3.4,
      hazardous_waste_pct: 22.0,
      waste_recycled_pct: 28.0,
      renewable_energy_pct: 0.0,
      has_env_policy: false,
      has_reduction_targets: false,
      third_party_verified: false
    },
    expected_co2e: 3174.0,
    expected_score: 53.5
  },
  {
    name: 'Britannia Industries Ltd',
    sector: 'Food Processing',
    revenue: 16500.0,
    record: {
      electricity_mwh_per_cr: 12.0,
      diesel_litres_per_cr: 180.0,
      lpg_kg_per_cr: 420.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 3200.0,
      water_withdrawal_kl_per_cr: 480.0,
      water_recycled_pct: 55.0,
      wastewater_treated_pct: 92.0,
      waste_generated_t_per_cr: 0.8,
      hazardous_waste_pct: 2.0,
      waste_recycled_pct: 78.0,
      renewable_energy_pct: 22.0,
      has_env_policy: true,
      has_reduction_targets: true,
      third_party_verified: true
    },
    expected_co2e: 1431.0,
    expected_score: 83.7
  },
  {
    name: 'Dodla Dairy Ltd',
    sector: 'Food Processing',
    revenue: 2800.0,
    record: {
      electricity_mwh_per_cr: 18.0,
      diesel_litres_per_cr: 820.0,
      lpg_kg_per_cr: 150.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 4500.0,
      water_withdrawal_kl_per_cr: 720.0,
      water_recycled_pct: 40.0,
      wastewater_treated_pct: 78.0,
      waste_generated_t_per_cr: 1.2,
      hazardous_waste_pct: 3.0,
      waste_recycled_pct: 60.0,
      renewable_energy_pct: 8.0,
      has_env_policy: true,
      has_reduction_targets: true,
      third_party_verified: false
    },
    expected_co2e: 2845.0,
    expected_score: 72.9
  },
  {
    name: 'Mrs Bectors Food Specialities',
    sector: 'Food Processing',
    revenue: 1100.0,
    record: {
      electricity_mwh_per_cr: 22.0,
      diesel_litres_per_cr: 310.0,
      lpg_kg_per_cr: 580.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 1800.0,
      water_withdrawal_kl_per_cr: 650.0,
      water_recycled_pct: 32.0,
      wastewater_treated_pct: 68.0,
      waste_generated_t_per_cr: 1.5,
      hazardous_waste_pct: 4.0,
      waste_recycled_pct: 52.0,
      renewable_energy_pct: 5.0,
      has_env_policy: true,
      has_reduction_targets: false,
      third_party_verified: false
    },
    expected_co2e: 1911.0,
    expected_score: 67.6
  },
  {
    name: 'Prabhat Dairy Ltd',
    sector: 'Food Processing',
    revenue: 1650.0,
    record: {
      electricity_mwh_per_cr: 28.0,
      diesel_litres_per_cr: 940.0,
      lpg_kg_per_cr: 210.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 5200.0,
      water_withdrawal_kl_per_cr: 890.0,
      water_recycled_pct: 22.0,
      wastewater_treated_pct: 58.0,
      waste_generated_t_per_cr: 1.8,
      hazardous_waste_pct: 5.0,
      waste_recycled_pct: 38.0,
      renewable_energy_pct: 0.0,
      has_env_policy: false,
      has_reduction_targets: false,
      third_party_verified: false
    },
    expected_co2e: 3329.0,
    expected_score: 58.7
  },
  {
    name: 'Gujarat Ambuja Exports',
    sector: 'Food Processing',
    revenue: 3900.0,
    record: {
      electricity_mwh_per_cr: 35.0,
      diesel_litres_per_cr: 480.0,
      lpg_kg_per_cr: 90.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 2100.0,
      water_withdrawal_kl_per_cr: 1100.0,
      water_recycled_pct: 28.0,
      wastewater_treated_pct: 62.0,
      waste_generated_t_per_cr: 2.2,
      hazardous_waste_pct: 3.0,
      waste_recycled_pct: 45.0,
      renewable_energy_pct: 10.0,
      has_env_policy: true,
      has_reduction_targets: false,
      third_party_verified: false
    },
    expected_co2e: 1639.0,
    expected_score: 60.0
  },
  {
    name: 'Motherson Sumi Wiring India',
    sector: 'Auto Parts',
    revenue: 8100.0,
    record: {
      electricity_mwh_per_cr: 28.0,
      diesel_litres_per_cr: 340.0,
      lpg_kg_per_cr: 120.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 2800.0,
      water_withdrawal_kl_per_cr: 580.0,
      water_recycled_pct: 52.0,
      wastewater_treated_pct: 88.0,
      waste_generated_t_per_cr: 1.4,
      hazardous_waste_pct: 18.0,
      waste_recycled_pct: 62.0,
      renewable_energy_pct: 18.0,
      has_env_policy: true,
      has_reduction_targets: true,
      third_party_verified: true
    },
    expected_co2e: 1367.0,
    expected_score: 80.8
  },
  {
    name: 'Minda Industries Ltd',
    sector: 'Auto Parts',
    revenue: 4200.0,
    record: {
      electricity_mwh_per_cr: 34.0,
      diesel_litres_per_cr: 460.0,
      lpg_kg_per_cr: 180.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 2200.0,
      water_withdrawal_kl_per_cr: 720.0,
      water_recycled_pct: 44.0,
      wastewater_treated_pct: 80.0,
      waste_generated_t_per_cr: 1.9,
      hazardous_waste_pct: 24.0,
      waste_recycled_pct: 50.0,
      renewable_energy_pct: 10.0,
      has_env_policy: true,
      has_reduction_targets: true,
      third_party_verified: false
    },
    expected_co2e: 1734.0,
    expected_score: 72.6
  },
  {
    name: 'Suprajit Engineering Ltd',
    sector: 'Auto Parts',
    revenue: 1850.0,
    record: {
      electricity_mwh_per_cr: 42.0,
      diesel_litres_per_cr: 580.0,
      lpg_kg_per_cr: 240.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 1600.0,
      water_withdrawal_kl_per_cr: 880.0,
      water_recycled_pct: 35.0,
      wastewater_treated_pct: 72.0,
      waste_generated_t_per_cr: 2.4,
      hazardous_waste_pct: 28.0,
      waste_recycled_pct: 42.0,
      renewable_energy_pct: 5.0,
      has_env_policy: true,
      has_reduction_targets: false,
      third_party_verified: false
    },
    expected_co2e: 2101.0,
    expected_score: 64.7
  },
  {
    name: 'Shivam Autotech Ltd',
    sector: 'Auto Parts',
    revenue: 620.0,
    record: {
      electricity_mwh_per_cr: 55.0,
      diesel_litres_per_cr: 720.0,
      lpg_kg_per_cr: 310.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 900.0,
      water_withdrawal_kl_per_cr: 1050.0,
      water_recycled_pct: 20.0,
      wastewater_treated_pct: 60.0,
      waste_generated_t_per_cr: 3.1,
      hazardous_waste_pct: 35.0,
      waste_recycled_pct: 30.0,
      renewable_energy_pct: 0.0,
      has_env_policy: false,
      has_reduction_targets: false,
      third_party_verified: false
    },
    expected_co2e: 2532.0,
    expected_score: 55.5
  },
  {
    name: 'Raunaq International Ltd',
    sector: 'Auto Parts',
    revenue: 480.0,
    record: {
      electricity_mwh_per_cr: 48.0,
      diesel_litres_per_cr: 650.0,
      lpg_kg_per_cr: 280.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 700.0,
      water_withdrawal_kl_per_cr: 920.0,
      water_recycled_pct: 25.0,
      wastewater_treated_pct: 65.0,
      waste_generated_t_per_cr: 2.7,
      hazardous_waste_pct: 30.0,
      waste_recycled_pct: 35.0,
      renewable_energy_pct: 0.0,
      has_env_policy: false,
      has_reduction_targets: false,
      third_party_verified: false
    },
    expected_co2e: 2275.0,
    expected_score: 58.6
  },
  {
    name: 'VRL Logistics Ltd',
    sector: 'Logistics',
    revenue: 2900.0,
    record: {
      electricity_mwh_per_cr: 8.0,
      diesel_litres_per_cr: 4200.0,
      lpg_kg_per_cr: 30.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 28000.0,
      water_withdrawal_kl_per_cr: 220.0,
      water_recycled_pct: 20.0,
      wastewater_treated_pct: 50.0,
      waste_generated_t_per_cr: 0.6,
      hazardous_waste_pct: 8.0,
      waste_recycled_pct: 30.0,
      renewable_energy_pct: 5.0,
      has_env_policy: true,
      has_reduction_targets: false,
      third_party_verified: false
    },
    expected_co2e: 13800.0,
    expected_score: 62.8
  },
  {
    name: 'TCI Express Ltd',
    sector: 'Logistics',
    revenue: 1450.0,
    record: {
      electricity_mwh_per_cr: 6.0,
      diesel_litres_per_cr: 3600.0,
      lpg_kg_per_cr: 20.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 22000.0,
      water_withdrawal_kl_per_cr: 180.0,
      water_recycled_pct: 15.0,
      wastewater_treated_pct: 42.0,
      waste_generated_t_per_cr: 0.4,
      hazardous_waste_pct: 6.0,
      waste_recycled_pct: 25.0,
      renewable_energy_pct: 8.0,
      has_env_policy: true,
      has_reduction_targets: true,
      third_party_verified: false
    },
    expected_co2e: 11641.0,
    expected_score: 69.8
  },
  {
    name: 'Mahindra Logistics Ltd',
    sector: 'Logistics',
    revenue: 5100.0,
    record: {
      electricity_mwh_per_cr: 12.0,
      diesel_litres_per_cr: 5800.0,
      lpg_kg_per_cr: 50.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 38000.0,
      water_withdrawal_kl_per_cr: 310.0,
      water_recycled_pct: 28.0,
      wastewater_treated_pct: 60.0,
      waste_generated_t_per_cr: 0.9,
      hazardous_waste_pct: 10.0,
      waste_recycled_pct: 38.0,
      renewable_energy_pct: 12.0,
      has_env_policy: true,
      has_reduction_targets: true,
      third_party_verified: true
    },
    expected_co2e: 19013.0,
    expected_score: 63.6
  },
  {
    name: 'Om Logistics Ltd',
    sector: 'Logistics',
    revenue: 880.0,
    record: {
      electricity_mwh_per_cr: 5.0,
      diesel_litres_per_cr: 6500.0,
      lpg_kg_per_cr: 15.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 42000.0,
      water_withdrawal_kl_per_cr: 140.0,
      water_recycled_pct: 8.0,
      wastewater_treated_pct: 30.0,
      waste_generated_t_per_cr: 0.3,
      hazardous_waste_pct: 12.0,
      waste_recycled_pct: 18.0,
      renewable_energy_pct: 0.0,
      has_env_policy: false,
      has_reduction_targets: false,
      third_party_verified: false
    },
    expected_co2e: 21185.0,
    expected_score: 62.7
  },
  {
    name: 'Spoton Logistics Pvt Ltd',
    sector: 'Logistics',
    revenue: 1100.0,
    record: {
      electricity_mwh_per_cr: 7.0,
      diesel_litres_per_cr: 4800.0,
      lpg_kg_per_cr: 25.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 31000.0,
      water_withdrawal_kl_per_cr: 200.0,
      water_recycled_pct: 12.0,
      wastewater_treated_pct: 38.0,
      waste_generated_t_per_cr: 0.5,
      hazardous_waste_pct: 9.0,
      waste_recycled_pct: 22.0,
      renewable_energy_pct: 3.0,
      has_env_policy: true,
      has_reduction_targets: false,
      third_party_verified: false
    },
    expected_co2e: 15667.0,
    expected_score: 63.5
  },
  {
    name: 'Tata Consultancy Services',
    sector: 'IT Services',
    revenue: 240000.0,
    record: {
      electricity_mwh_per_cr: 8.0,
      diesel_litres_per_cr: 45.0,
      lpg_kg_per_cr: 15.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 2800.0,
      water_withdrawal_kl_per_cr: 85.0,
      water_recycled_pct: 62.0,
      wastewater_treated_pct: 90.0,
      waste_generated_t_per_cr: 0.12,
      hazardous_waste_pct: 5.0,
      waste_recycled_pct: 80.0,
      renewable_energy_pct: 55.0,
      has_env_policy: true,
      has_reduction_targets: true,
      third_party_verified: true
    },
    expected_co2e: 399.0,
    expected_score: 87.6
  },
  {
    name: 'Mphasis Ltd',
    sector: 'IT Services',
    revenue: 13800.0,
    record: {
      electricity_mwh_per_cr: 12.0,
      diesel_litres_per_cr: 80.0,
      lpg_kg_per_cr: 20.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 3500.0,
      water_withdrawal_kl_per_cr: 120.0,
      water_recycled_pct: 48.0,
      wastewater_treated_pct: 82.0,
      waste_generated_t_per_cr: 0.18,
      hazardous_waste_pct: 8.0,
      waste_recycled_pct: 70.0,
      renewable_energy_pct: 32.0,
      has_env_policy: true,
      has_reduction_targets: true,
      third_party_verified: true
    },
    expected_co2e: 566.0,
    expected_score: 80.4
  },
  {
    name: 'Persistent Systems Ltd',
    sector: 'IT Services',
    revenue: 9200.0,
    record: {
      electricity_mwh_per_cr: 15.0,
      diesel_litres_per_cr: 110.0,
      lpg_kg_per_cr: 25.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 4200.0,
      water_withdrawal_kl_per_cr: 150.0,
      water_recycled_pct: 38.0,
      wastewater_treated_pct: 75.0,
      waste_generated_t_per_cr: 0.22,
      hazardous_waste_pct: 10.0,
      waste_recycled_pct: 62.0,
      renewable_energy_pct: 18.0,
      has_env_policy: true,
      has_reduction_targets: true,
      third_party_verified: false
    },
    expected_co2e: 718.0,
    expected_score: 71.9
  },
  {
    name: 'Ksolves India Ltd',
    sector: 'IT Services',
    revenue: 210.0,
    record: {
      electricity_mwh_per_cr: 22.0,
      diesel_litres_per_cr: 180.0,
      lpg_kg_per_cr: 35.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 5800.0,
      water_withdrawal_kl_per_cr: 200.0,
      water_recycled_pct: 18.0,
      wastewater_treated_pct: 55.0,
      waste_generated_t_per_cr: 0.3,
      hazardous_waste_pct: 12.0,
      waste_recycled_pct: 40.0,
      renewable_energy_pct: 0.0,
      has_env_policy: false,
      has_reduction_targets: false,
      third_party_verified: false
    },
    expected_co2e: 1069.0,
    expected_score: 56.1
  },
  {
    name: 'Kellton Tech Solutions',
    sector: 'IT Services',
    revenue: 580.0,
    record: {
      electricity_mwh_per_cr: 18.0,
      diesel_litres_per_cr: 140.0,
      lpg_kg_per_cr: 28.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 4800.0,
      water_withdrawal_kl_per_cr: 165.0,
      water_recycled_pct: 25.0,
      wastewater_treated_pct: 62.0,
      waste_generated_t_per_cr: 0.25,
      hazardous_waste_pct: 9.0,
      waste_recycled_pct: 48.0,
      renewable_energy_pct: 5.0,
      has_env_policy: true,
      has_reduction_targets: false,
      third_party_verified: false
    },
    expected_co2e: 859.0,
    expected_score: 64.1
  },
  {
    name: 'Aarti Industries Ltd',
    sector: 'Chemical',
    revenue: 6800.0,
    record: {
      electricity_mwh_per_cr: 65.0,
      diesel_litres_per_cr: 820.0,
      lpg_kg_per_cr: 480.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 1800.0,
      water_withdrawal_kl_per_cr: 2800.0,
      water_recycled_pct: 45.0,
      wastewater_treated_pct: 85.0,
      waste_generated_t_per_cr: 4.2,
      hazardous_waste_pct: 38.0,
      waste_recycled_pct: 48.0,
      renewable_energy_pct: 12.0,
      has_env_policy: true,
      has_reduction_targets: true,
      third_party_verified: true
    },
    expected_co2e: 3153.0,
    expected_score: 75.0
  },
  {
    name: 'Fine Organics Industries',
    sector: 'Chemical',
    revenue: 2100.0,
    record: {
      electricity_mwh_per_cr: 58.0,
      diesel_litres_per_cr: 740.0,
      lpg_kg_per_cr: 420.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 1200.0,
      water_withdrawal_kl_per_cr: 2200.0,
      water_recycled_pct: 38.0,
      wastewater_treated_pct: 78.0,
      waste_generated_t_per_cr: 3.8,
      hazardous_waste_pct: 42.0,
      waste_recycled_pct: 40.0,
      renewable_energy_pct: 8.0,
      has_env_policy: true,
      has_reduction_targets: false,
      third_party_verified: false
    },
    expected_co2e: 2786.0,
    expected_score: 68.8
  },
  {
    name: 'Jubilant Ingrevia Ltd',
    sector: 'Chemical',
    revenue: 4400.0,
    record: {
      electricity_mwh_per_cr: 72.0,
      diesel_litres_per_cr: 950.0,
      lpg_kg_per_cr: 560.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 1600.0,
      water_withdrawal_kl_per_cr: 3200.0,
      water_recycled_pct: 52.0,
      wastewater_treated_pct: 88.0,
      waste_generated_t_per_cr: 4.8,
      hazardous_waste_pct: 34.0,
      waste_recycled_pct: 55.0,
      renewable_energy_pct: 15.0,
      has_env_policy: true,
      has_reduction_targets: true,
      third_party_verified: false
    },
    expected_co2e: 3613.0,
    expected_score: 71.0
  },
  {
    name: 'Sudarshan Chemical Ind.',
    sector: 'Chemical',
    revenue: 2600.0,
    record: {
      electricity_mwh_per_cr: 80.0,
      diesel_litres_per_cr: 1050.0,
      lpg_kg_per_cr: 620.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 1400.0,
      water_withdrawal_kl_per_cr: 3600.0,
      water_recycled_pct: 28.0,
      wastewater_treated_pct: 70.0,
      waste_generated_t_per_cr: 5.5,
      hazardous_waste_pct: 48.0,
      waste_recycled_pct: 32.0,
      renewable_energy_pct: 4.0,
      has_env_policy: true,
      has_reduction_targets: false,
      third_party_verified: false
    },
    expected_co2e: 3963.0,
    expected_score: 61.5
  },
  {
    name: 'Anupam Rasayan India Ltd',
    sector: 'Chemical',
    revenue: 820.0,
    record: {
      electricity_mwh_per_cr: 92.0,
      diesel_litres_per_cr: 1200.0,
      lpg_kg_per_cr: 700.0,
      petrol_litres_per_cr: 0,
      purchased_steam_gj_per_cr: 0,
      business_travel_km_per_cr: 900.0,
      water_withdrawal_kl_per_cr: 4100.0,
      water_recycled_pct: 15.0,
      wastewater_treated_pct: 58.0,
      waste_generated_t_per_cr: 6.8,
      hazardous_waste_pct: 55.0,
      waste_recycled_pct: 22.0,
      renewable_energy_pct: 0.0,
      has_env_policy: false,
      has_reduction_targets: false,
      third_party_verified: false
    },
    expected_co2e: 4453.0,
    expected_score: 53.1
  },
];

async function runTests() {
  let passed = 0;
  let failed = 0;

  for (const c of TEST_COMPANIES) {
    const emissions = calculateEmissions(c.record, c.revenue);
    
    // Intensity in kg/cr
    const totalCO2e = (emissions.total_co2e_scope1 + emissions.total_co2e_scope2 + emissions.total_co2e_scope3) * 1000 / c.revenue;
    const roundedCO2e = Math.round(totalCO2e);

    const benchmark = SECTOR_BENCHMARKS[c.sector];
    const scoreResult = calculateGreenScore(c.record as EmissionsRecord, benchmark, c.revenue);
    const score = Number(scoreResult.total_score);

    const co2eMatch = roundedCO2e === c.expected_co2e;
    const scoreMatch = Math.abs(score - c.expected_score) < 0.15; // Floating point rounding tolerances

    if (co2eMatch && scoreMatch) {
      console.log(`[PASS] ${c.name} (${c.sector}): Score ${score} vs Expected ${c.expected_score}. CO2e ${roundedCO2e} vs Expected ${c.expected_co2e}`);
      passed++;
    } else {
      console.log(`[FAIL] ${c.name} (${c.sector}):`);
      if (!co2eMatch) {
        console.log(`   CO2e Intensity: Calculated ${roundedCO2e}, Expected ${c.expected_co2e} (Diff: ${roundedCO2e - c.expected_co2e})`);
      }
      if (!scoreMatch) {
        console.log(`   GreenScore: Calculated ${score}, Expected ${c.expected_score} (Diff: ${(score - c.expected_score).toFixed(2)})`);
      }
      failed++;
    }
  }

  console.log(`\nTest Results: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(console.error);
