-- Ghost Factory™ Production Schema for CERAMIC SHIELD & PPF OS
-- PostgreSQL 15+ Compatible with Row Level Security (RLS)

-- 1. Main Service / Asset Table
CREATE TABLE IF NOT EXISTS paint_inspections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    base_price_cents INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Bookings & Reservations Table
CREATE TABLE IF NOT EXISTS coating_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES paint_inspections(id) ON DELETE SET NULL,
    client_name VARCHAR(150) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    scheduled_date DATE NOT NULL,
    deposit_paid_cents INTEGER DEFAULT 0,
    booking_status VARCHAR(50) DEFAULT 'CONFIRMED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Compliance / Inspection Records Table
CREATE TABLE IF NOT EXISTS warranty_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES coating_packages(id) ON DELETE CASCADE,
    inspector_or_lead VARCHAR(100) NOT NULL,
    waiver_signature_hash VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Telemetry / Operational Audit Table
CREATE TABLE IF NOT EXISTS cure_telemetry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_code VARCHAR(100) UNIQUE NOT NULL,
    metric_value NUMERIC(10,2) DEFAULT 0.00,
    verification_hash VARCHAR(255),
    logged_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE paint_inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE coating_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE warranty_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE cure_telemetry ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Public Read Access" ON paint_inspections FOR SELECT USING (true);
CREATE POLICY "Public Insert Access" ON coating_packages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin All Access Main" ON paint_inspections FOR ALL USING (true);
CREATE POLICY "Admin All Access Bookings" ON coating_packages FOR ALL USING (true);
CREATE POLICY "Admin All Access Compliance" ON warranty_registry FOR ALL USING (true);
CREATE POLICY "Admin All Access Telemetry" ON cure_telemetry FOR ALL USING (true);
