import React from "react";

interface AboutProps {
	title: string;
}

const About = ({ title }: AboutProps) => {
	return (
		<div className="p-4 md:p-20">
			<p className="md:text-lg text-sm lg:text-xl font-bold text-center text-slate-300">
				{title}
			</p>
		</div>
	);
};

export default About;
