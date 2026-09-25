import React, { useState } from 'react';
import { 
  Shield, Award, ArrowRight, ArrowLeft, Calendar, DollarSign, Lock, 
  ChevronRight, CheckCircle2, Sparkles, Layers, Terminal, Server,
  AlertCircle, Check, Phone, Plane, Thermometer, Compass, Fuel, Gauge,
  Car, CheckSquare, Wrench, Star, ShieldAlert
} from 'lucide-react';
import { AdminPortalModal } from './AdminPortalModal.tsx';

interface PPFPackage {
  id: string;
  name: string;
  basePrice: number;
  coverage: string[];
  filmThickness: string;
  warrantyYears: number;
}

const PACKAGES: PPFPackage[] = [
  {
    id: "TRACK-PACK",
    name: "Track Pack & High-Impact Zone",
    basePrice: 2450,
    coverage: ["Full Hood", "Front Bumper", "Fenders", "Mirror Caps", "Rocker Panels", "Rear Splash Guards"],
    filmThickness: "8.5 Mil Self-Healing Urethane",
    warrantyYears: 10
  },
  {
    id: "FULL-BODY-GLOSS",
    name: "Full Body Gloss Armor",
    basePrice: 6200,
    coverage: ["100% Painted Exterior Panels", "Door Edges & Cups", "Headlights & Taillights", "A-Pillars & Roof Front"],
    filmThickness: "10.0 Mil Hydrophobic Ultra-Gloss",
    warrantyYears: 12
  },
  {
    id: "STEALTH-SATIN",
    name: "Full Body Stealth Satin Conversion",
    basePrice: 7400,
    coverage: ["100% Painted Exterior (Satin Finish)", "Carbon Fiber Clear Protection", "Door Shuts & Inner Sills"],
    filmThickness: "10.0 Mil Satin-Matte Self-Healing",
    warrantyYears: 12
  }
];

