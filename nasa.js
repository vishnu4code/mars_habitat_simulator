async function loadNasa() {
    const NASA_KEY = "Gb22wK5YJ6VUCZJqjbeqa7eeBhM1J7BdqfdZeQ00"
    loadMarsPhoto(NASA_KEY)     // ← matches the actual function name
    loadAsteroids(NASA_KEY)
    loadMarsWeather()
}
async function loadMarsPhoto(key) {
    const roverText  = document.getElementById('rover-text')
    const roverPhoto = document.getElementById('rover-photo')

    try {
        const searches = ['mars rover', 'mars surface', 'mars landscape', 'curiosity mars']
        const query    = searches[Math.floor(Math.random() * searches.length)]

        const response = await fetch(
            `https://images-api.nasa.gov/search?q=${query}&media_type=image`
        )
        const data   = await response.json()
        const items  = data.collection.items

        if (items.length > 0) {
            const item  = items[Math.floor(Math.random() * Math.min(items.length, 20))]
            const imgUrl = item.links[0].href
            const title  = item.data[0].title

            roverText.textContent    = `NASA Image: ${title}`
            roverPhoto.src           = imgUrl
            roverPhoto.style.display = 'block'
        } else {
            roverText.textContent = 'No images found.'
        }
    } catch(error) {
        roverText.textContent = 'NASA images unavailable.'
        console.log(error)
    }
}
async function loadAsteroids(key) {
    const asteroidE1 = document.getElementById('asteroid-alert')

    try {
        const today   = new Date().toISOString().split('T')[0]
        const response   =  await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${key}`
        )
        const data = await response.json()

        const allNeos   = Object.values(data.near_earth_objects || {}).flat()
        const hazardous = allNeos.filter(n => n.is_potentially_hazardous_asteroid)

        let text  = `Total asteroids near Earth today: ${allNeos.length}\n`
        text     += `Potentially hazardous: ${hazardous.length}\n`

        if (hazardous.length > 0) {
            const closest = hazardous[0]
            const missDist = Math.round(
                parseFloat(closest.close_approach_data[0].miss_distance.kilometers)
            ).toLocaleString()
            text += `Closest hazardous: ${closest.name}\n`
            text += `Miss distance: ${missDist} km`

        }else {
            text += 'No hazardous asteroids close today.'
        }
        asteroidE1.textContent = text
    } catch (error) {
        asteroidE1.textContent = 'Asteroid data unavailable - check your API key.'
        console.log(error)
    }
}
function loadMarsWeather() {
    const weatherE1 = document.getElementById('mars-weather')
    weatherE1.textContent = 
        'NASA InSight lander retired December 2022.\n' +
        'Simulated Mars conditions:\n\n' +
        'Avg Temperature : -60°C (range -125°C to 20°C)\n' +
        'Atmospheric Pressure : ~700 Pa\n' +
        'Wind Speed : 5 - 30 m/s\n' +
        'Gravity : 3.72 m/s²'
}