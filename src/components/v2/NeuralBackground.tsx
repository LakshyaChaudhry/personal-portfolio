import { useEffect, useRef } from 'react';

export default function NeuralBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouseX = -1000;
        let mouseY = -1000;

        const initCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            // Handle high DPI displays
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);

            // Store logical dimensions for calculations
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            return { width: rect.width, height: rect.height };
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            width: number;
            height: number;

            constructor(w: number, h: number) {
                this.width = w;
                this.height = h;
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > this.width) this.vx *= -1;
                if (this.y < 0 || this.y > this.height) this.vy *= -1;

                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    const angle = Math.atan2(dy, dx);
                    const force = (150 - distance) / 150;
                    this.vx -= Math.cos(angle) * force * 0.2;
                    this.vy -= Math.sin(angle) * force * 0.2;
                }
            }

            draw(isDark: boolean) {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)';
                ctx.fill();
            }
        }

        const initParticles = (width: number, height: number) => {
            particles = [];
            const particleCount = Math.min(Math.floor((width * height) / 10000), 80);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(width, height));
            }
        };

        const drawConnections = (isDark: boolean) => {
            if (!ctx) return;
            // Cache style for performance? Canvas state changes are cheap-ish.
            const color = isDark ? '255, 255, 255' : '0, 0, 0';

            particles.forEach((a, index) => {
                for (let j = index + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${color}, ${0.15 * (1 - distance / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }

                const dx = a.x - mouseX;
                const dy = a.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 200) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${color}, ${0.2 * (1 - distance / 200)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.stroke();
                }
            });
        }

        let width = 0, height = 0;

        const handleResize = () => {
            const dims = initCanvas();
            width = dims.width;
            height = dims.height;
            initParticles(width, height);
        };

        // Initial setup
        handleResize();

        const animate = () => {
            const isDark = document.documentElement.classList.contains('dark');
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw(isDark);
            });
            drawConnections(isDark);
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener('resize', handleResize);

        // Use a local mouse move for the section if we want it confined, 
        // but window listener is smoother if user interacts near edge.
        // However, we need correct relative coordinates.
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
        />
    );
}