export default function App() {
  const [step, setStep] = useState<number>(1);
  
  // Step 1: Vehicle Make & Model
  const [vehicleMake, setVehicleMake] = useState('Porsche');
  const [vehicleModel, setVehicleModel] = useState('911 GT3 RS (992)');
  const [vehicleYear, setVehicleYear] = useState('2024');
  const [paintCondition, setPaintCondition] = useState('Brand New Delivery (< 500 Miles)');

  // Step 2: Coverage Package
  const [selectedPkg, setSelectedPkg] = useState<PPFPackage>(PACKAGES[0]);

  // Step 3: Add-on Coatings
  const [ceramicCoating, setCeramicCoating] = useState(true); // +$950
  const [wheelOffCoating, setWheelOffCoating] = useState(true); // +$450
  const [windshieldArmor, setWindshieldArmor] = useState(false); // +$650

  // Step 4: Booking Details
  const [clientName, setClientName] = useState('Alexander Vance');
  const [targetDate, setTargetDate] = useState('2026-10-18');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const [isAdminOpen, setIsAdminOpen] = useState(
    typeof window !== 'undefined' && (
      window.location.search.includes('admin') || 
      window.location.pathname.endsWith('/admin') ||
      window.location.hash === '#admin'
    )
  );

  const calculateTotal = () => {
    let total = selectedPkg.basePrice;
    if (ceramicCoating) total += 950;
    if (wheelOffCoating) total += 450;
    if (windshieldArmor) total += 650;
    return total;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Telemetry Header */}
      <header className="border-b border-zinc-800 bg-[#0E0F14] px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 font-mono text-sm">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold tracking-wider text-emerald-400 flex items-center gap-2 text-base">
            <Shield size={18} /> CERAMIC SHIELD // AUTOMOTIVE PPF & COATING COVERAGE WIZARD
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 uppercase text-xs">ARCHETYPE C: STEPPER WIZARD</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-300">
            <Award size={14} className="text-emerald-400" />
            <span>XPEL & SUNTEK CERTIFIED MASTER INSTALLERS</span>
          </div>
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="px-3.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-lg text-xs font-mono font-bold transition-all"
          >
            [ STUDIO ATELIER PASS ]
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-6 sm:p-8 space-y-8">
        {/* Stepper Header */}
        <div className="bg-[#12131A] border border-zinc-800 p-5 sm:p-6 rounded-2xl shadow-xl font-mono">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                STAGE {step} OF 4
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-xs text-zinc-300">
                {step === 1 && "VEHICLE MAKE, MODEL & CONDITION"}
                {step === 2 && "PPF COVERAGE ARCHITECTURE"}
                {step === 3 && "NANO-CERAMIC COATING & ADD-ONS"}
                {step === 4 && "STUDIO BAY RESERVATION & DEPOSIT"}
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-400">{step * 25}% COMPLETE</span>
          </div>

          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
              style={{ width: `${step * 25}%` }}
            />
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-4 gap-2 mt-4 text-xs font-bold text-center">
            {['1. Vehicle', '2. PPF Package', '3. Coatings', '4. Reserve Bay'].map((label, i) => (
              <button
                key={label}
                onClick={() => setStep(i + 1)}
                className={`py-1.5 rounded-lg border transition-all ${
                  step === i + 1 
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40' 
                    : i + 1 < step 
                    ? 'border-zinc-700 text-zinc-300' 
                    : 'border-zinc-800 text-zinc-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Wizard Form Panels */}
        <div className="bg-[#12131A] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* STEP 1: VEHICLE MAKE & MODEL */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <Car className="text-emerald-400" /> Vehicle Profile & Paint Inspection
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Specify the chassis, model year, and factory paint finish condition.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase">Make</label>
                  <input 
                    type="text"
                    value={vehicleMake}
                    onChange={e => setVehicleMake(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-emerald-400 outline-none min-h-[44px]" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase">Model</label>
                  <input 
                    type="text"
                    value={vehicleModel}
                    onChange={e => setVehicleModel(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-emerald-400 outline-none min-h-[44px]" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase">Model Year</label>
                  <input 
                    type="text"
                    value={vehicleYear}
                    onChange={e => setVehicleYear(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-emerald-400 outline-none min-h-[44px]" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-zinc-400 uppercase">Current Paint Condition</label>
                <select 
                  value={paintCondition}
                  onChange={e => setPaintCondition(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-emerald-400 outline-none min-h-[44px]"
                >
                  <option>Brand New Delivery (&lt; 500 Miles)</option>
                  <option>Light Swirl Marks (1-Stage Paint Correction Required)</option>
                  <option>Moderate Swirls & Scratches (2-Stage Correction Required)</option>
                  <option>Factory Matte / Frozen Paint Finish</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: PPF COVERAGE ARCHITECTURE */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <Shield className="text-emerald-400" /> Paint Protection Film Package Selector
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Select your targeted panel coverage tier. Computer-cut patterns plotted with wrapped edges.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PACKAGES.map(pkg => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPkg(pkg)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedPkg.id === pkg.id 
                        ? 'bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-500/20' 
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-mono text-emerald-400 font-bold uppercase">{pkg.id}</div>
                      <h3 className="text-lg font-bold text-white mt-1">{pkg.name}</h3>
                      <div className="text-2xl font-black text-white font-mono mt-2">
                        ${pkg.basePrice.toLocaleString()}
                      </div>
                      
                      <div className="mt-4 space-y-1.5 text-xs text-zinc-300 font-mono">
                        {pkg.coverage.map(c => (
                          <div key={c} className="flex items-center gap-1.5">
                            <Check size={12} className="text-emerald-400 shrink-0" />
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-400">
                      <div>Film: {pkg.filmThickness}</div>
                      <div className="text-emerald-400 font-bold">Warranty: {pkg.warrantyYears} Years</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: NANO-CERAMIC COATING & ADD-ONS */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <Sparkles className="text-emerald-400" /> Ceramic Topcoat & Specialized Glass Armor
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Layer 9H hydrophobic ceramic protection over the film for extreme slickness and ease of maintenance.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  {
                    title: "9H Ceramic Coating Over Entire PPF Film",
                    price: 950,
                    state: ceramicCoating,
                    toggle: () => setCeramicCoating(!ceramicCoating),
                    desc: "Dual-layer hydrophobic coating enhancing self-cleaning and chemical resistance."
                  },
                  {
                    title: "Wheels-Off Ceramic Caliper & Barrel Coating",
                    price: 450,
                    state: wheelOffCoating,
                    toggle: () => setWheelOffCoating(!wheelOffCoating),
                    desc: "Full dismount of wheels; ceramic coating applied to barrels, faces, and brake calipers."
                  },
                  {
                    title: "ClearPlex Windshield Impact Protection Film",
                    price: 650,
                    state: windshieldArmor,
                    toggle: () => setWindshieldArmor(!windshieldArmor),
                    desc: "Exterior optically clear multi-layer barrier protecting windshield from rock chips."
                  }
                ].map(addon => (
                  <div
                    key={addon.title}
                    onClick={addon.toggle}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      addon.state 
                        ? 'bg-emerald-950/20 border-emerald-500/60 text-zinc-200' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                        addon.state ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-zinc-700 bg-black'
                      }`}>
                        {addon.state && <Check size={14} className="stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{addon.title}</div>
                        <div className="text-[11px] text-zinc-400">{addon.desc}</div>
                      </div>
                    </div>
                    <div className="text-base font-black text-emerald-400 font-mono">
                      +${addon.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Tally HUD */}
              <div className="p-5 bg-black/80 border border-emerald-500/40 rounded-xl flex justify-between items-center font-mono">
                <div>
                  <span className="text-xs text-zinc-400 uppercase">Estimated Build Price</span>
                  <div className="text-3xl font-black text-emerald-400 mt-0.5">
                    ${calculateTotal().toLocaleString()} USD
                  </div>
                </div>
                <div className="text-right text-xs text-zinc-400">
                  <div>10% Deposit Required: <strong className="text-white">${Math.round(calculateTotal() * 0.1)}</strong></div>
                  <div>Bay Turnaround: <strong className="text-white">3-4 Studio Days</strong></div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: STUDIO BAY RESERVATION & DEPOSIT */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <Calendar className="text-emerald-400" /> Studio Bay Intake & Appointment Schedule
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Lock in your dedicated cleanroom installation bay at our climate-controlled studio.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase">Client Full Name</label>
                  <input 
                    type="text"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-emerald-400 outline-none min-h-[44px]" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase">Target Drop-Off Date</label>
                  <input 
                    type="date"
                    value={targetDate}
                    onChange={e => setTargetDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-emerald-400 outline-none min-h-[44px]" 
                  />
                </div>
              </div>

              {/* Order Summary Confirmation Card */}
              <div className="bg-black/80 border border-zinc-800 p-5 rounded-xl font-mono text-xs space-y-2 text-zinc-300">
                <div className="text-emerald-400 font-bold uppercase tracking-wider pb-2 border-b border-zinc-800 flex justify-between">
                  <span>CLEANROOM INTAKE CERTIFICATE // PPF-{Math.floor(Math.random()*8999)+1000}</span>
                  <span className="text-white">STATUS: DRAFT</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div>Vehicle: <strong className="text-white">{vehicleYear} {vehicleMake} {vehicleModel}</strong></div>
                  <div>Condition: <strong className="text-white">{paintCondition.split('(')[0]}</strong></div>
                  <div>PPF Package: <strong className="text-emerald-400">{selectedPkg.name}</strong></div>
                  <div>Ceramic Coating: <strong className="text-white">{ceramicCoating ? 'Yes (9H)' : 'No'}</strong></div>
                  <div>Wheel Caliper Coat: <strong className="text-white">{wheelOffCoating ? 'Yes' : 'No'}</strong></div>
                  <div>Total Investment: <strong className="text-emerald-400 font-black text-sm">${calculateTotal().toLocaleString()} USD</strong></div>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-zinc-800 font-mono">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold rounded-xl flex items-center gap-2 text-sm transition-all min-h-[44px]"
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-xl flex items-center gap-2 text-sm transition-all shadow-lg shadow-emerald-500/20 min-h-[44px]"
              >
                Continue to Stage {step + 1} <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => setBookedSuccess(true)}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-xl flex items-center gap-2 text-sm transition-all shadow-lg shadow-emerald-500/30 min-h-[44px]"
              >
                {bookedSuccess ? '✓ CLEANROOM BAY RESERVED' : 'LOCK IN STUDIO RESERVATION & DEPOSIT'}
              </button>
            )}
          </div>
        </div>
      </main>

      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
