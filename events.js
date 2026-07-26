const EVENTS = [
    {
        name : "Solar Flare",
        probability : 0.08,
        description : "☀ SOLAR FLARE: Electronics damaged, energy drained!",
        effects:{energy: -200}
    },
    {
        name : "Dust Storm",
        probability : 0.15,
        description : "🌪 DUST STORM: Solar panels blocked! Energy production reduced.",
        effects :{energy: -150, oxygen: -30}
    },
    {
        name : "Water Recycler Malfunction",
        probability : 0.10,
        description : "🔧 MALFUNCTION: Water recycler offline for the day!",
        effects : {water: -300}
    },
    {
    name:"Micrometeorite Strike",
    probability:0.05,
    description:"☄ MICROMETEORITE: Hull breach patched but oxygen lost!",
    effects:{oxygen: -150, energy: -80}
    },
    {
        name:"Greenhouse Boost",
        probability:0.10,
        description:"🌱 GOOD NEWS: Greenhouse producing extra food today!",
        effects:{food: 100}
    },
    {
        name:"Water Ice Discovery",
        probability:0.08,
        description:"💧 DISCOVERY: Crew found subsurface water ice!",
        effects:{water: 500}
    },
    {
        name:"Equipment Failure",
        probability:0.12,
        description:"⚙ EQUIPMENT FAILURE: Life support systems strained!",
        effects:{oxygen: -80, energy: -100}
    },
    {
        name:"Crew Injury",
        probability: 0.06,
        description:"🏥 MEDICAL: Crew member injured, morale drops.",
        effects: {morale: -15}
    },
    {
        name:"Scientific Breakthrough",
        probability:0.07,
        description:"🔬 BREAKTHROUGH: Crew morale surges!",
        effects: {morale: 20}
    },
    {
        name: "Power Surge",
        probability:0.05,
        description:"⚡ POWER SURGE: Bonus energy from battery banks!",
        effects: {energy : 150}
    }
    ]