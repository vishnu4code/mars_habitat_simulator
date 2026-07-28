let chart = null
let simInterval = null
let currentSimDay = 0
let paused = false

let waterHistory = []
let oxygenHistory = []
let foodHistory = []
let energyHistory = []

function setBar(barId, valId, current, max, color, unit) {
    const pct = Math.max(0, Math.min(100, (current / max) * 100))
    const bar = document.getElementById(barId)
    const val = document.getElementById(valId)
    bar.style.width      = pct + '%'
    bar.style.background = pct > 60 ? color : pct > 30 ? '#f97316' : '#ef4444'
    val.textContent      = Math.round(current) + ' ' + unit
}

function updateBars() {
    setBar('bar-water',  'val-water',  water,  maxWater,  '#38bdf8', 'L')
    setBar('bar-oxygen', 'val-oxygen', oxygen, maxOxygen, '#a78bfa', 'kg')
    setBar('bar-food',   'val-food',   food,   maxFood,   '#4ade80', 'kg')
    setBar('bar-energy', 'val-energy', energy, maxEnergy, '#facc15', 'kWh')
    setBar('bar-morale', 'val-morale', morale, 100,       '#fb923c', '%')
}

function logDay(day) {
    const log = document.getElementById('log-entries')
    log.innerHTML += `<div class="log-day">--- DAY ${day} ---</div>`
    scrollLog()
}

function logMessage(message, cssClass) {
    const log = document.getElementById('log-entries')
    log.innerHTML += `<div class="${cssClass}">${message}</div>`
    scrollLog()
}

function scrollLog() {
    const logPanel = document.getElementById('event-log')
    logPanel.scrollTop = logPanel.scrollHeight
}

function clearLog() {
    document.getElementById('log-entries').innerHTML = ''
}

function setStatus(text, cssClass) {
    const badge = document.getElementById('status-badge')
    badge.textContent = text
    badge.className   = cssClass
}

function updateDayCounter() {
    document.getElementById('day-counter').textContent = 'Day ' + currentDay
}

function drawChart(waterHistory, oxygenHistory, foodHistory, energyHistory) {
    const ctx = document.getElementById('resourceChart').getContext('2d')
    if (chart) chart.destroy()
    const labels = waterHistory.map((_, i) => i)
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                { label: 'Water (L)',    data: waterHistory,  borderColor: '#38bdf8', borderWidth: 2, pointRadius: 0, tension: 0.3 },
                { label: 'Oxygen (kg)', data: oxygenHistory, borderColor: '#a78bfa', borderWidth: 2, pointRadius: 0, tension: 0.3 },
                { label: 'Food (kg)',   data: foodHistory,   borderColor: '#4ade80', borderWidth: 2, pointRadius: 0, tension: 0.3 },
                { label: 'Energy (kWh)',data: energyHistory, borderColor: '#facc15', borderWidth: 2, pointRadius: 0, tension: 0.3 },
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#94a3b8' } } },
            scales: {
                x: { ticks: { color: '#475569' }, grid: { color: '#1e293b' } },
                y: { ticks: { color: '#475569' }, grid: { color: '#1e293b' } }
            }
        }
    })
}

function getSpeed(){
    const speed = document.getElementById('speedControl').value
    if (speed === 'slow') return 1000
    if (speed === 'normal') return 400
    if (speed === 'fast') return 100
    return 400
}

function runDay(){
    if (currentSimDay >= days) {finishSim(); return }
    dailyCycle()
    const eventMessages = applyEvents()
    const failure = checkFailure()
    const warnings = checkWarnings()
    updateDayCounter()
    updateBars()
    logDay(currentDay)
    for (let msg of eventMessages) logMessage(msg, 'log-event')
    for (let warn of warnings) logMessage(warn, 'log-warning')
    waterHistory.push(water)
    oxygenHistory.push(oxygen)
    foodHistory.push(food)
    energyHistory.push(energy)
    currentSimDay++
    if (failure) {
        logMessage('MISSION FAILURE:' + failure, 'log-failure')
        setStatus(failure, 'failed')
        finishSim()
    }
}
function finishSim(){
    clearInterval(simInterval)
    simInterval = null
    currentSimDay = 0
    paused = false
    document.getElementById('runBtn').disabled = false
    document.getElementById('pauseBtn').textContent = '⏸ Pause'
    if (document.getElementById('status-badge').textContent === 'ACTIVE'){
        logMessage('MISSION SUCCESFULL - All crew survived!', 'log-success')
        setStatus('SUCCESS', 'success')
    }
    drawChart(waterHistory, oxygenHistory, foodHistory, energyHistory)
    loadNasa()
}

function pauseSim(){
    if(!simInterval && !paused) return
    if (paused) {
        paused = false
        document.getElementById('pauseBtn').textContent = '⏸ Pause'
        simInterval = setInterval(runDay, getSpeed())
    }  else {
        paused = true
        clearInterval(simInterval)
        simInterval = null
        document.getElementById('pauseBtn').textContent = '▶ Resume'
    }
}
function runSim() {
    if (simInterval) return;

    clearLog()
    setupSimulation()
    setStatus('ACTIVE', 'active')

    waterHistory  = [water]
    oxygenHistory = [oxygen]
    foodHistory   = [food]
    energyHistory = [energy]

    currentSimDay = 0
    paused        = false

    document.getElementById('runBtn').disabled = true

    simInterval = setInterval(runDay, getSpeed())
}
