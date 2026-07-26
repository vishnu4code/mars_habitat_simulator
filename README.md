# mars_habitat_simulator
# 🚀 Mars Habitat Simulator
<img width="941" height="497" alt="image" src="https://github.com/user-attachments/assets/34c7baf0-6725-4831-9dce-0a3cb37b0c1b" />


Inspired by Andy Weir's *The Martian*, this interactive 
Mars habitat survival simulator models real NASA consumption 
rates, probabilistic crew events, and integrates live NASA 
APIs for asteroid tracking and Mars rover imagery.

## 🌍 Live Demo
(https://vishnu4code.github.io/mars_habitat_simulator)
## Features
- Real-time resource management (water, oxygen, food, energy)
- Crew morale system affecting mission outcome
- 10 probabilistic random events with realistic consequences
- Live NASA API integration:
  - Real-time near-Earth asteroid tracking
  - Mars rover imagery from NASA's image library
  - Simulated InSight lander atmospheric data
- Animated resource bars with color-coded status indicators
- Resource history chart via Chart.js
- Day-by-day playback with pause/resume and speed control
- Mission success/failure detection

## Technologies
- HTML5, CSS3, JavaScript (vanilla)
- Chart.js for data visualization
- NASA Open APIs (NeoWs, NASA Image Library)

## NASA Data Sources
- **Asteroids NeoWs** — live near-Earth object tracking
- **NASA Image and Video Library** — Mars surface imagery

## How to Run
1. Clone the repository
2. Add your NASA API key to `nasa.js`
3. Open `index.html` with Live Server
4. Set mission parameters and click Run Simulation

## Get a NASA API Key
Free at [api.nasa.gov](https://api.nasa.gov) — no credit card required.

## Future Development
- ARES-1 rover integration for live sensor telemetry
- Real atmospheric data replacing simulated readings
- Tech upgrade research tree
- Multiplayer mission coordination

## Inspiration
Built after reading Andy Weir's *The Martian* and wondering 
what a real mission control interface might look like for 
managing a Mars habitat's critical resources.
