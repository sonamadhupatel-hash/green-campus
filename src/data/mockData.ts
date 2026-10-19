import { Initiative, Project, Activity, StudentContribution, StudentIdea, QuizQuestion, EcoBadge } from '../types';

export const INITIAL_INITIATIVES: Initiative[] = [
  {
    id: 'init-solar',
    title: 'Campus Rooftop Solar Photovoltaic Grid',
    category: 'Energy',
    description: 'Centralized 350 kWp rooftop solar photovoltaic network installed across the central library, engineering halls, and student dormitories, supplying clean renewable energy to academic facilities.',
    environmentalBenefits: [
      'Offsets approximately 280 metric tons of carbon emissions annually',
      'Provides 38% of day-shift campus electricity demand',
      'Serves as an educational testbed for renewable engineering research'
    ],
    status: 'Established',
    impactMetric: '350 kWp Generation Capacity (38% Daytime Power)',
    campusLocation: 'Central Library, Tech Block A & B, Hostel 4 Roofs',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    keyHighlights: ['Net metering enabled', 'Real-time solar inverter monitoring', 'Demonstrates UN SDG 7 & 13']
  },
  {
    id: 'init-waste',
    title: 'Smart Waste Segregation & Organic Composting',
    category: 'Waste',
    description: 'Campus-wide color-coded three-stream source segregation (Wet/Biodegradable, Dry/Recyclable, Sanitary/Hazardous) coupled with a 500 kg/day on-site aerobic composting unit.',
    environmentalBenefits: [
      'Diverts over 1,200 kg of canteen organic food waste every week',
      'Produces nutrient-rich organic compost utilized across campus gardens',
      'Eliminates methane output from municipal landfill decomposition'
    ],
    status: 'Active',
    impactMetric: '4.8 Metric Tons Organic Waste Diverted Monthly',
    campusLocation: 'All Dining Halls, Food Court, Agro-Compost Facility behind Green Shed',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
    keyHighlights: ['Automated shredder and microbial compost tumbler', 'Zero food waste audit every semester', 'SDG 12 compliance']
  },
  {
    id: 'init-water',
    title: 'Rainwater Harvesting & Bioswale Filtration',
    category: 'Water',
    description: 'Dual-system surface stormwater catchment and rooftop rainwater harvesting network feeding a 450,000-litre underground percolation reservoir and natural bioswale filtration ponds.',
    environmentalBenefits: [
      'Recharges regional groundwater aquifer through 6 deep percolation pits',
      'Supplies 100% of campus landscape irrigation during dry seasons',
      'Mitigates flash monsoon waterlogging across campus quads'
    ],
    status: 'Established',
    impactMetric: '450,000 Litres Storage & Recharging Capacity',
    campusLocation: 'Sports Complex, South Quad Bioswale, Academic Oval Basin',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    keyHighlights: ['Natural silt traps with gravel-sand filters', 'Low-energy solar submersion pump', 'Reduces municipal draw by 24%']
  },
  {
    id: 'init-transport',
    title: 'Green Campus Bike-Share & E-Mobility Fleet',
    category: 'Transport',
    description: 'Pedestrianized campus policy complemented by 120 shared mechanical bicycles, 6 solar-charged e-shuttles for accessibility, and dedicated peripheral vehicle parking.',
    environmentalBenefits: [
      'Eliminates internal combustion vehicle exhaust inside academic zones',
      'Encourages active physical mobility and student wellbeing',
      'Reduces campus ambient noise levels by 18 decibels'
    ],
    status: 'Expanding',
    impactMetric: '120 Bicycles & 6 Solar-Powered Electric Shuttles',
    campusLocation: '8 Bike Docking Hubs across Main Gate, Hostels, and Academic Blocks',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80',
    keyHighlights: ['Free student check-out system', 'Solar solar-roofed charging stations', 'Designated zero-emission campus zone']
  },
  {
    id: 'init-plantation',
    title: 'Native Species Tree Plantation & Urban Canopy',
    category: 'Biodiversity',
    description: 'Continuous student-led afforestation initiative focusing on indigenous drought-resilient trees (Neem, Peepal, Gulmohar, Jamun, Banyan) to cultivate microclimate cooling.',
    environmentalBenefits: [
      'Over 1,850 native saplings nurtured with an 89% two-year survival rate',
      'Lowers ambient summer surface temperatures by 2.4°C across concrete plazas',
      'Restores critical nesting corridors for local bird species'
    ],
    status: 'Active',
    impactMetric: '1,850+ Trees Planted Across 12 Hectares',
    campusLocation: 'North Green Belt, Outer Ring Road, Botanical Buffer Zone',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    keyHighlights: ['Geo-tagged saplings cared for by student batches', 'Drip irrigation infrastructure', 'Preserves local biodiversity']
  },
  {
    id: 'init-ewaste',
    title: 'Campus E-Waste Collection & Circular Recovery',
    category: 'Waste',
    description: 'Bi-monthly collection drives and permanent drop boxes for obsolete laboratory electronics, computing hardware, cables, and student device batteries coordinated with certified recyclers.',
    environmentalBenefits: [
      'Safely extracts heavy metals (lead, cadmium, mercury) preventing toxic runoff',
      'Returns precious non-renewable copper, gold, and rare earths to industrial supply',
      'Adheres strictly to State Pollution Control Board guidelines'
    ],
    status: 'Active',
    impactMetric: '620 kg E-Waste Safely Diverted This Year',
    campusLocation: 'Computer Science Department Foyer, Student Activity Center, Central Store',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    keyHighlights: ['Certified safe destruction protocols', 'Student hardware refurbishment workshop', 'Zero hazardous landfill leakage']
  },
  {
    id: 'init-cleanup',
    title: 'Campus Clean-up & Zero-Litter Action Squad',
    category: 'Waste',
    description: 'Volunteer-driven monthly plogging (jogging while picking up litter) sweeps across campus perimeters, sports grounds, and adjacent university village boundaries.',
    environmentalBenefits: [
      'Removes fugitive non-biodegradable plastics from natural drainage channels',
      'Educates student volunteers on consumption patterns and single-use packaging',
      'Strengthens civic responsibility and community cohesion'
    ],
    status: 'Active',
    impactMetric: '24 Successful Cleanup Missions Executed',
    campusLocation: 'Campus Perimeter Trails, Sports Complex, Open-Air Amphitheater',
    imageUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80',
    keyHighlights: ['Includes safety equipment and protective gloves', 'Audit of collected brand litter', 'Student eco-club leadership']
  },
  {
    id: 'init-garden',
    title: 'Botanical Biodiversity Garden & Pollinator Sanctuary',
    category: 'Biodiversity',
    description: 'A 2.5-acre dedicated organic garden featuring medicinal herb gardens, native wildflower meadows, butterfly host plants, and beehive observation boxes for biological sciences.',
    environmentalBenefits: [
      'Houses 140+ verified medicinal and native botanical plant varieties',
      'Provides rich nectar forage for honeybees, solitary bees, and butterflies',
      'Functions as an open-air ecology classroom and mental wellness haven'
    ],
    status: 'Established',
    impactMetric: '140+ Native Flora Species Documented',
    campusLocation: 'Adjacent to Biology & Environmental Science Block, East Campus',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
    keyHighlights: ['QR-coded informational botany placards', 'Zero synthetic pesticide policy', 'Rain-fed sprinkler system']
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-solar-phase2',
    name: 'Campus Solar Microgrid Expansion Phase II',
    category: 'Energy',
    status: 'Ongoing',
    objective: 'Add 200 kWp rooftop solar capacity on Student Hostels 5 through 8 with localized battery storage for critical lighting during grid outages.',
    description: 'This ongoing institutional initiative expands our existing 350 kWp solar footprint, aiming to push campus renewable electricity coverage past 50% of peak daylight load.',
    impactStatement: 'Expected to offset an additional 160 metric tons of CO2 annually and reduce hostel diesel generator reliance.',
    impactType: 'Expected',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    timeline: 'Q2 2026 – Q4 2026',
    progressPercent: 65
  },
  {
    id: 'proj-rainwater-network',
    name: 'Integrated Rainwater Cistern Network',
    category: 'Water',
    status: 'Completed',
    objective: 'Construct 450,000-litre filtration reservoir and surface bioswales to eliminate waterlogging and supply landscape irrigation.',
    description: 'Successfully deployed engineered bioswales alongside subterranean sedimentation tanks to capture 100% of monsoon downpours from library and sports complex roofs.',
    impactStatement: 'Saved 3.2 million litres of municipal piped water in its first full operational year of landscape watering.',
    impactType: 'Actual',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    timeline: 'Completed Jan 2026',
    progressPercent: 100
  },
  {
    id: 'proj-compost-facility',
    name: 'Automated Aerobic Compost Digestion Facility',
    category: 'Waste',
    status: 'Completed',
    objective: 'Establish an on-site microbial accelerated composting facility capable of handling 500 kg of daily organic dining waste.',
    description: 'The green shed facility operates twin rotary drums with biological temperature sensors, transforming cafeteria leftovers and lawn clippings into rich dark humus within 21 days.',
    impactStatement: 'Diverted 52,000 kg of food waste from town landfills to date, generating 14,000 kg of free garden compost.',
    impactType: 'Actual',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
    timeline: 'Completed Nov 2025',
    progressPercent: 100
  },
  {
    id: 'proj-botanical-sanctuary',
    name: 'Native Botanical Biodiversity Sanctuary',
    category: 'Biodiversity',
    status: 'Ongoing',
    objective: 'Transform 2.5 acres of underutilized scrubland into an indigenous floral reserve and open educational pollinator sanctuary.',
    description: 'Students and biology faculty are actively cataloguing regional flora, planting nectar-rich perennial species, and constructing insect hotels to restore ecological balance.',
    impactStatement: 'Expected to support over 65 bird and butterfly species documented in quarterly campus bioblitz audits.',
    impactType: 'Expected',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
    timeline: 'Q1 2026 – Q3 2026',
    progressPercent: 80
  },
  {
    id: 'proj-plastic-free',
    name: 'Comprehensive Single-Use Plastic Elimination Policy',
    category: 'Policy',
    status: 'Ongoing',
    objective: 'Phase out disposable plastic bottles, plastic cutlery, and polystyrene foam food containers campus-wide.',
    description: 'Enforces eco-friendly alternatives at all food stalls, installed 28 stainless steel chilled RO water refilling stations, and gifted reusable copper bottles to incoming first-year students.',
    impactStatement: 'Avoided an estimated 140,000 single-use plastic water bottles in the last academic calendar.',
    impactType: 'Actual',
    imageUrl: 'https://images.unsplash.com/photo-1526951521990-620dc14c214b?auto=format&fit=crop&w=1200&q=80',
    timeline: 'Academic Year 2025–2026',
    progressPercent: 90
  },
  {
    id: 'proj-led-hvac',
    name: 'Smart Sub-Metered LED & HVAC Optimization',
    category: 'Energy',
    status: 'Planned',
    objective: 'Replace remaining legacy fluorescent tubes with occupancy-sensor smart LEDs and optimize auditorium HVAC zoning.',
    description: 'Institutional engineering plan to implement IoT occupancy sensors and smart temperature throttling in large lecture halls, avoiding wasted lighting in empty classrooms.',
    impactStatement: 'Targeted to cut institutional lighting energy consumption by 28% upon full administrative rollout.',
    impactType: 'Expected',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    timeline: 'Planned for Q1 2027',
    progressPercent: 25
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-plantation-drive',
    title: 'Monsoon Campus Tree Plantation Drive',
    date: 'Saturday, Oct 24, 2026',
    time: '08:30 AM – 11:30 AM',
    location: 'North Campus Green Belt (Near Sports Pavilion)',
    description: 'Join faculty, green club members, and fellow students to plant 200 native saplings. Gloves, trowels, compost, and sapling tree guards are provided.',
    capacity: 60,
    registeredCount: 42,
    category: 'Plantation',
    organizer: 'Campus Eco-Club & Dept of Environmental Studies'
  },
  {
    id: 'act-cleanup-plog',
    title: 'Campus & Perimeter Zero-Waste Plogging Run',
    date: 'Wednesday, Oct 28, 2026',
    time: '04:30 PM – 06:00 PM',
    location: 'Starts at University Main Gate Fountain',
    description: 'Combine fitness and campus stewardship! We run, jog, and walk while collecting stray plastics and sorting them into recyclable bags. Refreshments served.',
    capacity: 45,
    registeredCount: 38,
    category: 'Clean-up',
    organizer: 'Student Sports Council & Green Volunteers'
  },
  {
    id: 'act-ewaste-day',
    title: 'Autumn Electronics & E-Waste Drop Day',
    date: 'Friday, Nov 06, 2026',
    time: '10:00 AM – 04:00 PM',
    location: 'Central Student Activity Center (SAC) Atrium',
    description: 'Bring dead laptop chargers, batteries, discarded wires, broken earphones, and old devices. Certified recyclers ensure non-polluting circular extraction.',
    capacity: 100,
    registeredCount: 65,
    category: 'Recycling',
    organizer: 'IEEE Student Branch & Campus Sustainability Office'
  },
  {
    id: 'act-compost-workshop',
    title: 'Hands-On Organic Composting & Soil Science Workshop',
    date: 'Monday, Nov 16, 2026',
    time: '02:00 PM – 04:00 PM',
    location: 'Agro-Compost Shed (Behind Botanical Garden)',
    description: 'Learn the exact science of carbon-to-nitrogen ratios, aeration, and moisture control. Take home a sample of rich organic compost for your dorm plants!',
    capacity: 35,
    registeredCount: 29,
    category: 'Workshop',
    organizer: 'College Horticulture Division'
  },
  {
    id: 'act-water-walk',
    title: 'Campus Watershed & Rainwater Cistern Inspection Walk',
    date: 'Thursday, Nov 26, 2026',
    time: '09:00 AM – 10:30 AM',
    location: 'Begins at Central Library Steps',
    description: 'An interactive technical tour of our 450,000-litre filtration tanks, bioswales, and recharge wells led by Civil Engineering professors.',
    capacity: 40,
    registeredCount: 22,
    category: 'Awareness',
    organizer: 'Civil & Environmental Engineering Society'
  },
  {
    id: 'act-cycling-parade',
    title: 'Green Commuter Cycling Rally & Bike Safety Clinic',
    date: 'Saturday, Dec 05, 2026',
    time: '07:30 AM – 09:30 AM',
    location: 'Main Administrative Quadrangle',
    description: 'Celebrate clean campus mobility! Enjoy a 5 km campus group ride followed by free bicycle brake adjustments, chain lubing, and helmet checks.',
    capacity: 50,
    registeredCount: 31,
    category: 'Transport',
    organizer: 'Campus Cycling Club & Campus Security'
  }
];

