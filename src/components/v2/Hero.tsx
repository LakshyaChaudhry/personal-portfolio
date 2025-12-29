import { motion } from 'framer-motion';
import MagneticLetter from './MagneticLetter';

const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", damping: 12, stiffness: 100 }
    }
};

const sentenceAnimation = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.5,
            staggerChildren: 0.08,
        }
    }
};

export default function Hero() {
    const firstName = "LAKSHYA".split("");
    const lastName = "CHAUDHRY".split("");

    return (
        <section className="min-h-[85vh] flex flex-col justify-center relative overflow-hidden">
            <div className="flex flex-col gap-2 md:gap-4 select-none relative z-10">
                {/* First Name */}
                <motion.div
                    variants={sentenceAnimation}
                    initial="hidden"
                    animate="visible"
                    className="flex overflow-hidden"
                >
                    {firstName.map((char, index) => (
                        <motion.div key={index} variants={letterAnimation}>
                            <MagneticLetter
                                className="text-[12vw] leading-[0.85] font-bold tracking-tighter text-black dark:text-white"
                            >
                                {char}
                            </MagneticLetter>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Last Name */}
                <motion.div
                    variants={sentenceAnimation}
                    initial="hidden"
                    animate="visible"
                    className="flex overflow-hidden"
                >
                    {lastName.map((char, index) => (
                        <motion.div key={index} variants={letterAnimation}>
                            <MagneticLetter
                                className="text-[12vw] leading-[0.85] font-bold tracking-tighter text-neutral-500"
                            >
                                {char}
                            </MagneticLetter>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
                className="mt-16 space-y-2"
            >
                <p className="text-xl md:text-2xl font-light text-neutral-300">
                    Building elegant solutions to complex problems.
                </p>
                <p className="text-xl md:text-2xl font-light text-neutral-400">
                    AI @ Purdue <span className="text-neutral-600">|</span> AI Safety Research
                </p>
            </motion.div>
        </section>
    );
}
