export const LAYER_SPECS = {
  glass: {
    id: 'glass',
    title: 'TEMPERED GLASS',
    shortQuote: 'Hail-resistant surface protection.',
    description: '3.2mm ultra-clear low-iron tempered solar glass engineered to maximize light transmittance while shielding sensitive photovoltaic cells against extreme mechanical loads.',
    thickness: '3.2 mm',
    transmittance: '94.6% Solar Transmittance',
    durability: 'Class 4 Hail Resistance (35mm @ 95 km/h)',
    coating: 'Dual-sided porous silica anti-reflective nanocoating',
    keyFeatures: [
      'Self-cleaning hydrophobic surface treatment reduces soiling loss by 42%',
      'Low-iron composition minimizes optical absorption in near-infrared spectrum',
      'Surface pre-stressing withstands 5,400 Pa front snow and 2,400 Pa wind uplift'
    ]
  },
  evaFront: {
    id: 'evaFront',
    title: 'EVA ENCAPSULANT (FRONT)',
    shortQuote: 'Cushions and protects the solar cells.',
    description: 'High-transparency ethylene-vinyl acetate cross-linked co-polymer film that bonds the tempered glass securely to the silicon wafer layer with zero air voids.',
    thickness: '0.45 mm',
    transmittance: '> 91.5% UV-to-visible transmittance',
    durability: 'PID-free (Potential Induced Degradation immune)',
    coating: 'Cross-linked gel content > 85%',
    keyFeatures: [
      'High thermal elasticity absorbs differential thermal expansion shocks',
      'Superior dielectric insulation preventing electrical leakage in humid climates',
      'Formulated with advanced UV absorbers to prevent yellowing over 30+ years'
    ]
  },
  cells: {
    id: 'cells',
    title: 'PHOTOVOLTAIC CELLS',
    shortQuote: 'Convert sunlight into usable electricity.',
    description: '144 half-cut N-type TOPCon (Tunnel Oxide Passivated Contact) monocrystalline bifacial silicon cells delivering industry-leading 23.4% conversion efficiency.',
    thickness: '130 μm Silicon Wafer',
    transmittance: '23.4% Module Efficiency',
    durability: '0.4% annual linear degradation guarantee',
    coating: '16-Busbar (16BB) micro-silver grid metallization',
    keyFeatures: [
      'Bifacial power generation captures up to 25% additional energy from rear albedo',
      'Superior low-light performance during sunrise, sunset, and overcast conditions',
      'Ultra-low temperature coefficient (-0.30%/°C) ensures high yield in summer heat'
    ]
  },
  evaRear: {
    id: 'evaRear',
    title: 'EVA ENCAPSULANT (REAR)',
    shortQuote: 'Encapsulates and seals the active matrix.',
    description: 'Specialized rear co-extruded encapsulant film providing mechanical cushioning, moisture barrier, and high rear-side optical reflection to boost internal photon recycling.',
    thickness: '0.45 mm',
    transmittance: 'Optimized internal light reflection (>88%)',
    durability: 'High peel strength (>70 N/cm adhesion to backsheet)',
    coating: 'Hydrolysis-resistant cross-linking resin',
    keyFeatures: [
      'Hermetically encapsulates delicate rear silver busbar solder joints',
      'Prevents delamination under extreme thermal cycling (-40°C to +85°C)',
      'High volume resistivity (>1×10¹⁵ Ω·cm) eliminates leakage currents'
    ]
  },
  backsheet: {
    id: 'backsheet',
    title: 'PROTECTIVE BACKSHEET',
    shortQuote: 'Helps insulate and protect the rear.',
    description: 'Multi-layer fluoropolymer (PVF/PET/PVF) composite rear barrier providing electrical insulation up to 1,500V DC and impermeable protection against humidity and chemicals.',
    thickness: '0.35 mm composite',
    transmittance: 'White high-reflectance internal surface',
    durability: '1,500V DC System Insulation Rating',
    coating: 'Tedlar® / Kynar® weather-resistant outer layer',
    keyFeatures: [
      'Zero moisture vapor transmission rate (WVTR < 1.0 g/m²·day)',
      'Impervious to salt mist, ammonia, sand abrasion, and acidic precipitation',
      'Engineered with high thermal conductivity to dissipate cell heat faster'
    ]
  },
  frame: {
    id: 'frame',
    title: 'ALUMINUM FRAME',
    shortQuote: 'Structural strength for secure mounting.',
    description: '40mm heavy-duty anodized 6005-T6 aerospace-grade aluminum alloy perimeter frame featuring internal drainage channels and torsion-resistant corner key locks.',
    thickness: '40 mm structural profile',
    transmittance: 'Brushed matte silver anodized finish (15μm)',
    durability: 'Mechanical load: 5,400 Pa Snow / 2,400 Pa Wind',
    coating: 'Electrolytic anodization with salt-spray corrosion resistance',
    keyFeatures: [
      'Integrated water drainage weep holes prevent winter ice-expansion damage',
      'Pre-punched precision grounding points and universal clamp mounting slots',
      'Torsion-resistant boxed cross-section prevents panel twist under extreme wind'
    ]
  },
  junctionBox: {
    id: 'junctionBox',
    title: 'JUNCTION BOX & WIRING',
    shortQuote: 'Connects the panel to the electrical system.',
    description: 'IP68 hermetically sealed junction box featuring three ultra-low forward-drop Schottky bypass diodes and premium UV-stabilized 4mm² solar cables with Stäubli MC4-Evo2 connectors.',
    thickness: 'IP68 Submersible Protection',
    transmittance: '1,500V DC / 30A Max Overcurrent',
    durability: 'Full silicone potting for moisture & thermal protection',
    coating: 'Flame retardant UL94-V0 polycarbonate housing',
    keyFeatures: [
      'Three bypass diodes isolate shaded cell strings to prevent destructive hot spots',
      'Original Stäubli MC4 connectors guarantee minimal contact resistance (<0.25 mΩ)',
      '1.2m halogen-free dual-core solar cable rated for 30 years outdoor exposure'
    ]
  }
};