export const INITIAL_CONTRIBUTIONS: StudentContribution[] = [
  {
    id: 'contrib-1',
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.s@campus.edu',
    activityId: 'act-plantation-drive',
    activityTitle: 'Monsoon Campus Tree Plantation Drive',
    title: 'Planted 5 Neem & Jamun saplings in North Quad',
    description: 'Successfully prepped soil pits, mixed vermicompost, and planted 5 indigenous saplings with bamboo protective guards along the jogging path.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    submittedAt: '2026-10-10T10:30:00Z',
    isDemoRecord: true
  },
  {
    id: 'contrib-2',
    studentName: 'Priya Venkatesh',
    studentEmail: 'priya.v@campus.edu',
    activityId: 'act-ewaste-day',
    activityTitle: 'Autumn Electronics & E-Waste Drop Day',
    title: 'Recovered 14 legacy power supplies & 8 kg computer cables',
    description: 'Collected discarded peripherals from the second-floor hardware laboratory and segregated lithium battery packs from general circuit boards.',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    submittedAt: '2026-10-12T14:15:00Z',
    isDemoRecord: true
  },
  {
    id: 'contrib-3',
    studentName: 'Rohan Deshmukh',
    studentEmail: 'rohan.d@campus.edu',
    activityId: 'act-cleanup-plog',
    activityTitle: 'Campus & Perimeter Zero-Waste Plogging Run',
    title: 'Cleared 6 kg single-use packaging around lake perimeter',
    description: 'Formed a 4-person team during Wednesday plogging and cleared plastic bottle caps, snack wrappers, and beverage cartons from the stormwater culvert.',
    imageUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
    submittedAt: '2026-10-13T16:45:00Z',
    isDemoRecord: true
  }
];

