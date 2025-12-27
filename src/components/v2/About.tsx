import { motion } from 'framer-motion';

export default function About() {
    const linkVariant = {
        hover: { scale: 1.05, originX: 0 }
    };

    return (
        <section className="py-32">
            <div className="max-w-4xl mx-auto text-center px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-sm font-mono text-neutral-500 tracking-widest uppercase mb-16"
                >
                    About Me
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-12 text-2xl md:text-4xl font-light text-neutral-800 dark:text-neutral-200 leading-relaxed"
                >
                    <p>
                        I am a full-stack developer and researcher focused on <span className="font-normal text-black dark:text-white">AI Alignment</span> and <span className="font-normal text-black dark:text-white">Engineering Agents</span>.
                    </p>
                    <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400">
                        My work revolves around building robust, scalable systems that bridge the gap between advanced machine learning research and practical, safe applications.
                    </p>

                    <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 italic font-serif">
                        "When I'm away from the screen, I'm travelling, being a top 0.01% Drake listener, working on my golf swing, shooting hoops, and seeking new fit inspos."
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
                        <motion.a variants={linkVariant} whileHover="hover" href="#" className="border-b-2 border-transparent hover:border-black dark:hover:border-white transition-colors">GitHub</motion.a>
                        <motion.a variants={linkVariant} whileHover="hover" href="#" className="border-b-2 border-transparent hover:border-black dark:hover:border-white transition-colors">LinkedIn</motion.a>
                        <motion.a variants={linkVariant} whileHover="hover" href="#" className="border-b-2 border-transparent hover:border-black dark:hover:border-white transition-colors">Twitter</motion.a>
                        <motion.a variants={linkVariant} whileHover="hover" href="mailto:hello@example.com" className="border-b-2 border-transparent hover:border-black dark:hover:border-white transition-colors">Email</motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
