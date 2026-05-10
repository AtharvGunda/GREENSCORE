INSERT INTO loan_offers (id, bank_name, product_name, min_score, max_amount_cr, interest_rate_min, interest_rate_max, tenure_years, eligible_sectors, rbi_scheme, description, apply_url) VALUES
  (gen_random_uuid(), 'SIDBI', 'SIDBI Green Finance Scheme', 55, 5.00, 8.00, 9.5, 7, NULL, 'PSL - Green Energy', 'For SMEs investing in energy efficiency or renewables. RBI Priority Sector.', 'https://www.sidbi.in/en/products/green-finance'),
  (gen_random_uuid(), 'SBI', 'SBI Green Car Loan / MSME Green', 60, 2.00, 8.50, 10.5, 5, ARRAY['Manufacturing','Logistics'], 'RBI Green Taxonomy', 'For MSME units with documented energy efficiency improvements.', 'https://sbi.co.in/web/business/sme'),
  (gen_random_uuid(), 'HDFC Bank', 'HDFC Green SME Loan', 65, 3.00, 9.00, 11.0, 7, NULL, 'ESG-linked', 'Rate linked to annual GreenScore improvement.', 'https://www.hdfcbank.com/sme'),
  (gen_random_uuid(), 'Bank of Baroda', 'BOB Baroda Green Loan', 50, 2.00, 9.50, 12.0, 5, NULL, 'PSL', 'Accessible entry-level green loan for average-scoring SMEs.', 'https://www.bankofbaroda.in/msme'),
  (gen_random_uuid(), 'IREDA', 'IREDA Renewable Energy Loan', 70, 10.00, 7.50, 9.0, 10, NULL, 'MNRE Scheme', 'Specifically for renewable energy projects. Highest ticket size.', 'https://www.ireda.in');

INSERT INTO sector_benchmarks (id, sector, avg_electricity_mwh_per_cr, avg_diesel_litres_per_cr, avg_water_kl_per_cr, avg_waste_t_per_cr, avg_renewable_pct, avg_greenscore) VALUES
  (gen_random_uuid(), 'Textile & Apparel', 45.0, 120.0, 500.0, 10.0, 5.0, 55.6),
  (gen_random_uuid(), 'Auto Parts', 60.0, 200.0, 150.0, 15.0, 8.0, 55.6),
  (gen_random_uuid(), 'Food Processing', 50.0, 150.0, 800.0, 20.0, 6.0, 55.6);
