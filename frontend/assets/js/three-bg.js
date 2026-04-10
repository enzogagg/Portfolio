/* global THREE */
/**
 * =====================================================================================================
 * PORTFOLIO - WEBGL BACKGROUND
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: three-bg.js
 * Version: 3.0.0 (Level 10)
 *
 * Description:
 * Advanced interactive particle network using Three.js.
 * Represents infrastructure/network connections with a premium cyber-aesthetic.
 *
 * Features:
 * - 3D Particle System
 * - Dynamic connections (Network topology visualization)
 * - Mouse interaction (Repulsion/Attraction)
 * - Smooth camera movement
 * - Performance optimized
 *
 * =====================================================================================================
 */

class NetworkBackground {
  constructor() {
    this.container = document.getElementById("webgl-background");
    if (!this.container) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    this.particles = [];
    this.connections = [];
    this.mouse = new THREE.Vector2();
    this.targetMouse = new THREE.Vector2();
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.wasMobile = window.innerWidth < 768;

    this.init();
    this.animate();
  }

  init() {
    // Setup Renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Setup Camera
    this.camera.position.z = 100;

    // Create Particles
    const geometry = new THREE.BufferGeometry();

    // Mobile Optimization: Reduce particle count significantly
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 120;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x3b82f6); // Blue
    const color2 = new THREE.Color(0x8b5cf6); // Purple

    // Spread range - smaller on mobile to keep them visible
    const spreadX = isMobile ? 80 : 150;
    const spreadY = isMobile ? 120 : 100;
    const spreadZ = isMobile ? 40 : 50;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * spreadX;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * spreadY;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * spreadZ;

      // Store velocity and original position in a custom object
      this.particles.push({
        position: new THREE.Vector3(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2],
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * (isMobile ? 0.03 : 0.05),
          (Math.random() - 0.5) * (isMobile ? 0.03 : 0.05),
          (Math.random() - 0.5) * (isMobile ? 0.01 : 0.02),
        ),
        originalPos: new THREE.Vector3(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2],
        ),
      });

      // Mix colors
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);

    // Connection Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    this.linesGeometry = new THREE.BufferGeometry();
    this.lines = new THREE.LineSegments(this.linesGeometry, lineMaterial);
    this.scene.add(this.lines);

    // Event Listeners
    window.addEventListener("resize", this.onWindowResize.bind(this));
    document.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Re-init particles if switching between mobile/desktop significantly
    // This is a simple check, could be more sophisticated
    const isMobile = window.innerWidth < 768;
    if (this.wasMobile !== isMobile) {
      this.wasMobile = isMobile;
      // Ideally we would re-create particles here, but for now just updating size is enough
      // to prevent distortion. Full re-init might be jarring.
    }
  }

  onMouseMove(event) {
    this.targetMouse.x = (event.clientX - this.windowHalfX) * 0.05;
    this.targetMouse.y = (event.clientY - this.windowHalfY) * 0.05;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    // Smooth mouse movement
    this.mouse.lerp(this.targetMouse, 0.05);

    // Move camera slightly with mouse
    this.camera.position.x += (this.mouse.x - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.mouse.y - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);

    // Update Particles
    const positions = this.particleSystem.geometry.attributes.position.array;
    const particleCount = this.particles.length;
    const connectionPositions = [];
    const isMobile = window.innerWidth < 768;
    const connectionDistance = isMobile ? 25 : 35;

    for (let i = 0; i < particleCount; i++) {
      const p = this.particles[i];

      // Update position based on velocity
      p.position.add(p.velocity);

      // Boundary check - bounce back
      const limitX = isMobile ? 80 : 150;
      const limitY = isMobile ? 120 : 100;

      if (Math.abs(p.position.x) > limitX) p.velocity.x *= -1;
      if (Math.abs(p.position.y) > limitY) p.velocity.y *= -1;
      if (Math.abs(p.position.z) > 50) p.velocity.z *= -1;

      // Update buffer geometry
      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;

      // Find connections
      for (let j = i + 1; j < particleCount; j++) {
        const p2 = this.particles[j];
        const dist = p.position.distanceTo(p2.position);

        if (dist < connectionDistance) {
          connectionPositions.push(
            p.position.x,
            p.position.y,
            p.position.z,
            p2.position.x,
            p2.position.y,
            p2.position.z,
          );
        }
      }
    }

    this.particleSystem.geometry.attributes.position.needsUpdate = true;

    // Update Lines
    this.linesGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(connectionPositions, 3),
    );

    // Gentle Rotation
    this.scene.rotation.y += 0.0005;
    this.scene.rotation.z += 0.0002;

    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new NetworkBackground();
  });
} else {
  new NetworkBackground();
}
