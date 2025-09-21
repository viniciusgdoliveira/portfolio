/** @format */

"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { Button } from "@/components/ui/Button";
import { StructuredData, createWebPageSchema } from "@/components/seo/StructuredData";

export default function Contact() {
	const t = useTranslations("contact");
	const locale = useLocale();

	return (
		<div className="min-h-screen liquid-bg">
			<StructuredData data={createWebPageSchema(locale, "Contact")} />

			{/* Hero Section */}
			<section className="container mx-auto px-4 py-10">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{t("title")}</h1>
					<p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">{t("description")}</p>
				</div>
			</section>

			{/* Contact Form Section */}
			<section className="container mx-auto px-4 py-10">
				<div className="max-w-2xl mx-auto">
					<ContactForm />
				</div>
			</section>

			{/* Contact Information Section */}
			<section className="container mx-auto px-4 py-10">
				<div className="max-w-4xl mx-auto">
					<ContactInfo />
				</div>
			</section>

			{/* Back to Home Section */}
			<section className="container mx-auto px-4 py-10">
				<div className="max-w-4xl mx-auto text-center">
					<Button
						variant="secondary"
						size="md"
						asChild
					>
						<Link
							href={`/${locale}`}
							className="inline-flex items-center space-x-2"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
							<span>Back to Home</span>
						</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}