export const INITIAL_IDEAS: StudentIdea[] = [
  {
    id: 'idea-1',
    title: 'Smart Solar-Powered Mobile Charging Benches',
    description: 'Install 6 weather-proof outdoor study benches with integrated photovoltaic canopies and USB charging ports in the central lawn to encourage outdoor studying without drawing grid power.',
    category: 'Energy',
    expectedBenefit: 'Generates estimated 2.4 kWh daily clean electricity while reducing indoor library overcrowding.',
    studentName: 'Devika Patel (B.Tech Electrical, Year 3)',
    submittedAt: '2026-10-08',
    status: 'Approved',
    upvotes: 38
  },
  {
    id: 'idea-2',
    title: 'Greywater Recycling for Mechanical Workshop Coolants',
    description: 'Filter treated air conditioning condensate and dormitory greywater through sand bed filters to supply water for landscaping and machinery cooling.',
    category: 'Water',
    expectedBenefit: 'Could conserve up to 8,000 litres of clean potable water every working week.',
    studentName: 'Karan Mehra (Mechanical Eng, Year 4)',
    submittedAt: '2026-10-09',
    status: 'Under Review',
    upvotes: 27
  },
  {
    id: 'idea-3',
    title: 'Campus Food Surplus Redistribution Shelf',
    description: 'Create a monitored temperature-controlled food pantry where unserved bakery items and pre-packaged cafeteria snacks are made available for late-night student study groups rather than being discarded.',
    category: 'Waste',
    expectedBenefit: 'Zero edible food waste while supporting students studying during midterms.',
    studentName: 'Ananya Sen (Bio-Sciences, Year 2)',
    submittedAt: '2026-10-11',
    status: 'Under Review',
    upvotes: 45
  },
  {
    id: 'idea-4',
    title: 'Dormitory Clothes Swapping & Second-Hand Book Kiosk',
    description: 'Set up an ongoing physical and digital barter kiosk during end-of-semester move-outs to prevent textbooks, lamps, and clothing from ending up in dumpsters.',
    category: 'Campus Infrastructure',
    expectedBenefit: 'Promotes circular economy culture and saves students money on academic supplies.',
    studentName: 'Siddharth Iyer (Management Studies, Year 3)',
    submittedAt: '2026-10-12',
    status: 'Submitted',
    upvotes: 19
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    topic: 'Recycling & Waste',
    question: 'Why should greasy cardboard pizza boxes NOT be mixed into standard paper recycling bins?',
    options: [
      'Cardboard is too thick for paper shredders',
      'Food grease cannot be separated during the water-based pulping process, ruining the entire batch',
      'Pizza boxes contain plastic laminates that melt in sunlight',
      'Recyclers only accept white paper products'
    ],
    correctIndex: 1,
    explanation: 'Grease and food oils contaminate the recycling slurry during paper pulping because oil and water do not mix. Greasy cardboard should go into compost or organic waste instead!'
  },
  {
    id: 'q2',
    topic: 'Renewable Energy',
    question: 'What is the primary operational advantage of rooftop solar panels on campus buildings?',
    options: [
      'They generate clean electricity directly where it is consumed, minimizing transmission losses',
      'They make building roofs completely cold in winter',
      'They store infinity energy without needing inverters or batteries',
      'They eliminate the need for electrical wiring inside buildings'
    ],
    correctIndex: 0,
    explanation: 'Distributed rooftop solar produces power at the point of consumption, reducing grid transmission losses and peak daytime utility strain while cutting carbon emissions.'
  },
  {
    id: 'q3',
    topic: 'Water Conservation',
    question: 'How do engineered bioswales support campus water sustainability?',
    options: [
      'They boil stagnant rainwater to prevent bacteria',
      'They use vegetation and gravel layers to slow runoff, filter pollutants, and recharge groundwater',
      'They pump water straight into municipal sewers at high speed',
      'They turn stormwater into immediate drinking water without any treatment'
    ],
    correctIndex: 1,
    explanation: 'Bioswales are gently sloped vegetative channels designed to slow down stormwater runoff, trap silt and pollutants, and facilitate natural infiltration into subterranean aquifers.'
  },
  {
    id: 'q4',
    topic: 'Climate Change',
    question: 'Which United Nations Sustainable Development Goal (SDG) specifically targets Urgent Action to Combat Climate Change?',
    options: [
      'SDG 7',
      'SDG 11',
      'SDG 13',
      'SDG 15'
    ],
    correctIndex: 2,
    explanation: 'UN SDG 13 is dedicated to "Climate Action", urging accelerated efforts to reduce greenhouse gas emissions, strengthen climate resilience, and integrate climate education.'
  },
  {
    id: 'q5',
    topic: 'Biodiversity',
    question: 'Why are native plant species preferred over exotic ornamental flora for campus green spaces?',
    options: [
      'Native plants are adapted to local climate and soil, require less water and fertilizer, and support local pollinator food webs',
      'Exotic plants are always illegal to grow',
      'Native plants grow three times faster than any other plant',
      'Native plants produce plastic-eating enzymes naturally'
    ],
    correctIndex: 0,
    explanation: 'Indigenous plant species evolve alongside native birds, bees, and soil microbes. They thrive without chemical pesticides or excess irrigation, preserving regional ecological balance.'
  },
  {
    id: 'q6',
    topic: 'Sustainable Transport',
    question: 'Replacing short solo car or motorcycle trips on campus with walking or cycling primarily cuts emissions of:',
    options: [
      'Radon and Argon gas',
      'Carbon dioxide (CO2), nitrogen oxides (NOx), and particulate matter (PM2.5)',
      'Ozone-layer replenishing helium',
      'Methane produced by bicycle tires'
    ],
    correctIndex: 1,
    explanation: 'Combustion engines on short cold-start trips emit significant CO2, NOx, and fine particulates. Active zero-emission transport immediately improves local campus air quality.'
  },
  {
    id: 'q7',
    topic: 'Campus Practices',
    question: 'What is the most environmentally sound way to manage dormitory energy use?',
    options: [
      'Leave air conditioners running 24/7 at 16°C so rooms stay pre-cooled',
      'Set thermostat temperature to an eco-friendly 24°C–25°C, utilize natural cross-ventilation, and switch off unplugged phantom chargers',
      'Cover all windows with aluminum foil and never open blinds',
      'Keep dormitory lights turned on to scare away insects'
    ],
    correctIndex: 1,
    explanation: 'Setting air conditioners to 24°C–25°C reduces cooling load by up to 18% compared to 18°C. Unplugging idling chargers stops vampire energy drain.'
  },
  {
    id: 'q8',
    topic: 'Recycling & Waste',
    question: 'What happens to properly collected electronic waste (e-waste) at certified recycling facilities?',
    options: [
      'It is buried in farm fields to fertilize crops',
      'Hazardous materials are safely neutralized while valuable metals like copper, gold, and palladium are recovered for reuse',
      'It is burned in open incinerators to generate electricity',
      'It is dumped into ocean containment chambers'
    ],
    correctIndex: 1,
    explanation: 'Certified e-waste recycling uses specialized mechanical shredding and chemical refinement to salvage precious metals while capturing toxic heavy metals like mercury and lead safely.'
  },
  {
    id: 'q9',
    topic: 'Water Conservation',
    question: 'A dripping campus tap leaking at one drop per second wastes approximately how much water in a single year?',
    options: [
      'Less than 50 litres',
      'Around 200 litres',
      'More than 10,000 litres of clean potable water',
      'Exactly 1,000 litres'
    ],
    correctIndex: 2,
    explanation: 'A single faucet leaking one drop per second wastes over 3,000 gallons (roughly 11,350 litres) of treated drinking water annually. Promptly reporting campus leaks makes a massive difference!'
  },
  {
    id: 'q10',
    topic: 'Campus Practices',
    question: 'Under the Green Campus framework, what does the "INITIATE" pillar empower students to do?',
    options: [
      'Inspect physical college accounting records without permission',
      'Propose creative new sustainability ideas, solutions, and policy improvements for administrative evaluation',
      'Control college electrical switchboards remotely',
      'Demand mandatory homework cancellations on rainy days'
    ],
    correctIndex: 1,
    explanation: 'The INITIATE pillar provides an open innovation portal for students to submit concrete environmental ideas, solicit peer feedback, and propose sustainability improvements to campus administration.'
  },
  {
    id: 'q11',
    topic: 'Biodiversity',
    question: 'What crucial ecosystem service do campus honeybees, butterflies, and solitary bees provide?',
    options: [
      'They consume concrete dust from construction sites',
      'They pollinate flowering plants, enabling fruit, seed, and botanical reproduction essential to biodiversity',
      'They purify tap water through their wings',
      'They prevent campus Wi-Fi interference'
    ],
    correctIndex: 1,
    explanation: 'Over 75% of flowering plants and major food crops depend on insect pollinators. Campus botanical gardens ensure healthy pollinator populations can thrive.'
  },
  {
    id: 'q12',
    topic: 'Climate Change',
    question: 'What is the primary greenhouse gas emitted by rotting organic food waste trapped inside oxygen-deprived municipal landfills?',
    options: [
      'Nitrogen gas',
      'Methane (CH4), which possesses over 25 times the warming potential of CO2 over a century',
      'Argon gas',
      'Pure Oxygen'
    ],
    correctIndex: 1,
    explanation: 'Anaerobic decomposition in tightly compacted landfills produces potent methane gas. Aerobic composting on campus circulates oxygen, avoiding methane formation and yielding rich organic soil!'
  }
];

