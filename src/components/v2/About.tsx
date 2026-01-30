import { motion } from 'framer-motion';

export default function About() {
    const linkVariant = {
        hover: { scale: 1.05, originX: 0 }
    };

    return (
        <section className="py-32">
            {/* Left aligned header container matching WORK styling */}
            <div className="max-w-4xl mx-auto px-6 mb-16">
                <div className="flex items-end justify-center">
                    <h2 className="text-[10vw] leading-[0.8] font-bold tracking-tighter text-neutral-200 dark:text-neutral-800 select-none">
                        ABOUT
                    </h2>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-8 text-xl md:text-3xl font-light text-neutral-800 dark:text-neutral-200 leading-relaxed"
                >
                    <p>
                        I am a student learning about <span className="font-normal text-black dark:text-white">AI Alignment</span>, <span className="font-normal text-black dark:text-white">Applied AI</span>, and building robust systems that can tackle the complexities of the real world from first principles.
                    </p>

                    <p className="text-neutral-600 dark:text-neutral-400">
                        Outside of research, I've competed as an <span className="text-neutral-800 dark:text-neutral-200 font-normal">NSDA National Champion</span> in extemporaenous speaking, and like to travel (107,220 miles flown in 2025). I'm also an avid music listener (116,267 minutes listened in 2025), currently working on my golf swing, shooting hoops, and enjoy 'zero effort photography' with my fujifilm.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-24"
                >
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold tracking-widest text-neutral-900 dark:text-white uppercase font-mono">
                        <motion.a variants={linkVariant} whileHover="hover" href="https://github.com/LakshyaChaudhry" target="_blank" rel="noopener noreferrer" className="border-b-2 border-transparent hover:border-black dark:hover:border-white transition-colors">GitHub</motion.a>
                        <motion.a variants={linkVariant} whileHover="hover" href="https://www.linkedin.com/in/lakshya-chaudhry-a0155a311" target="_blank" rel="noopener noreferrer" className="border-b-2 border-transparent hover:border-black dark:hover:border-white transition-colors">LinkedIn</motion.a>
                        <motion.a variants={linkVariant} whileHover="hover" href="https://x.com/LakshChaudhry" target="_blank" rel="noopener noreferrer" className="border-b-2 border-transparent hover:border-black dark:hover:border-white transition-colors">X</motion.a>
                        <motion.a variants={linkVariant} whileHover="hover" href="mailto:lakshchaudhry@gmail.com" className="border-b-2 border-transparent hover:border-black dark:hover:border-white transition-colors">Email</motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
