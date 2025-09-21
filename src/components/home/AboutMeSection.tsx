/** @format */

"use client";

import { useTranslations } from "next-intl";
import { AboutCarousel } from "@/components/about/AboutCarousel";
import { AboutSection } from "@/types/about";

interface AboutMeSectionProps {
	sections: AboutSection[];
	className?: string;
}

export function AboutMeSection({ sections, className }: AboutMeSectionProps) {
	const t = useTranslations("home");

	return (
		<section className={`container mx-auto px-4 py-10 ${className || ""}`}>
			<div className="text-center mb-8">
				<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("aboutMe")}</h2>
				<p className="text-lg text-white/80">{t("aboutDescription")}</p>
			</div>

			<AboutCarousel
				sections={sections}
				autoRotate={true}
				interval={8000}
			/>
		</section>
	);
}