export const INITIAL_BADGES: EcoBadge[] = [
  {
    id: 'badge-beginner',
    name: 'Eco Beginner',
    description: 'Began the sustainability journey by registering for an activity or taking the initial eco awareness quiz.',
    thresholdPoints: 20,
    iconName: 'Sprout',
    unlocked: false
  },
  {
    id: 'badge-guardian',
    name: 'Green Guardian',
    description: 'Demonstrated active campus stewardship with 60+ eco points through activities and ideas.',
    thresholdPoints: 60,
    iconName: 'ShieldCheck',
    unlocked: false
  },
  {
    id: 'badge-champion',
    name: 'Sustainability Champion',
    description: 'Achieved elite campus environmental leadership with 120+ eco points across all three pillars.',
    thresholdPoints: 120,
    iconName: 'Award',
    unlocked: false
  }
];

export const GREEN_RESOURCES = [
  {
    id: 'res-energy',
    category: 'Energy',
    title: 'Dorm & Classroom Energy Efficiency Playbook',
    tips: [
      'Leverage natural daylight during morning study hours instead of overhead LED arrays.',
      'Configure laptops and desktop monitors to sleep after 5 minutes of inactivity.',
      'Set dorm room AC units to a comfortable 24°C–25°C rather than freezing sub-20°C levels.',
      'Always switch off lecture hall projectors and sound gear when class concludes.'
    ]
  },
  {
    id: 'res-water',
    category: 'Water',
    title: 'Water Conservation & Leak Prevention Guide',
    tips: [
      'Carry a reusable stainless-steel bottle to utilize filtered water refilling stations.',
      'Turn off the faucet while brushing teeth or scrubbing hands with soap.',
      'Report dripping restroom taps immediately through the Green Campus feedback portal.',
      'Choose shorter 5-minute showers in student residences to save up to 40 litres per session.'
    ]
  },
  {
    id: 'res-waste',
    category: 'Waste',
    title: 'Campus 3-Stream Waste Segregation Matrix',
    tips: [
      'Green Bin (Wet): Fruit peels, meal leftovers, coffee grounds, plant clippings.',
      'Blue Bin (Dry): Clean paper, rinsed beverage cartons, plastic bottles, metal cans.',
      'Red Bin (Hazardous/Sanitary): Batteries, sanitary napkins, laboratory glassware, blister packs.',
      'Always rinse food containers before depositing in recycling to avoid batch contamination.'
    ]
  },
  {
    id: 'res-transport',
    category: 'Transport',
    title: 'Active Mobility & Carbon-Free Commuting',
    tips: [
      'Borrow campus bikes from docking hubs at Main Gate and Central Library for quick transit.',
      'Organize walking study groups between hostels and athletic grounds.',
      'Utilize electric campus shuttles when transporting heavy lab gear or equipment.',
      'Car-pool with fellow department students for off-campus weekend transit.'
    ]
  }
];

