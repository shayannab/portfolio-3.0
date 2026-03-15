/**
 * Background Paths Animation (Vanilla JS version)
 * Inspired by the React Framer Motion component
 */

class BackgroundPaths {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("viewBox", "0 0 696 316");
        this.svg.setAttribute("fill", "none");
        this.svg.style.width = "100%";
        this.svg.style.height = "100%";
        this.svg.classList.add("background-svg");
        
        this.container.appendChild(this.svg);
        this.init();
    }

    init() {
        this.createPaths(1);
        this.createPaths(-1);
    }

    createPaths(position) {
        for (let i = 0; i < 36; i++) {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "motion.path"); // Note: Using motion.path logic via GSAP
            const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
            
            const d = `M-${380 - i * 5 * position} -${189 + i * 6}C-${
                380 - i * 5 * position
            } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
                152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
                684 - i * 5 * position
            } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`;
            
            pathElement.setAttribute("d", d);
            pathElement.setAttribute("stroke", "currentColor");
            pathElement.setAttribute("stroke-width", (0.5 + i * 0.03).toFixed(2));
            pathElement.style.strokeOpacity = (0.1 + i * 0.03).toFixed(2);
            
            this.svg.appendChild(pathElement);
            this.animatePath(pathElement, i);
        }
    }

    animatePath(el, index) {
        const length = el.getTotalLength();
        el.style.strokeDasharray = length;
        el.style.strokeDashoffset = length * 0.7; // Start partially drawn

        gsap.to(el, {
            strokeDashoffset: -length,
            opacity: [0.3, 0.6, 0.3],
            duration: 20 + Math.random() * 10,
            repeat: -1,
            ease: "none",
            delay: -Math.random() * 20 // Jump to a random point in animation
        });
    }
}

// Global initialization
window.initBackgroundPaths = (containerId) => {
    new BackgroundPaths(containerId);
};
