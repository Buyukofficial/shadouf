/**
 * ===================================================================
 * AL SHADOUF GROUP — Enterprise 3D Interactive WebGL & Parallax Engine
 * Powered by Three.js & Modern GPU-Accelerated WebGL Architecture
 * ===================================================================
 */

(function () {
  'use strict';

  // Check if WebGL is supported
  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  const BRAND = {
    royalBlue: 0x066AAB,
    navy: 0x0A2540,
    navyDark: 0x06182B,
    skyBlue: 0x0284C7,
    electricCyan: 0x38BDF8,
    gold: 0xF59E0B,
    lightBg: 0xF8FAFC,
    steel: 0x94A3B8,
    aluminium: 0xCBD5E1,
    copper: 0xD97706,
    white: 0xFFFFFF
  };

  document.addEventListener('DOMContentLoaded', () => {
    init3DCardParallax();

    if (!window.THREE || !isWebGLAvailable()) {
      console.warn('Three.js or WebGL not available, 3D card tilt active.');
      return;
    }

    // Initialize page-specific 3D systems
    if (document.getElementById('hero3dCanvas')) {
      initHero3D();
    }
    if (document.getElementById('product3dCanvas')) {
      initProductInspector3D();
    }
    if (document.getElementById('shadoof3dCanvas')) {
      initShadoofPhysics3D();
    }
    if (document.getElementById('services3dCanvas')) {
      initServicesHologram3D();
    }
    if (document.getElementById('projects3dCanvas')) {
      initProjectsRadar3D();
    }
  });

  /* ===================================================================
     1. HOMEPAGE: 3D INTERACTIVE MEP INFRASTRUCTURE NODE LATTICE
     =================================================================== */
  function initHero3D() {
    const canvas = document.getElementById('hero3dCanvas');
    if (!canvas) return;

    const parent = canvas.parentElement;
    let width = parent.clientWidth || 600;
    let height = parent.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 85);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x066AAB, 1.8);
    dirLight1.position.set(20, 40, 30);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38BDF8, 1.2);
    dirLight2.position.set(-30, -20, 20);
    scene.add(dirLight2);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Core Rotating MEP Conduits & Rings
    const ringGeo1 = new THREE.TorusGeometry(26, 0.5, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: BRAND.royalBlue,
      roughness: 0.3,
      metalness: 0.8,
      emissive: BRAND.royalBlue,
      emissiveIntensity: 0.2
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    rootGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(18, 0.4, 16, 80);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: BRAND.skyBlue,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    rootGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(32, 0.3, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: BRAND.electricCyan,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 4;
    rootGroup.add(ring3);

    // 2. Central Enterprise Icosahedron Core (The Al Shadouf Core)
    const coreGeo = new THREE.IcosahedronGeometry(10, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: BRAND.royalBlue,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // Internal Solid Glowing Nucleus
    const nucleusGeo = new THREE.SphereGeometry(5, 32, 32);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: BRAND.navy,
      emissive: BRAND.royalBlue,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.9
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    rootGroup.add(nucleus);

    // 3. Floating Infrastructure Nodes (Substations, Solar arrays, EV hubs)
    const nodesGroup = new THREE.Group();
    rootGroup.add(nodesGroup);

    const nodeCount = 18;
    const nodeMeshes = [];
    const nodeGeo = new THREE.SphereGeometry(1.2, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: BRAND.electricCyan,
      emissive: BRAND.skyBlue,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.8
    });

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 24 + Math.random() * 8;

      node.position.x = r * Math.sin(phi) * Math.cos(theta);
      node.position.y = r * Math.sin(phi) * Math.sin(theta);
      node.position.z = r * Math.cos(phi);

      node.userData = {
        origPos: node.position.clone(),
        speed: 0.5 + Math.random() * 0.8,
        angle: Math.random() * Math.PI * 2
      };

      nodesGroup.add(node);
      nodeMeshes.push(node);
    }

    // 4. Conduit Flow Lines connecting nodes
    const lineMat = new THREE.LineBasicMaterial({
      color: BRAND.skyBlue,
      transparent: true,
      opacity: 0.3
    });
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodeMeshes[i].position.distanceTo(nodeMeshes[j].position) < 22) {
          linePositions.push(
            nodeMeshes[i].position.x, nodeMeshes[i].position.y, nodeMeshes[i].position.z,
            nodeMeshes[j].position.x, nodeMeshes[j].position.y, nodeMeshes[j].position.z
          );
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    nodesGroup.add(linesMesh);

    // 5. Energy Particle Cloud
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 110;
      particlePositions[i + 1] = (Math.random() - 0.5) * 80;
      particlePositions[i + 2] = (Math.random() - 0.5) * 70;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: BRAND.skyBlue,
      size: 1.4,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse Tracking Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Interactive Mode Controls
    window.setHero3DMode = function(mode) {
      if (mode === 'solar') {
        particleMat.color.setHex(0xF59E0B);
        ringMat1.color.setHex(0xF59E0B);
        ringMat1.emissive.setHex(0xD97706);
      } else if (mode === 'cad') {
        particleMat.color.setHex(0x38BDF8);
        ringMat1.wireframe = true;
        nucleusMat.wireframe = true;
      } else {
        particleMat.color.setHex(BRAND.skyBlue);
        ringMat1.wireframe = false;
        ringMat1.color.setHex(BRAND.royalBlue);
        ringMat1.emissive.setHex(BRAND.royalBlue);
        nucleusMat.wireframe = false;
      }
    };

    // Responsive Resize
    function onResize() {
      if (!canvas || !parent) return;
      width = parent.clientWidth || 600;
      height = parent.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', onResize);

    // Animation Loop
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse damping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      rootGroup.rotation.y = time * 0.18 + targetX * 0.45;
      rootGroup.rotation.x = time * 0.08 + targetY * 0.35;

      ring1.rotation.z = time * 0.25;
      ring2.rotation.y = -time * 0.3;
      ring3.rotation.x = time * 0.15;

      coreMesh.rotation.y = -time * 0.22;
      coreMesh.rotation.z = time * 0.15;

      particleSystem.rotation.y = time * 0.04;
      particleSystem.rotation.x = time * 0.02;

      // Pulse nodes
      for (let i = 0; i < nodeMeshes.length; i++) {
        const n = nodeMeshes[i];
        const s = 1 + Math.sin(time * 3 + i) * 0.18;
        n.scale.set(s, s, s);
      }

      renderer.render(scene, camera);
    }
    animate();
  }

  /* ===================================================================
     2. PRODUCTS: INTERACTIVE 3D CAD PRODUCT INSPECTION STAGE
     =================================================================== */
  function initProductInspector3D() {
    const canvas = document.getElementById('product3dCanvas');
    if (!canvas) return;

    const parent = canvas.parentElement;
    let width = parent.clientWidth || 550;
    let height = parent.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 500);
    camera.position.set(22, 16, 26);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(amb);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(20, 30, 20);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(BRAND.skyBlue, 0.9);
    fillLight.position.set(-20, -10, -10);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.6);
    backLight.position.set(0, 20, -25);
    scene.add(backLight);

    // Floor Grid
    const grid = new THREE.GridHelper(30, 20, BRAND.royalBlue, 0xE2E8F0);
    grid.position.y = -7;
    scene.add(grid);

    // Models Container
    const stageRoot = new THREE.Group();
    scene.add(stageRoot);

    // Shared Materials
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xCBD5E1,
      metalness: 0.85,
      roughness: 0.25
    });
    const bluePaintMat = new THREE.MeshStandardMaterial({
      color: BRAND.royalBlue,
      metalness: 0.5,
      roughness: 0.35
    });
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xB45309,
      metalness: 0.9,
      roughness: 0.2
    });
    const darkPlasticMat = new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      metalness: 0.2,
      roughness: 0.4
    });
    const ledGlowMat = new THREE.MeshStandardMaterial({
      color: BRAND.electricCyan,
      emissive: BRAND.electricCyan,
      emissiveIntensity: 1.2
    });

    // ----------------------------------------------------
    // MODEL A: Distribution Enclosure / Switchgear Cabinet
    // ----------------------------------------------------
    const enclosureGroup = new THREE.Group();
    enclosureGroup.name = 'enclosure';

    // Main Box Body
    const boxBodyGeo = new THREE.BoxGeometry(10, 14, 5);
    const boxBody = new THREE.Mesh(boxBodyGeo, steelMat);
    enclosureGroup.add(boxBody);

    // Hinged Front Door
    const doorGroup = new THREE.Group();
    doorGroup.position.set(-5, 0, 2.5); // Pivot at left edge
    const doorGeo = new THREE.BoxGeometry(9.8, 13.8, 0.4);
    doorGeo.translate(4.9, 0, 0.2); // Shift so hinge is at 0
    const doorMesh = new THREE.Mesh(doorGeo, bluePaintMat);
    doorGroup.add(doorMesh);

    // Door Handle & Lock
    const handleGeo = new THREE.CylinderGeometry(0.3, 0.3, 2.5, 16);
    const handle = new THREE.Mesh(handleGeo, copperMat);
    handle.rotation.z = Math.PI / 2;
    handle.position.set(8.5, 0, 0.6);
    doorGroup.add(handle);

    enclosureGroup.add(doorGroup);

    // Internal DIN Rails & Breakers (revealed in exploded/opened mode)
    const dinRailGeo = new THREE.BoxGeometry(8, 0.4, 0.4);
    for (let y = -4; y <= 4; y += 4) {
      const rail = new THREE.Mesh(dinRailGeo, steelMat);
      rail.position.set(0, y, 0);
      enclosureGroup.add(rail);

      // Add breaker blocks
      for (let x = -3; x <= 3; x += 1.5) {
        const breakerGeo = new THREE.BoxGeometry(1.1, 1.8, 1.2);
        const breaker = new THREE.Mesh(breakerGeo, darkPlasticMat);
        breaker.position.set(x, y + 0.3, 0.7);
        enclosureGroup.add(breaker);
      }
    }

    // Busbar
    const busbarGeo = new THREE.BoxGeometry(8, 0.3, 0.3);
    const busbar = new THREE.Mesh(busbarGeo, copperMat);
    busbar.position.set(0, 5.5, 0);
    enclosureGroup.add(busbar);

    stageRoot.add(enclosureGroup);

    // ----------------------------------------------------
    // MODEL B: ABB Terra AC Wallbox EV Charger
    // ----------------------------------------------------
    const evGroup = new THREE.Group();
    evGroup.name = 'ev_charger';
    evGroup.visible = false;

    // Outer Modern Shell
    const evBodyGeo = new THREE.BoxGeometry(7, 12, 4);
    const evBody = new THREE.Mesh(evBodyGeo, bluePaintMat);
    evGroup.add(evBody);

    // Faceplate Bevel
    const faceGeo = new THREE.BoxGeometry(6.4, 11.4, 0.6);
    const faceMesh = new THREE.Mesh(faceGeo, darkPlasticMat);
    faceMesh.position.set(0, 0, 2.1);
    evGroup.add(faceMesh);

    // Circular LED Halo Status Ring
    const haloGeo = new THREE.TorusGeometry(1.8, 0.22, 16, 64);
    const haloMesh = new THREE.Mesh(haloGeo, ledGlowMat);
    haloMesh.position.set(0, 2.2, 2.45);
    evGroup.add(haloMesh);

    // RFID Card Icon / Display
    const displayGeo = new THREE.PlaneGeometry(3, 1.8);
    const displayMat = new THREE.MeshBasicMaterial({ color: 0x0284C7 });
    const displayMesh = new THREE.Mesh(displayGeo, displayMat);
    displayMesh.position.set(0, -1.5, 2.45);
    evGroup.add(displayMesh);

    // Charging Socket / Holster
    const socketGeo = new THREE.CylinderGeometry(1.4, 1.4, 1.2, 32);
    socketGeo.rotateX(Math.PI / 2);
    const socketMesh = new THREE.Mesh(socketGeo, steelMat);
    socketMesh.position.set(0, -3.8, 2.4);
    evGroup.add(socketMesh);

    stageRoot.add(evGroup);

    // ----------------------------------------------------
    // MODEL C: Aluminium Trefoil High-Voltage Cable Cleat
    // ----------------------------------------------------
    const cleatGroup = new THREE.Group();
    cleatGroup.name = 'cleat';
    cleatGroup.visible = false;

    // Base Casting
    const cleatBaseGeo = new THREE.BoxGeometry(11, 2.2, 5);
    const cleatBase = new THREE.Mesh(cleatBaseGeo, steelMat);
    cleatBase.position.y = -3;
    cleatGroup.add(cleatBase);

    // Upper Clamping Shell
    const upperShellGeo = new THREE.BoxGeometry(9.5, 2, 5);
    const upperShell = new THREE.Mesh(upperShellGeo, steelMat);
    upperShell.position.y = 3.6;
    cleatGroup.add(upperShell);

    // 3 High Voltage Cables in Trefoil Formation
    const cableGeo = new THREE.CylinderGeometry(1.5, 1.5, 12, 32);
    cableGeo.rotateX(Math.PI / 2);

    const c1 = new THREE.Mesh(cableGeo, darkPlasticMat);
    c1.position.set(-1.8, -0.6, 0);
    cleatGroup.add(c1);

    const c2 = new THREE.Mesh(cableGeo, darkPlasticMat);
    c2.position.set(1.8, -0.6, 0);
    cleatGroup.add(c2);

    const c3 = new THREE.Mesh(cableGeo, darkPlasticMat);
    c3.position.set(0, 2.2, 0);
    cleatGroup.add(c3);

    // Stainless Steel Stud & Nuts
    const studGeo = new THREE.CylinderGeometry(0.35, 0.35, 10, 16);
    const stud1 = new THREE.Mesh(studGeo, copperMat);
    stud1.position.set(-4.2, 0.4, 0);
    cleatGroup.add(stud1);

    const stud2 = new THREE.Mesh(studGeo, copperMat);
    stud2.position.set(4.2, 0.4, 0);
    cleatGroup.add(stud2);

    stageRoot.add(cleatGroup);

    // ----------------------------------------------------
    // MODEL D: Furse Copper Earth Bar
    // ----------------------------------------------------
    const earthGroup = new THREE.Group();
    earthGroup.name = 'earth_bar';
    earthGroup.visible = false;

    // Solid Copper Bar
    const earthBarGeo = new THREE.BoxGeometry(16, 1.4, 0.8);
    const earthBar = new THREE.Mesh(earthBarGeo, copperMat);
    earthGroup.add(earthBar);

    // Isolator Standoff Bases
    const stand1Geo = new THREE.CylinderGeometry(1, 1.2, 3, 16);
    const stand1 = new THREE.Mesh(stand1Geo, darkPlasticMat);
    stand1.position.set(-6, -1.8, 0);
    earthGroup.add(stand1);

    const stand2 = new THREE.Mesh(stand1Geo, darkPlasticMat);
    stand2.position.set(6, -1.8, 0);
    earthGroup.add(stand2);

    // Disconnecting Link
    const linkGeo = new THREE.BoxGeometry(3, 1.6, 0.9);
    const linkMesh = new THREE.Mesh(linkGeo, steelMat);
    linkMesh.position.set(0, 0, 0.2);
    earthGroup.add(linkMesh);

    // Connection Studs
    for (let x = -7; x <= 7; x += 1.8) {
      if (Math.abs(x) < 1.5) continue;
      const boltGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.8, 16);
      boltGeo.rotateX(Math.PI / 2);
      const bolt = new THREE.Mesh(boltGeo, steelMat);
      bolt.position.set(x, 0, 0.5);
      earthGroup.add(bolt);
    }

    stageRoot.add(earthGroup);

    // Product Switcher State
    const models = {
      enclosure: enclosureGroup,
      ev_charger: evGroup,
      cleat: cleatGroup,
      earth_bar: earthGroup
    };

    let activeModelKey = 'enclosure';
    let isWireframe = false;
    let isXRay = false;
    let isExploded = false;
    let autoRotate = true;

    // Orbit Drag Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      stageRoot.rotation.y += deltaX * 0.01;
      stageRoot.rotation.x += deltaY * 0.01;
      autoRotate = false; // user intervened
    });

    // Touch support for mobile 3D inspection
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      stageRoot.rotation.y += deltaX * 0.01;
      stageRoot.rotation.x += deltaY * 0.01;
      autoRotate = false;
    }, { passive: true });

    // Global Product 3D API for buttons in HTML
    window.selectProduct3D = function (key) {
      if (!models[key]) return;
      activeModelKey = key;
      Object.keys(models).forEach(k => {
        models[k].visible = (k === key);
      });
      // Camera pulse reset
      camera.position.set(22, 16, 26);
      camera.lookAt(0, 0, 0);
      stageRoot.rotation.set(0, 0, 0);

      // Update button active state
      document.querySelectorAll('.p3d-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-model') === key);
      });

      // Update spec readout in UI
      const specEl = document.getElementById('p3dSpecTitle');
      const descEl = document.getElementById('p3dSpecDesc');
      if (specEl && descEl) {
        if (key === 'enclosure') {
          specEl.textContent = 'IP66 Single Door Steel Distribution Enclosure';
          descEl.textContent = 'Heavy-gauge zinc-coated steel, CNC polyurethane gasket, modular chassis with full DIN rail capacity.';
        } else if (key === 'ev_charger') {
          specEl.textContent = 'ABB Terra AC Wallbox 22kW Commercial EV Charger';
          descEl.textContent = 'Type-2 socket, integrated RFID authentication, DEWA EV Green Charger compliant, smart cloud telemetry.';
        } else if (key === 'cleat') {
          specEl.textContent = 'Aluminium Trefoil Cable Cleat (Short Circuit Rated)';
          descEl.textContent = 'Cast aluminium LM6 body tested to 130kA peak fault withstand, LSF lining prevents sheath damage.';
        } else if (key === 'earth_bar') {
          specEl.textContent = 'Furse High-Conductivity Tinned Copper Earth Bar';
          descEl.textContent = '50x6mm hard-drawn copper bar, twin disconnect links, M10 brass connection studs, ISO 9001 certified.';
        }
      }
    };

    window.toggle3DWireframe = function () {
      isWireframe = !isWireframe;
      scene.traverse(child => {
        if (child.isMesh && child.material && child !== grid) {
          child.material.wireframe = isWireframe;
        }
      });
      const btn = document.getElementById('btnWireframe3D');
      if (btn) btn.classList.toggle('active', isWireframe);
    };

    window.toggle3DExploded = function () {
      isExploded = !isExploded;
      const btn = document.getElementById('btnExplode3D');
      if (btn) btn.classList.toggle('active', isExploded);
    };

    window.toggle3DAutoRotate = function () {
      autoRotate = !autoRotate;
      const btn = document.getElementById('btnAutoRotate3D');
      if (btn) btn.classList.toggle('active', autoRotate);
    };

    // Responsive
    window.addEventListener('resize', () => {
      if (!canvas || !parent) return;
      width = parent.clientWidth || 550;
      height = parent.clientHeight || 400;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    // Animation Loop
    let clock = new THREE.Clock();
    let explodeProgress = 0;

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (autoRotate) {
        stageRoot.rotation.y += 0.008;
      }

      // Smooth Exploded View transition
      const targetExplode = isExploded ? 1 : 0;
      explodeProgress += (targetExplode - explodeProgress) * 0.08;

      if (activeModelKey === 'enclosure') {
        doorGroup.rotation.y = -explodeProgress * 1.6; // Door swings open 90 degrees
      } else if (activeModelKey === 'cleat') {
        upperShell.position.y = 3.6 + explodeProgress * 4.5;
        stud1.position.y = 0.4 + explodeProgress * 2.5;
        stud2.position.y = 0.4 + explodeProgress * 2.5;
      } else if (activeModelKey === 'ev_charger') {
        faceMesh.position.z = 2.1 + explodeProgress * 3.5;
        haloMesh.position.z = 2.45 + explodeProgress * 4.0;
      } else if (activeModelKey === 'earth_bar') {
        linkMesh.position.y = explodeProgress * 3.0;
        stand1.position.y = -1.8 - explodeProgress * 2.0;
        stand2.position.y = -1.8 - explodeProgress * 2.0;
      }

      renderer.render(scene, camera);
    }
    animate();
  }

  /* ===================================================================
     3. ABOUT US: 3D SHADOOF MECHANICAL LEVER PHYSICS ENGINE
     =================================================================== */
  function initShadoofPhysics3D() {
    const canvas = document.getElementById('shadoof3dCanvas');
    if (!canvas) return;

    const parent = canvas.parentElement;
    let width = parent.clientWidth || 500;
    let height = parent.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 500);
    camera.position.set(0, 12, 34);
    camera.lookAt(0, 4, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const amb = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(amb);

    const sun = new THREE.DirectionalLight(0xfff5ea, 1.4);
    sun.position.set(15, 25, 20);
    scene.add(sun);

    const blueRim = new THREE.DirectionalLight(BRAND.skyBlue, 0.7);
    blueRim.position.set(-15, -10, -10);
    scene.add(blueRim);

    // Ground Platform & Water Basin
    const groundGeo = new THREE.CylinderGeometry(18, 19, 1.2, 40);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xEDE9FE,
      roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -6;
    scene.add(ground);

    // Nile Water Well Basin
    const waterGeo = new THREE.CylinderGeometry(4.5, 4.5, 2.5, 32);
    const waterMat = new THREE.MeshStandardMaterial({
      color: BRAND.skyBlue,
      roughness: 0.1,
      metalness: 0.7,
      transparent: true,
      opacity: 0.85
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.set(10, -5.2, 0);
    scene.add(water);

    // 1. Fulcrum Upright Timber Post
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x0A2540,
      roughness: 0.6,
      metalness: 0.3
    });
    const postGeo = new THREE.CylinderGeometry(0.7, 0.9, 14, 16);
    const post = new THREE.Mesh(postGeo, woodMat);
    post.position.set(0, 1, 0);
    scene.add(post);

    // Cross-brace
    const braceGeo = new THREE.CylinderGeometry(0.4, 0.4, 11, 16);
    const brace1 = new THREE.Mesh(braceGeo, woodMat);
    brace1.rotation.z = Math.PI / 4;
    brace1.position.set(-3.2, -1.8, 0);
    scene.add(brace1);

    // 2. Main Pivoting Lever Beam
    const fulcrumPivot = new THREE.Group();
    fulcrumPivot.position.set(0, 8, 0); // Fulcrum axis
    scene.add(fulcrumPivot);

    // Beam: Short arm to the left (counterweight), long arm to the right (bucket)
    const beamGeo = new THREE.BoxGeometry(24, 0.8, 0.8);
    // Offset so fulcrum is 1/4 from left (ratio 1:3.8)
    beamGeo.translate(6, 0, 0);
    const beamMat = new THREE.MeshStandardMaterial({
      color: BRAND.royalBlue,
      roughness: 0.3,
      metalness: 0.6
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    fulcrumPivot.add(beam);

    // Pivot Axle Pin
    const pinGeo = new THREE.CylinderGeometry(0.5, 0.5, 2.2, 16);
    pinGeo.rotateX(Math.PI / 2);
    const pin = new THREE.Mesh(pinGeo, new THREE.MeshStandardMaterial({ color: BRAND.gold, metalness: 0.9 }));
    fulcrumPivot.add(pin);

    // Counterweight (Mud/Stone Ball) on short arm
    const weightGeo = new THREE.DodecahedronGeometry(2.4, 1);
    const weightMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.9
    });
    const counterweight = new THREE.Mesh(weightGeo, weightMat);
    counterweight.position.set(-5.5, -0.6, 0);
    fulcrumPivot.add(counterweight);

    // Hanging Dipping Pole & Bucket on long arm
    const bucketPivot = new THREE.Group();
    bucketPivot.position.set(17.5, 0, 0); // End of long arm
    fulcrumPivot.add(bucketPivot);

    const ropeGeo = new THREE.CylinderGeometry(0.12, 0.12, 10, 8);
    ropeGeo.translate(0, -5, 0);
    const ropeMat = new THREE.MeshStandardMaterial({ color: 0xCBD5E1 });
    const rope = new THREE.Mesh(ropeGeo, ropeMat);
    bucketPivot.add(rope);

    // Bucket
    const bucketGeo = new THREE.CylinderGeometry(1.4, 1.0, 2.2, 24);
    const bucketMat = new THREE.MeshStandardMaterial({
      color: BRAND.copper,
      roughness: 0.4,
      metalness: 0.7
    });
    const bucket = new THREE.Mesh(bucketGeo, bucketMat);
    bucket.position.set(0, -10.2, 0);
    bucketPivot.add(bucket);

    // Physics State & Drag Control
    let targetAngle = -0.15; // Natural resting angle
    let currentAngle = -0.15;
    let isUserDragging = false;
    let prevY = 0;

    canvas.addEventListener('mousedown', (e) => {
      isUserDragging = true;
      prevY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      isUserDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isUserDragging) return;
      const dy = e.clientY - prevY;
      prevY = e.clientY;
      targetAngle += dy * 0.008;
      targetAngle = Math.max(-0.45, Math.min(0.40, targetAngle));
    });

    // Slider sync if exists
    const slider = document.getElementById('shadoofSlider');
    if (slider) {
      slider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value); // -50 to 50
        targetAngle = (val / 50) * 0.42;
      });
    }

    // Responsive
    window.addEventListener('resize', () => {
      if (!canvas || !parent) return;
      width = parent.clientWidth || 500;
      height = parent.clientHeight || 300;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      // Smooth mechanical damping
      currentAngle += (targetAngle - currentAngle) * 0.12;
      fulcrumPivot.rotation.z = currentAngle;

      // Gravity keeps bucket vertical regardless of beam angle
      bucketPivot.rotation.z = -currentAngle;

      // Orbit scene slightly based on mouse
      scene.rotation.y = Math.sin(Date.now() * 0.0006) * 0.25;

      renderer.render(scene, camera);
    }
    animate();
  }

  /* ===================================================================
     4. SERVICES: 3D HOLOGRAPHIC MEP BUILDING INFRASTRUCTURE
     =================================================================== */
  function initServicesHologram3D() {
    const canvas = document.getElementById('services3dCanvas');
    if (!canvas) return;

    const parent = canvas.parentElement;
    let width = parent.clientWidth || 500;
    let height = parent.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 500);
    camera.position.set(24, 20, 24);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const amb = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(amb);

    const key = new THREE.DirectionalLight(BRAND.electricCyan, 1.4);
    key.position.set(15, 30, 20);
    scene.add(key);

    const hologramGroup = new THREE.Group();
    scene.add(hologramGroup);

    // 4 Distinct MEP Floor Layers
    const layers = [];
    const layerNames = ['foundation', 'hvac', 'electrical', 'solar'];
    const layerColors = [0x94A3B8, BRAND.skyBlue, BRAND.gold, 0x10B981];

    for (let i = 0; i < 4; i++) {
      const lGroup = new THREE.Group();
      lGroup.name = layerNames[i];
      lGroup.position.y = (i - 1.5) * 4.5;

      // Slab Wireframe
      const slabGeo = new THREE.BoxGeometry(16, 0.4, 16);
      const slabMat = new THREE.MeshStandardMaterial({
        color: layerColors[i],
        transparent: true,
        opacity: 0.35,
        wireframe: true
      });
      const slab = new THREE.Mesh(slabGeo, slabMat);
      lGroup.add(slab);

      // Infrastructure contents inside this layer
      if (i === 1) { // HVAC Ducts
        const ductGeo = new THREE.BoxGeometry(14, 1.2, 2);
        const ductMat = new THREE.MeshStandardMaterial({ color: BRAND.skyBlue, metalness: 0.8, roughness: 0.2 });
        const duct1 = new THREE.Mesh(ductGeo, ductMat);
        duct1.position.set(0, 1.2, -3);
        lGroup.add(duct1);
      } else if (i === 2) { // Electrical Trays & Switchgear
        const trayGeo = new THREE.BoxGeometry(2, 0.6, 14);
        const trayMat = new THREE.MeshStandardMaterial({ color: BRAND.gold, wireframe: true });
        const tray = new THREE.Mesh(trayGeo, trayMat);
        tray.position.set(3, 1, 0);
        lGroup.add(tray);
      } else if (i === 3) { // Solar Panels
        for (let sx = -5; sx <= 5; sx += 3.5) {
          for (let sz = -5; sz <= 5; sz += 3.5) {
            const panelGeo = new THREE.BoxGeometry(2.8, 0.15, 2.8);
            panelGeo.rotateX(0.25); // Solar tilt
            const panelMat = new THREE.MeshStandardMaterial({ color: 0x066AAB, metalness: 0.9, roughness: 0.1 });
            const panel = new THREE.Mesh(panelGeo, panelMat);
            panel.position.set(sx, 1, sz);
            lGroup.add(panel);
          }
        }
      }

      hologramGroup.add(lGroup);
      layers.push(lGroup);
    }

    // Interactive Layer Isolation API
    window.isolateServiceLayer = function (layerName) {
      layers.forEach(l => {
        if (layerName === 'all' || l.name === layerName) {
          l.visible = true;
          l.scale.set(1.05, 1.05, 1.05);
        } else {
          l.visible = false;
        }
      });
    };

    // Responsive
    window.addEventListener('resize', () => {
      if (!canvas || !parent) return;
      width = parent.clientWidth || 500;
      height = parent.clientHeight || 360;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    // Orbit
    function animate() {
      requestAnimationFrame(animate);
      hologramGroup.rotation.y += 0.007;
      renderer.render(scene, camera);
    }
    animate();
  }

  /* ===================================================================
     5. PROJECTS: 3D UAE INFRASTRUCTURE RADAR SPHERE
     =================================================================== */
  function initProjectsRadar3D() {
    const canvas = document.getElementById('projects3dCanvas');
    if (!canvas) return;

    const parent = canvas.parentElement;
    let width = parent.clientWidth || 450;
    let height = parent.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 500);
    camera.position.set(0, 8, 30);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const amb = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(amb);

    const dir = new THREE.DirectionalLight(BRAND.skyBlue, 1.5);
    dir.position.set(10, 20, 15);
    scene.add(dir);

    const globeRoot = new THREE.Group();
    scene.add(globeRoot);

    // Holographic Wireframe Globe
    const globeGeo = new THREE.SphereGeometry(10, 32, 32);
    const globeMat = new THREE.MeshStandardMaterial({
      color: BRAND.royalBlue,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    globeRoot.add(globe);

    // Inner Luminous Solid Sphere
    const innerGeo = new THREE.SphereGeometry(9.6, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xF8FAFC,
      transparent: true,
      opacity: 0.95
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    globeRoot.add(inner);

    // UAE Infrastructure Pins
    const pinData = [
      { name: 'Sharjah HQ & Yards', lat: 25.35, lon: 55.40, color: BRAND.royalBlue, scale: 1.5 },
      { name: 'Dubai Metro & Towers', lat: 25.20, lon: 55.27, color: BRAND.gold, scale: 1.4 },
      { name: 'Abu Dhabi Industrial', lat: 24.45, lon: 54.37, color: BRAND.electricCyan, scale: 1.3 },
      { name: 'Fujairah Oil Terminal', lat: 25.12, lon: 56.32, color: 0x10B981, scale: 1.1 },
      { name: 'RAK Cement & Energy', lat: 25.78, lon: 55.95, color: BRAND.skyBlue, scale: 1.1 }
    ];

    const pins = [];
    pinData.forEach(p => {
      // Convert lat/long to 3D Cartesian coords
      const phi = (90 - p.lat) * (Math.PI / 180);
      const theta = (p.lon + 180) * (Math.PI / 180);
      const r = 10.2;

      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = (r * Math.sin(phi) * Math.sin(theta));
      const y = (r * Math.cos(phi));

      const pinGeo = new THREE.SphereGeometry(0.5 * p.scale, 16, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: p.color,
        emissive: p.color,
        emissiveIntensity: 0.8
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.set(x, y, z);
      globeRoot.add(pinMesh);

      // Radar pulse ring
      const ringGeo = new THREE.RingGeometry(0.8 * p.scale, 1.2 * p.scale, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: p.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(x * 1.02, y * 1.02, z * 1.02);
      ring.lookAt(0, 0, 0);
      globeRoot.add(ring);

      pins.push({ mesh: pinMesh, ring: ring, data: p });
    });

    // Orbit & Pulse
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      globeRoot.rotation.y += 0.005;

      pins.forEach((p, idx) => {
        const s = 1 + Math.sin(time * 4 + idx) * 0.3;
        p.ring.scale.set(s, s, s);
        p.ring.material.opacity = 0.8 - (s - 1) * 2;
      });

      renderer.render(scene, camera);
    }
    animate();
  }

  /* ===================================================================
     6. UNIVERSAL 3D CARD PARALLAX TILT & SPECULAR GLARE ENGINE
     =================================================================== */
  function init3DCardParallax() {
    const cards = document.querySelectorAll(
      '.product-card, .project-card, .mini-bento-card, .service-card, .feature-card, .archival-photo-frame, .blueprint-explorer-card, .lever-physics-card'
    );

    cards.forEach(card => {
      // Create dynamic specular light sheen layer
      const glare = document.createElement('div');
      glare.className = 'card-3d-glare';
      card.style.position = 'relative';
      card.style.transformStyle = 'preserve-3d';
      card.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease';
      card.appendChild(glare);

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg tilt
        const rotateY = ((x - centerX) / centerX) * 9;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

        // Update glare position
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(6, 106, 171, 0.18), transparent 60%)`;
        glare.style.opacity = '1';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        glare.style.opacity = '0';
      });
    });
  }

})();
