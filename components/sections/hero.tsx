import React from "react";
import { HeadingSparkles } from "@/components/ui/headingSparkles";

interface HeroProps {
	title: string;
	image?: string;
}

const Hero = ({ title }: HeroProps) => {
	return (
		<div>
			<HeadingSparkles title={title} />
		</div>
	);
};

export default Hero;
