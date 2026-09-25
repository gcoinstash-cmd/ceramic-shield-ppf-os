import React, { useState } from 'react';
import { 
  Shield, Award, CheckCircle2, Sparkles, Lock, ArrowRight, Check, 
  Layers, Gauge, Car, AlertTriangle, FileCheck, Thermometer, Search
} from 'lucide-react';
import { AdminPortalModal } from './AdminPortalModal.tsx';

type VehicleType = 'coupe' | 'sedan' | 'suv' | 'exotic';

interface Zone {
  id: string;
  name: string;
  price: number;
  coverage: string;
  recommended: boolean;
}

const ZONES: Record<VehicleType, Zone[]> = {
  coupe: [
    { id: 'front-bumper', name: 'Front Bumper & Grille', price: 750, coverage: 'High-Velocity Rock Impact Zone', recommended: true },
    { id: 'full-hood', name: 'Full Extended Hood', price: 900, coverage: 'Full Wrapped Edges // Zero Seams', recommended: true },
    { id: 'front-fenders', name: 'Dual Front Fenders', price: 650, coverage: 'Flush Fitment around Headlights', recommended: true },
    { id: 'mirrors-rockers', name: 'Side Mirrors & Rocker Panels', price: 850, coverage: 'Rear Tire Debris Guard (10mil)', recommended: true },
    { id: 'rear-fenders', name: 'Widebody Rear Fenders', price: 700, coverage: 'Quarter Panel Flared Sections', recommended: false },
    { id: 'roof-luggage', name: 'Roof & A-Pillars', price: 800, coverage: 'Bird Dropping & UV Sun Shield', recommended: false },
  ],
  sedan: [
    { id: 'front-bumper', name: 'Front Bumper & Splitter', price: 800, coverage: 'Front End Stone Chip Shield', recommended: true },
    { id: 'full-hood', name: 'Full Hood (Full Sheet)', price: 950, coverage: 'Wrapped Perimeter Edge Sealing', recommended: true },
    { id: 'front-fenders', name: 'Front Quarter Fenders', price: 700, coverage: 'Sensor & Emblem Precision Cut', recommended: true },
    { id: 'mirrors-rockers', name: 'Rocker Panels & Door Sills', price: 900, coverage: 'Foot Scuff & Highway Sand Guard', recommended: true },
    { id: 'doors-rear', name: 'Full 4-Door Shell Coverage', price: 1800, coverage: 'Parking Lot Door Ding Barrier', recommended: false },
    { id: 'rear-bumper', name: 'Rear Bumper & Trunk Deck', price: 750, coverage: 'Luggage Loading Scratch Armor', recommended: false },
  ],
  suv: [
    { id: 'front-bumper', name: 'Oversized Front Fascia', price: 950, coverage: 'Heavy Impact Off-Road Armor', recommended: true },
    { id: 'full-hood', name: 'Expansive SUV Hood', price: 1100, coverage: 'Full 72-Inch Wide Film Roll', recommended: true },
    { id: 'front-fenders', name: 'Dual Flared Fenders', price: 800, coverage: 'Wheel Arch Flare Wrap', recommended: true },
    { id: 'mirrors-rockers', name: 'Lower Rockers & Steps', price: 950, coverage: 'Gravel & Mud Roost Deflector', recommended: true },
    { id: 'doors-all', name: 'Complete 4-Door Lower halves', price: 1600, coverage: 'Family Utility Protection', recommended: false },
    { id: 'rear-liftgate', name: 'Rear Gate & Loading Sill', price: 850, coverage: 'Cargo Drag & Bumper Defense', recommended: false },
  ],
  exotic: [
    { id: 'front-bumper', name: 'Aerodynamic Carbon Splitter & Bumper', price: 1200, coverage: 'Custom Hand-Trimmed No-Relief', recommended: true },
    { id: 'full-hood', name: 'Clamshell Front Frunk / Hood', price: 1400, coverage: 'Seamless Single-Piece Monocoque', recommended: true },
    { id: 'front-fenders', name: 'Louvred Carbon Fenders', price: 1100, coverage: 'Vent Intake Wrapped Liners', recommended: true },
    { id: 'mirrors-rockers', name: 'Staggered Rockers & Side Pods', price: 1300, coverage: 'Turbine Air Scoop Defense (10mil)', recommended: true },
    { id: 'rear-quarters', name: 'Engine Bay Deck & Rear Hips', price: 1500, coverage: 'High-Heat Thermal Film Guard', recommended: true },
    { id: 'active-wing', name: 'Active Aero Carbon Wing & Diffuser', price: 950, coverage: 'Downforce Surface Ceramic Shield', recommended: false },
  ]
};

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(
    typeof window !== 'undefined' && (
      window.location.search.includes('admin') || 
      window.location.pathname.endsWith('/admin') ||
      window.location.hash === '#admin'
    )
  );

  const [vehicle, setVehicle] = useState<VehicleType>('exotic');
  const [selectedZones, setSelectedZones] = useState<string[]>([
    'front-bumper', 'full-hood', 'front-fenders', 'mirrors-rockers'
  ]);
  const [paintCorrectionStage, setPaintCorrectionStage] = useState<1 | 2 | 3>(2);
  const [ceramicCoatingLayers, setCeramicCoatingLayers] = useState<1 | 2 | 4>(2);
  const [warrantyVin, setWarrantyVin] = useState('');
  const [warrantyResult, setWarrantyResult] = useState<string | null>(null);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Toggle zones
  const toggleZone = (id: string) => {
    if (selectedZones.includes(id)) {
      setSelectedZones(selectedZones.filter(z => z !== id));
    } else {
      setSelectedZones([...selectedZones, id]);
    }
  };

  // Calculations
  const currentZones = ZONES[vehicle];
  const ppfBaseTotal = selectedZones.reduce((sum, zId) => {
    const found = currentZones.find(z => z.id === zId);
    return sum + (found ? found.price : 0);
  }, 0);

  const correctionPrice = paintCorrectionStage === 1 ? 450 : paintCorrectionStage === 2 ? 850 : 1450;
  const ceramicPrice = ceramicCoatingLayers === 1 ? 650 : ceramicCoatingLayers === 2 ? 1150 : 1950;
  const grandTotal = ppfBaseTotal + correctionPrice + ceramicPrice;

  const handleWarrantySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!warrantyVin) return;
    setWarrantyResult(
      `✓ ACTIVE CERTIFICATE: VIN-${warrantyVin.toUpperCase().slice(-6) || '789421'} // XPEL ULTIMATE PLUS // INSTALLED 2026 // 10-YEAR CARFAX VERIFIED`
    );
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiryName('');
      setInquiryPhone('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-400">
      {/* Precision Floating Top Pill Nav */}
      <nav className="fixed top-4 inset-x-0 z-50 max-w-5xl mx-auto px-4">
        <div className="bg-[#121214]/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl px-5 py-3 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-zinc-950 font-bold shadow-md shadow-cyan-500/20">
              <Shield className="w-4 h-4 text-zinc-950" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wider font-mono uppercase tracking-widest text-cyan-400 font-bold block leading-none">AURA & GRID AUTOMOTIVE</span>
              <span className="text-sm font-extrabold tracking-tight text-white leading-none">CERAMIC SHIELD & PPF OS</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-zinc-400">
            <a href="#configurator" className="hover:text-cyan-400 transition">Interactive Studio</a>
            <a href="#cure-schedule" className="hover:text-cyan-400 transition">IR Cure Telemetry</a>
            <a href="#warranty-lookup" className="hover:text-cyan-400 transition">Warranty Vault</a>
          </div>

          <button
            onClick={() => setIsAdminOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/40 hover:bg-cyan-500/20 text-cyan-400 text-xs font-mono transition flex items-center gap-1.5"
          >
            <Lock className="w-3 h-3" />
            <span>[ STUDIO PASS ]</span>
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-28 pb-12 px-6 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>MICRO-M&A PRODUCTION OS // XPEL & CERAMIC PRO CERTIFIED</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Precision Paint Protection & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Curing Telemetry</span>
        </h1>
        <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          Multi-stage paint defect removal, self-healing urethane film wrapping, shortwave infrared curing logs, and certified 10-year Carfax warranty registrations.
        </p>

        {/* Live Lab Specs Ticker */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-xs font-semibold tracking-wider font-mono text-zinc-300 uppercase block">ACTIVE CURE BAYS</span>
            <span className="text-base font-bold font-mono text-cyan-400">6 DUST-FREE BAYS</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-xs font-semibold tracking-wider font-mono text-zinc-300 uppercase block">IR BAKING TARGET</span>
            <span className="text-base font-bold font-mono text-cyan-400">160°F CONSTANT</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-xs font-semibold tracking-wider font-mono text-zinc-300 uppercase block">WARRANTIES LOGGED</span>
            <span className="text-base font-bold font-mono text-cyan-400">1,420 CERTIFICATES</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-xs font-semibold tracking-wider font-mono text-zinc-300 uppercase block">PAINT CLEARANCE</span>
            <span className="text-base font-bold font-mono text-cyan-400">99.8% DEFECT-FREE</span>
          </div>
        </div>
      </header>

      {/* Main Interactive Studio Configurator */}
      <section id="configurator" className="py-8 px-6 max-w-6xl mx-auto">
        <div className="bg-[#121214] border border-cyan-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">STEP 1: VEHICLE PLATFORM</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Select Vehicle Form Factor</h2>
            </div>

            {/* Vehicle Type Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800">
              {(['coupe', 'sedan', 'suv', 'exotic'] as VehicleType[]).map((vt) => (
                <button
                  key={vt}
                  onClick={() => {
                    setVehicle(vt);
                    setSelectedZones(['front-bumper', 'full-hood', 'front-fenders', 'mirrors-rockers']);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold transition flex items-center justify-center gap-1.5 ${
                    vehicle === vt ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/30' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>{vt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Zone Walkaround Selector */}
          <div className="py-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">STEP 2: HIGH-IMPACT ZONES</span>
                <h3 className="text-lg font-bold text-white">Vehicle Impact Surface Selector (XPEL Ultimate Plus 8.5mil)</h3>
              </div>
              <span className="text-xs font-mono text-zinc-400">Selected: {selectedZones.length} of {currentZones.length} Zones</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentZones.map((zone) => {
                const isSelected = selectedZones.includes(zone.id);
                return (
                  <button
                    key={zone.id}
                    onClick={() => toggleZone(zone.id)}
                    className={`text-left p-4 rounded-2xl border transition relative flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-cyan-950/20 border-cyan-500/60 shadow-lg shadow-cyan-950/40' 
                        : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold font-mono text-zinc-200">{zone.name}</span>
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-zinc-700"></div>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-zinc-400">{zone.coverage}</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-zinc-800/60 flex items-center justify-between">
                      <span className="text-xs font-mono font-extrabold text-cyan-400">${zone.price} USD</span>
                      {zone.recommended && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Paint Correction & Ceramic Coating Sliders */}
          <div className="pt-6 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Paint Correction Stage */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">STEP 3: SURFACE CORRECTION</span>
              <h4 className="text-base font-bold text-white mb-2">Jewel Paint Polish Depth</h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { stage: 1, label: 'Stage 1', desc: '50% Defect Cut', price: 450 },
                  { stage: 2, label: 'Stage 2', desc: '85% Dual Cut', price: 850 },
                  { stage: 3, label: 'Concours', desc: '98% Multi-Jewel', price: 1450 }
                ].map((s) => (
                  <button
                    key={s.stage}
                    onClick={() => setPaintCorrectionStage(s.stage as any)}
                    className={`p-3 rounded-xl text-center border transition ${
                      paintCorrectionStage === s.stage 
                        ? 'bg-cyan-500 text-zinc-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20' 
                        : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-xs font-mono block">{s.label}</span>
                    <span className="text-xs font-semibold tracking-wider block opacity-80">{s.desc}</span>
                    <span className="text-xs font-mono block mt-1">+${s.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ceramic Coating Layers */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">STEP 4: CERAMIC PRO 9H</span>
              <h4 className="text-base font-bold text-white mb-2">Hydrophobic Nano Armor Layers</h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { layers: 1, label: 'Single Layer', desc: '2-Year Beading', price: 650 },
                  { layers: 2, label: 'Dual Armor', desc: '5-Year Matrix', price: 1150 },
                  { layers: 4, label: 'Gold 4-Layer', desc: 'Lifetime Bond', price: 1950 }
                ].map((l) => (
                  <button
                    key={l.layers}
                    onClick={() => setCeramicCoatingLayers(l.layers as any)}
                    className={`p-3 rounded-xl text-center border transition ${
                      ceramicCoatingLayers === l.layers 
                        ? 'bg-cyan-500 text-zinc-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20' 
                        : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-xs font-mono block">{l.label}</span>
                    <span className="text-xs font-semibold tracking-wider block opacity-80">{l.desc}</span>
                    <span className="text-xs font-mono block mt-1">+${l.price}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Summary & Checkout Drawer Bar */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-zinc-900 to-zinc-900 border border-cyan-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">CUSTOM CONFIGURATION TOTAL</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">${grandTotal.toLocaleString()} USD</span>
                <span className="text-xs font-mono text-zinc-400">Includes Film + Lab Prep + IR Cure</span>
              </div>
            </div>

            <form onSubmit={handleBooking} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="text"
                required
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                placeholder="Full Name"
                className="px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs font-sans text-white focus:outline-none focus:border-cyan-500"
              />
              <input
                type="tel"
                required
                value={inquiryPhone}
                onChange={(e) => setInquiryPhone(e.target.value)}
                placeholder="Phone (SMS Quote)"
                className="px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs font-sans text-white focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-base font-semibold min-h-[44px] uppercase tracking-wider transition whitespace-nowrap"
              >
                {submitted ? '✓ RESERVATION QUEUED' : 'BOOK CURE BAY'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* IR Shortwave Curing Schedule Telemetry */}
      <section id="cure-schedule" className="py-12 px-6 max-w-6xl mx-auto">
        <div className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">LAB MONITORING // PROTOCOL B</span>
              <h3 className="text-xl font-bold text-white">Automated Infrared Curing Telemetry</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 mt-2 sm:mt-0 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ALL 6 BAYS OPERATING AT SPECS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span>BAY 01 // XPEL STEALTH</span>
                <span className="text-cyan-400 font-bold">160°F / 45 MINS</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full w-[88%]"></div>
              </div>
              <span className="text-xs font-semibold tracking-wider text-zinc-300 font-mono mt-2 block">Phase: Edge Seal Polymerization</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span>BAY 03 // CERAMIC 9H</span>
                <span className="text-cyan-400 font-bold">145°F / 60 MINS</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full w-[64%]"></div>
              </div>
              <span className="text-xs font-semibold tracking-wider text-zinc-300 font-mono mt-2 block">Phase: Cross-Link Hydrophobic Bake</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span>BAY 05 // PORSCHE GT3 RS</span>
                <span className="text-cyan-400 font-bold">160°F / COMPLETED</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[100%]"></div>
              </div>
              <span className="text-xs font-semibold tracking-wider text-zinc-300 font-mono mt-2 block">Phase: Ready for Final Handover</span>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Warranty Certificate Lookup Vault */}
      <section id="warranty-lookup" className="py-12 px-6 max-w-4xl mx-auto">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#121214] border border-zinc-800 text-center">
          <FileCheck className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white">Carfax Verified 10-Year Warranty Lookup</h3>
          <p className="text-base text-zinc-200 leading-relaxed max-w-md mx-auto mt-1 mb-6">
            Enter vehicle VIN or serial certificate ID to view authenticated film lot number, installer credentials, and transfer history.
          </p>

          <form onSubmit={handleWarrantySearch} className="flex gap-2 max-w-md mx-auto">
            <input
              type="text"
              required
              value={warrantyVin}
              onChange={(e) => setWarrantyVin(e.target.value)}
              placeholder="Enter VIN (e.g. WP0AB2A99NS...)"
              className="flex-1 px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="px-5 py-3 min-h-[44px].5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-base font-semibold min-h-[44px] font-mono uppercase"
            >
              Verify
            </button>
          </form>

          {warrantyResult && (
            <div className="mt-4 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-xs font-mono text-cyan-300">
              {warrantyResult}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-800 bg-[#0A0A0B] text-zinc-300 text-xs font-mono">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-zinc-300 font-bold">CERAMIC SHIELD & PPF OS</span> • Turnkey Restyling OS v1.0.0
          </div>
          <div className="flex items-center gap-6">
            <span>Ghost Factory™ Protocol</span>
            <span>Supabase RLS Enforced</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-cyan-400 hover:underline"
            >
              Admin Portal (ceramic2026)
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Modal */}
      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
