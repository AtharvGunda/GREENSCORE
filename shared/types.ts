export type Sector = 
  | 'Manufacturing'
  | 'Textile & Apparel'
  | 'Food Processing'
  | 'Auto Parts'
  | 'Retail'
  | 'Logistics'
  | 'IT Services'
  | 'Hospitality'
  | 'Healthcare'
  | 'Construction'
  | 'Chemical'
  | 'Printing & Packaging';

export interface Company {
  id: string;
  name: string;
  gstin?: string;
  sector: Sector;
  annual_revenue_cr: number;
  state?: string;
  city?: string;
  email: string;
  role: 'sme' | 'bank' | 'admin';
  created_at: string;
}

export interface EmissionsRecord {
  id: string;
  company_id: string;
  financial_year: string;
  electricity_mwh_per_cr: number;
  diesel_litres_per_cr: number;
  lpg_kg_per_cr: number;
  petrol_litres_per_cr: number;
  purchased_steam_gj_per_cr: number;
  business_travel_km_per_cr: number;
  water_withdrawal_kl_per_cr: number;
  water_recycled_pct: number;
  wastewater_treated_pct: number;
  waste_generated_t_per_cr: number;
  hazardous_waste_pct: number;
  waste_recycled_pct: number;
  renewable_energy_pct: number;
  green_capex_per_cr: number;
  has_env_policy: boolean;
  has_reduction_targets: boolean;
  third_party_verified: boolean;
  total_co2e_scope1?: number;
  total_co2e_scope2?: number;
  total_co2e_scope3?: number;
  created_at: string;
}

export interface GreenScore {
  id: string;
  company_id: string;
  emissions_record_id: string;
  financial_year: string;
  energy_score: number;
  water_score: number;
  waste_score: number;
  renewables_score: number;
  governance_score: number;
  total_score: number;
  sector_percentile: number;
  sector_benchmark_score: number;
  score_tier: string;
  loan_eligible: boolean;
  min_loan_rate: number;
  calculated_at: string;
}

export interface LoanOffer {
  id: string;
  bank_name: string;
  product_name: string;
  min_score: number;
  max_amount_cr: number;
  interest_rate_min: number;
  interest_rate_max: number;
  tenure_years: number;
  eligible_sectors: string[] | null;
  rbi_scheme: string;
  description: string;
  apply_url: string;
  is_active: boolean;
}

export interface SectorBenchmark {
  id: string;
  sector: Sector;
  avg_electricity_mwh_per_cr: number;
  avg_diesel_litres_per_cr: number;
  avg_water_kl_per_cr: number;
  avg_waste_t_per_cr: number;
  avg_renewable_pct: number;
  avg_greenscore: number;
  data_source: string;
  updated_at: string;
}
