-- Ghost Factory™ Seed Data for CERAMIC SHIELD & PPF OS

INSERT INTO paint_inspections (code, title, category, base_price_cents, status) VALUES
('CODE-01', 'Full Body XPEL Stealth Self-Healing PPF', 'High-End Automotive PPF & Ceramic Coating Studio OS', 64000, 'ACTIVE'),
('CODE-02', 'Ceramic Pro 9H Multi-Layer Ceramic Armor', 'High-End Automotive PPF & Ceramic Coating Studio OS', 22500, 'ACTIVE'),
('CODE-03', 'Track Pack High-Impact Zone Defense', 'High-End Automotive PPF & Ceramic Coating Studio OS', 28500, 'ACTIVE')
ON CONFLICT (code) DO NOTHING;

INSERT INTO coating_packages (client_name, contact_phone, scheduled_date, deposit_paid_cents, booking_status) VALUES
('Sterling Productions LLC', '+1 (555) 234-5678', CURRENT_DATE, 50000, 'CONFIRMED'),
('Vanguard Athletic Group', '+1 (555) 876-5432', CURRENT_DATE + INTERVAL '1 day', 25000, 'SCHEDULED');

INSERT INTO cure_telemetry (session_code, metric_value, verification_hash) VALUES
('SESS-1001', 99.80, 'a7c92b8d0e1f3a5b7c9e0d2f4a6b8c0e'),
('SESS-1002', 100.00, 'b8d0e2f4a6c8e0d2f4a6b8c0e2f4a6b8');
