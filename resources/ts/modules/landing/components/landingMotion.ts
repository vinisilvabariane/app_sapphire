export const fadeUp = {
    hidden: { opacity: 1, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
};

export const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};
