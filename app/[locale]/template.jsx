"use client";

const Template = ({ children }) => {
	return (
		// <motion.div
		// 	initial={{ y: 5, opacity: 0 }}
		// 	animate={{ y: 0, opacity: 1 }}
		// 	transition={{ ease: "easeInOut", duration: 0.75 }}
		// 	key={pathname}
		// >
		<>
			{children}
		</>
		// </motion.div>
	);
};

export default Template;
