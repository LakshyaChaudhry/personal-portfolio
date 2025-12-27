import { motion } from 'framer-motion';

export default function About() {
    return (
        <section className="py-32">
            <div className="max-w-4xl mx-auto text-center px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-sm font-mono text-neutral-500 tracking-widest uppercase mb-12"
                >
                    About Me
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-8 text-2xl md:text-4xl font-light text-neutral-800 dark:text-neutral-200 leading-relaxed"
                >
                    <p>
                        I am a full-stack developer and researcher focused on <span className="font-normal text-black dark:text-white">AI Alignment</span> and <span className="font-normal text-black dark:text-white">Engineering Agents</span>.
                    </p>
                    <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400">
                        My work revolves around building robust, scalable systems that bridge the gap between advanced machine learning research and practical, safe applications.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-32 pt-12 border-t border-neutral-200 dark:border-white/5"
                >
                    <h3 className="text-neutral-500 font-mono text-xs tracking-widest uppercase mb-8">Connect</h3>
                    <div className="flex justify-center gap-12 text-sm font-medium tracking-wide text-neutral-600 dark:text-neutral-400">
                        <a href="#" className="hover:text-black dark:hover:text-white transition-colors">GITHUB</a>
                        <a href="#" className="hover:text-black dark:hover:text-white transition-colors">LINKEDIN</a>
                        <a href="#" className="hover:text-black dark:hover:text-white transition-colors">TWITTER</a>
                        <a href="mailto:hello@example.com" className="hover:text-black dark:hover:text-white transition-colors">EMAIL</a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
