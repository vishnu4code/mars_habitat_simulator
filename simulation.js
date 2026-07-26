let water, oxygen, food, energy, morale
let maxWater, maxOxygen, maxFood, maxEnergy
let crew, solar, days
let currentDay = 0
let missionActive = false

function setupSimulation(){
    crew = Math.min(100, Math.max(1,parseInt(document.getElementById('crew').value)))
    solar = parseFloat(document.getElementById('solar').value)
    days = parseInt(document.getElementById('days').value)

    water = parseFloat(document.getElementById('water').value)
    oxygen = parseFloat(document.getElementById('oxygen').value)
    food = parseFloat(document.getElementById('food').value)
    energy = parseFloat(document.getElementById('energy').value)
    morale = 100

    maxWater = water
    maxOxygen = oxygen
    maxFood = food
    maxEnergy = energy + (solar * 0.8 * days)

    currentDay = 0
    missionActive = true
}
function dailyCycle(){
    currentDay++

    let waterUsed = crew * 3.5
    let oxygenUsed = crew * 0.84
    let foodUsed = crew * 1.8
    let energyUsed = crew * 15
    let wasteProduced = crew * 4.5

    let energyProduced = solar * 0.8
    let recycledWater = wasteProduced * 0.7
    let oxygenProduced = wasteProduced * 0.25

    water = Math.max(0, water - waterUsed + recycledWater)
    oxygen = Math.max(0, oxygen - oxygenUsed + oxygenProduced)
    food = Math.max(0, food - foodUsed)
    energy = Math.max(0, energy - energyUsed + energyProduced)

    if (water < 1000) morale -=2
    if (oxygen < 500) morale -=3
    if (food < 200) morale -=4
    if (energy < 200) morale -=2
    morale = Math.min(100, Math.max(0,morale))
}
function applyEvents(){
    let eventMessages = []

    for (let event of EVENTS) {
        if (Math.random() < event.probability){
            if (event.effects.energy) energy = Math.max(0, energy + event.effects.energy)
            if (event.effects.food) food = Math.max(0, food + event.effects.food)
            if (event.effects.water) water = Math.max(0, water + event.effects.water)
            if (event.effects.oxygen) oxygen = Math.max(0, oxygen + event.effects.oxygen)
            if (event.effects.morale) morale = Math.min(100, Math.max(0,morale + event.effects.morale))
            eventMessages.push(event.description)
        }
    }
    return eventMessages
}
function checkFailure(){
    if (water <= 50) return "WATER DEPLETED"
    if (oxygen <= 30) return "OXYGEN DEPLETED"
    if (food <= 50) return "FOOD DEPLETED"
    if (energy <= 50) return "ENERGY DEPLETED"
    if (morale <= 0) return "CREW MORALE COLLAPSED"
    return null
}
function checkWarnings(){
    let warnings = []
    if (water < 1000) warnings.push("WARNING: WATER LEVEL LOW")
    if (oxygen < 500)  warnings.push("WARNING: OXYGEN CRITICAL")
    if (food   < 200)  warnings.push("WARNING: FOOD SUPPLY LOW")
    if (energy < 200)  warnings.push("WARNING: ENERGY LOW")
    if (morale < 30)   warnings.push("WARNING: CREW MORALE LOW")
    return warnings
}
