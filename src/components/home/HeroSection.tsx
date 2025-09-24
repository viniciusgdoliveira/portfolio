/** @format */

"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
	locale: string;
	className?: string;
}

export function HeroSection({ locale, className }: HeroSectionProps) {
	const t = useTranslations("home");

	return (
		<section className={`container mx-auto px-4 pb-10 ${className || ""}`}>
			<div className="max-w-4xl mx-auto text-center">
				<div className="mb-8">
					<div className="w-32 h-32 liquid-glass mx-auto mb-6 flex items-center justify-center floating overflow-hidden rounded-full">
						<Image
							src="https://cdn.shopify.com/s/files/1/0666/0207/4202/files/vinicius-transparent-bg.png?v=1752328643"
							alt="Vinícius Guimarães de Oliveira"
							width={128}
							height={128}
							className="w-full h-full object-cover"
							priority
						/>
					</div>
				</div>

				<h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
					<span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Vinícius Guimarães de Oliveira</span>
				</h1>

				<p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">{t("subtitle")}</p>

				<p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">{t("description")}</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<Button
						variant="primary"
						size="lg"
						asChild
					>
						<Link href={`/${locale}/projects`}>{t("viewWork")}</Link>
					</Button>

					<Button
						variant="glass"
						size="lg"
						asChild
					>
						<Link href={`/${locale}/chat`}>{t("talkWithMe")}</Link>
					</Button>

					<Button
						variant="glass"
						size="lg"
						asChild
					>
						<Link href={`/${locale}/contact`}>{t("getInTouch")}</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
