document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing app.js');

  const sceneEl = document.querySelector('a-scene');
  const startBtn = document.getElementById('start-scan-btn');
  const landingPage = document.getElementById('landing-page');
  const statusOverlay = document.getElementById('status-overlay');
  const medBtn = document.getElementById('medication-btn');
  const debugPanel = document.getElementById('debug-panel');
  const debugContent = document.getElementById('debug-content');

  // Helper function to update debug panel
  function updateDebug(message) {
    if (debugContent) {
      debugContent.innerHTML += message + '<br>';
      // Keep only last 20 lines
      const lines = debugContent.innerHTML.split('<br>');
      if (lines.length > 20) {
        debugContent.innerHTML = lines.slice(-20).join('<br>');
      }
    }
  }

  // Show debug panel on startup
  setTimeout(() => {
    if (debugPanel) debugPanel.style.display = 'block';
    updateDebug('[' + new Date().toLocaleTimeString() + '] App initialized');
  }, 500);

  console.log('Elements found:', {
    sceneEl: !!sceneEl,
    startBtn: !!startBtn,
    landingPage: !!landingPage,
    statusOverlay: !!statusOverlay,
    medBtn: !!medBtn
  });

  // Test button clickability
  if (startBtn) {
    console.log('Start button found, adding click handler');
  } else {
    console.error('Start button not found!');
  }

  // AR Entities
  const heart = document.getElementById('heart');
  const hud = document.getElementById('hud-panel');
  const scanLine = document.getElementById('scan-light');
  const heartLight = document.getElementById('gold-light');

  // HUD Text Elements
  const actionDisp = document.querySelector('#action-display');
  const benefitDisp = document.querySelector('#benefit-display');
  const adherenceDisp = document.querySelector('#adherence-display');

  console.log('AR entities found:', {
    heart: !!heart,
    hud: !!hud,
    scanLine: !!scanLine,
    heartLight: !!heartLight
  });

  // Wait for A-Frame to be ready
  sceneEl.addEventListener('loaded', () => {
    console.log('======================================');
    console.log('A-Frame scene loaded');
    const mindAR = sceneEl.systems['mindar-image-system'];
    console.log('MindAR system available:', !!mindAR);
    console.log('MindAR system state:', mindAR ? mindAR.constructor.name : 'N/A');
    console.log('MINDAR global available:', typeof MINDAR !== 'undefined');
    console.log('Scene attributes:', sceneEl.getAttribute('mindar-image'));
    console.log('======================================');
    updateDebug('✅ A-Frame scene loaded');
    updateDebug('MindAR system: ' + (!!mindAR ? 'READY' : 'MISSING'));
    updateDebug('Targets.mind: ./targets.mind');
    startBtn.disabled = false;
    startBtn.textContent = 'INITIALIZE SYSTEM';
    console.log('Start button enabled and ready');
  });

  // Fallback: Enable button after 5 seconds if scene doesn't load
  setTimeout(() => {
    if (startBtn.disabled) {
      console.log('Fallback: Enabling start button after timeout');
      startBtn.disabled = false;
      startBtn.textContent = 'INITIALIZE SYSTEM (FALLBACK)';
    }
  }, 5000);

  // Initially disable start button until scene is ready
  startBtn.disabled = true;
  console.log('Start button initially disabled');

  // 1. INITIALIZE FROM FRONT PAGE
  startBtn.addEventListener('click', async () => {
    console.log('Start button clicked');
    updateDebug('🔄 Initializing AR...');

    landingPage.classList.add('hidden');
    statusOverlay.classList.remove('hidden');
    medBtn.classList.remove('hidden');
    statusOverlay.textContent = "INITIALIZING AR SYSTEM...";
    statusOverlay.style.background = "rgba(0, 0, 0, 0.7)";

    console.log('Starting MindAR system...');
    console.log('MindAR system object:', sceneEl.systems['mindar-image-system']);
    
    if (sceneEl.systems['mindar-image-system']) {
      try {
        updateDebug('📹 Starting camera...');
        const startResult = await sceneEl.systems['mindar-image-system'].start();
        console.log('MindAR system started:', startResult);
        console.log('Targets.mind loaded - waiting for aspirin label detection...');
        updateDebug('✅ Camera active');
        updateDebug('📊 Awaiting label detection');
        statusOverlay.textContent = "POINT AT ASPIRIN LABEL...";
        statusOverlay.style.background = "rgba(0, 0, 0, 0.5)";
      } catch (error) {
        console.error('Failed to start MindAR system:', error);
        updateDebug('❌ Camera error: ' + error.message);
        statusOverlay.textContent = "ERROR: " + error.message;
        statusOverlay.style.background = "rgba(255, 0, 0, 0.7)";
        return;
      }
    } else {
      console.error('MindAR system not found');
      console.log('Available systems:', Object.keys(sceneEl.systems));
      updateDebug('❌ MindAR system missing');
      statusOverlay.textContent = "SYSTEM ERROR: AR not available";
      statusOverlay.style.background = "rgba(255, 0, 0, 0.7)";
      return;
    }

    if (window.audioPlayer) window.audioPlayer.startScanSound();

  });

  // 2. TRACKING LOGIC (The "Sync") - ASPIRIN LABEL DETECTION
  const targetEl = document.querySelector('#heart-target');
  
  if (targetEl) {
    console.log('✅ Target element found, setting up detection listeners');
    updateDebug('✅ Target #heart-target ready');
    
    targetEl.addEventListener("targetFound", () => {
      console.log('🎯 ASPIRIN LABEL DETECTED!');
      console.log('Target position:', targetEl.getAttribute('position'));
      console.log('HUD should now be visible');
      updateDebug('🎯 ASPIRIN DETECTED!');
      updateDebug('Displaying education...');
      
      if (window.audioPlayer) {
        window.audioPlayer.stopScanSound();
        window.audioPlayer.playSuccess();
      }
      statusOverlay.textContent = "✓ ASPIRIN DETECTED - EDUCATION ACTIVE";
      statusOverlay.style.background = "rgba(0, 229, 255, 0.7)";
      hud.setAttribute('visible', 'true');
      scanLine.setAttribute('visible', 'true');
    });

    targetEl.addEventListener("targetLost", () => {
      console.log('Target lost - aspirin out of frame');
      updateDebug('Out of frame - move label back');
      if (window.audioPlayer) window.audioPlayer.startScanSound();
      statusOverlay.textContent = "POINT AT ASPIRIN LABEL...";
      statusOverlay.style.background = "rgba(0, 0, 0, 0.5)";
      hud.setAttribute('visible', 'false');
      scanLine.setAttribute('visible', 'false');
    });
  } else {
    console.error('❌ Target element #heart-target not found!');
    updateDebug('❌ Target element missing!');
  }

  // 3. PATIENT EDUCATION & TREATMENT ADHERENCE
  medBtn.addEventListener('click', () => {
    if (window.audioPlayer) window.audioPlayer.playSuccess();

    // A. Show Aspirin Mode of Action
    actionDisp.setAttribute('text', 'value: IRREVERSIBLE COX-1 INHIBITION; color: #00ff00');
    benefitDisp.setAttribute('text', 'value: REDUCES CARDIOVASCULAR EVENTS BY 25%; color: #00ff00');
    adherenceDisp.setAttribute('text', 'value: ADHERENCE SAVES LIVES - STAY CONSISTENT; color: #ff6b9d');

    // B. Visual Heart Protection Effect
    heart.setAttribute('material', 'color: #00ff88; emissive: #00ff88; emissiveIntensity: 0.4');
    heart.setAttribute('animation__pulse', 'dur: 2000'); // Healthy, protected rhythm
    heartLight.setAttribute('intensity', '1.2');
    heartLight.setAttribute('color', '#00ff88');

    // C. Educational Audio Feedback
    const educationAudio = new Audio('./sound effects/AI Narration/Intro Aspirin.mp3');
    educationAudio.play().catch(e => console.warn('Education audio blocked', e));

    // D. Update UI Feedback
    medBtn.textContent = "EDUCATION RECEIVED";
    medBtn.style.background = "rgba(34, 197, 94, 0.4)";
    medBtn.disabled = true;

    // E. Show Additional Educational Content
    setTimeout(() => {
      actionDisp.setAttribute('text', 'value: DAILY LOW-DOSE PREVENTS CLOTS; color: #00ff00');
      benefitDisp.setAttribute('text', 'value: 81mg REDUCES HEART ATTACK RISK; color: #00ff00');
    }, 3000);

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