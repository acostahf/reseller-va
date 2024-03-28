import React from "react";
import { HeadingSparkles } from "@/components/ui/headingSparkles";

interface HeroProps {
	title: string;
	subtitle: string;
	image: string;
}

const Hero: React.FC<HeroProps> = ({ title }) => {
	return (
		<div>
			<HeadingSparkles title={title} />
		</div>
	);
};

export default Hero;
