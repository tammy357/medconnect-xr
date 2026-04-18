document.addEventListener('DOMContentLoaded', () => {
  const sceneEl = document.querySelector('a-scene');
  const startBtn = document.getElementById('start-scan-btn');
  const landingPage = document.getElementById('landing-page');
  const statusOverlay = document.getElementById('status-overlay');
  const medBtn = document.getElementById('medication-btn');
  
  // AR Entities
  const heart = document.getElementById('heart');
  const hud = document.getElementById('hud-panel');
  const scanLine = document.getElementById('scan-light');
  const heartLight = document.getElementById('gold-light');

  // HUD Text Elements
  const aggrDisp = document.querySelector('#aggr-display');
  const riskDisp = document.querySelector('#risk-display');
  const flowDisp = document.querySelector('#flow-display');
  const statusDisp = document.querySelector('#hudStatus');

  // 1. INITIALIZE FROM FRONT PAGE
  startBtn.addEventListener('click', () => {
    landingPage.classList.add('hidden');
    statusOverlay.classList.remove('hidden');
    medBtn.classList.remove('hidden');
    sceneEl.systems['mindar-image-system'].start();
  });

  // 2. TRACKING LOGIC (The "Sync")
  const targetEl = document.querySelector('#heart-target');
  targetEl.addEventListener("targetFound", () => {
    statusOverlay.textContent = "SYNCED: BAYER ASPIRIN DETECTED";
    statusOverlay.style.background = "rgba(0, 229, 255, 0.7)";
    hud.setAttribute('visible', 'true');
    scanLine.setAttribute('visible', 'true');
  });

  targetEl.addEventListener("targetLost", () => {
    statusOverlay.textContent = "SCANNING FOR ASA SOURCE...";
    statusOverlay.style.background = "rgba(0, 0, 0, 0.5)";
    hud.setAttribute('visible', 'false');
  });

  // 3. PHYSIOLOGICAL MAPPING (The Effect)
  medBtn.addEventListener('click', () => {
    // A. Transition Heart to Protected State
    heart.setAttribute('material', 'color: #ffd700; emissive: #ffd700; emissiveIntensity: 0.6');
    heart.setAttribute('animation__pulse', 'dur: 1500'); // Slowing down cardiac work
    heartLight.setAttribute('intensity', '1.5');

    // B. Map Antithrombotic Data
    aggrDisp.setAttribute('text', 'value: PLATELET AGGR: INHIBITED; color: #00ff00');
    riskDisp.setAttribute('text', 'value: CLOT RISK: MINIMAL; color: #00ff00');
    flowDisp.setAttribute('text', 'value: FLOW: OPTIMIZED; color: #ffffff');
    statusDisp.setAttribute('text', 'value: EFFECT: ANTI-THROMBOTIC ACTIVE; color: #ffd700');

    // C. Update UI Feedback
    medBtn.textContent = "DOSE CONFIRMED";
    medBtn.style.background = "rgba(34, 197, 94, 0.4)";
    medBtn.disabled = true;

    // Create a confirmation ring "burst"
    createPulseRing();
  });

  function createPulseRing() {
    const ring = document.createElement('a-ring');
    ring.setAttribute('radius-inner', '0.01');
    ring.setAttribute('radius-outer', '0.02');
    ring.setAttribute('color', '#ffd700');
    ring.setAttribute('position', '0 0 0.05');
    ring.setAttribute('animation', 'property: geometry.radiusOuter; to: 0.15; dur: 1000; easing: easeOutQuad');
    ring.setAttribute('animation__fade', 'property: opacity; from: 1; to: 0; dur: 1000');
    document.querySelector('#heart-target').appendChild(ring);
    setTimeout(() => ring.remove(), 1000);
  }
});