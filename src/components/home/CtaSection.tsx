/** @format */

"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface CtaSectionProps {
	locale: string;
	className?: string;
}

export function CtaSection({ locale, className }: CtaSectionProps) {
	const t = useTranslations("home");

	return (
		<section className={`container mx-auto px-4 py-10 ${className || ""}`}>
			<div className="max-w-4xl mx-auto text-center">
				<Card className="p-12">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("cta.title")}</h2>
					<p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">{t("cta.description")}</p>

					<Button
						variant="primary"
						size="lg"
						asChild
					>
						<Link href={`/${locale}/contact`}>{t("cta.getInTouch")}</Link>
					</Button>
				</Card>
			</div>
		</section>
	);
}
