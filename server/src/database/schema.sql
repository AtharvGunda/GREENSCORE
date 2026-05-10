-- Table 1: Companies
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  gstin VARCHAR(15) UNIQUE,
  sector VARCHAR(100) NOT NULL,
  annual_revenue_cr DECIMAL(10,2),
  state VARCHAR(100),
  city VARCHAR(100),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'sme',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table 2: Emissions Records
CREATE TABLE emissions_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  financial_year VARCHAR(7) NOT NULL,
  -- SCOPE 1
  electricity_mwh_per_cr DECIMAL(10,3),
  diesel_litres_per_cr DECIMAL(10,3),
  lpg_kg_per_cr DECIMAL(10,3),
  petrol_litres_per_cr DECIMAL(10,3),
  -- SCOPE 2
  purchased_steam_gj_per_cr DECIMAL(10,3),
  -- SCOPE 3
  business_travel_km_per_cr DECIMAL(10,3),
  -- WATER
  water_withdrawal_kl_per_cr DECIMAL(10,3),
  water_recycled_pct DECIMAL(5,2),
  wastewater_treated_pct DECIMAL(5,2),
  -- WASTE
  waste_generated_t_per_cr DECIMAL(10,3),
  hazardous_waste_pct DECIMAL(5,2),
  waste_recycled_pct DECIMAL(5,2),
  -- RENEWABLES
  renewable_energy_pct DECIMAL(5,2),
  green_capex_per_cr DECIMAL(10,3),
  -- GOVERNANCE
  has_env_policy BOOLEAN DEFAULT FALSE,
  has_reduction_targets BOOLEAN DEFAULT FALSE,
  third_party_verified BOOLEAN DEFAULT FALSE,
  -- Calculated CO2e
  total_co2e_scope1 DECIMAL(10,3),
  total_co2e_scope2 DECIMAL(10,3),
  total_co2e_scope3 DECIMAL(10,3),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(company_id, financial_year)
);

-- Table 3: Green Scores
CREATE TABLE green_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  emissions_record_id UUID REFERENCES emissions_records(id),
  financial_year VARCHAR(7) NOT NULL,
  energy_score DECIMAL(5,2),
  water_score DECIMAL(5,2),
  waste_score DECIMAL(5,2),
  renewables_score DECIMAL(5,2),
  governance_score DECIMAL(5,2),
  total_score DECIMAL(5,2),
  sector_percentile DECIMAL(5,2),
  sector_benchmark_score DECIMAL(5,2),
  score_tier VARCHAR(20),
  loan_eligible BOOLEAN DEFAULT FALSE,
  min_loan_rate DECIMAL(4,2),
  calculated_at TIMESTAMP DEFAULT NOW()
);

-- Table 4: Loan Offers
CREATE TABLE loan_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_name VARCHAR(100) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  min_score INTEGER NOT NULL,
  max_amount_cr DECIMAL(10,2),
  interest_rate_min DECIMAL(4,2),
  interest_rate_max DECIMAL(4,2),
  tenure_years INTEGER,
  eligible_sectors TEXT[],
  rbi_scheme VARCHAR(100),
  description TEXT,
  apply_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE
);

-- Table 5: Sector Benchmarks
CREATE TABLE sector_benchmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sector VARCHAR(100) UNIQUE NOT NULL,
  avg_electricity_mwh_per_cr DECIMAL(10,3),
  avg_diesel_litres_per_cr DECIMAL(10,3),
  avg_water_kl_per_cr DECIMAL(10,3),
  avg_waste_t_per_cr DECIMAL(10,3),
  avg_renewable_pct DECIMAL(5,2),
  avg_greenscore DECIMAL(5,2),
  data_source VARCHAR(100) DEFAULT 'BEE India / MoSPI 2023-24',
  updated_at TIMESTAMP DEFAULT NOW()
);