export const FAQS = [
  {
    q: 'What is the core mission of Green Campus?',
    a: 'Green Campus is a digital environmental engagement platform designed for our college. It unites institutional sustainability achievements (SHOW) with direct student involvement in drives and cleanups (PARTICIPATE) and empowers students to propose forward-thinking environmental solutions (INITIATE).'
  },
  {
    q: 'Does Green Campus automate physical campus hardware directly?',
    a: 'No. Green Campus is an honest digital engagement and awareness platform. It does not pretend to remotely control campus electrical switchgear or municipal valves; instead, it empowers the human community to track, participate, and advocate for sustainability.'
  },
  {
    q: 'How are Eco Points calculated in this demo?',
    a: 'Students earn 15 demo points for registering for an activity, 25 points for submitting verified demo work, 20 points for submitting a green proposal, and 10–25 points for completing eco awareness quizzes. Points unlock demo badges (Eco Beginner, Green Guardian, Sustainability Champion).'
  },
  {
    q: 'Can I propose a new green initiative for my department?',
    a: 'Yes! Head over to the "Green Resources & Ideas" page and fill out the Student Green Idea form. Describe your idea, select a category, and articulate the expected environmental benefit. Once submitted, peers can view and upvote your proposal.'
  },
  {
    q: 'How is data persisted in this prototype?',
    a: 'All registrations, user contributions, submitted ideas, upvotes, quiz scores, and unlocked badges are stored safely in your browser\'s local storage (`localStorage`). You can reset the demo data anytime from the banner or footer.'
  }
];

export const CAMPUS_STATIC_METRICS = {
  treesPlanted: 1850,
  wasteRecycledKg: 52400,
  waterSavedLitres: 3200000,
  solarCapacityKwp: 350,
  solarDaytimeCoveragePercent: 38,
  activeProjects: 6,
  totalEventsOrganized: 24,
  label: 'Illustrative Campus Demo Benchmark Data'
};
