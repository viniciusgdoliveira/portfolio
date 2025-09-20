'use client';

import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Simple mailto submission - opens user's email client
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
    const body = encodeURIComponent(
      `Hi Vinícius,\n\n` +
      `Name: ${formData.firstName} ${formData.lastName}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `Sent from your portfolio contact form.`
    );
    
    const mailtoLink = `mailto:viniciusgdoliveira@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    // Show success message
    setSubmitStatus('success');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen liquid-bg">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="liquid-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {t('sendMessage')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-white text-sm font-medium mb-2">
                    {t('firstName')}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 liquid-glass-light text-white placeholder-white/60 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('firstName')}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-white text-sm font-medium mb-2">
                    {t('lastName')}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 liquid-glass-light text-white placeholder-white/60 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('lastName')}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                  {t('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 liquid-glass-light text-white placeholder-white/60 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('email')}
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-white text-sm font-medium mb-2">
                  {t('subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 liquid-glass-light text-white placeholder-white/60 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('subject')}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 liquid-glass-light text-white placeholder-white/60 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder={t('message')}
                />
              </div>
              
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="p-4 liquid-glass-light border border-green-500/20 rounded-[20px]">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-400 font-medium">Message sent successfully!</span>
                  </div>
                  <p className="text-white/80 text-sm mt-2">Thank you for your message. I'll get back to you soon!</p>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="p-4 liquid-glass-light border border-red-500/20 rounded-[20px]">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-red-400 font-medium">Error sending message</span>
                  </div>
                  <p className="text-white/80 text-sm mt-2">{errorMessage}</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-semibold py-3 px-8 rounded-[20px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isSubmitting 
                    ? 'liquid-glass-light text-white/50 cursor-not-allowed' 
                    : 'liquid-button text-white hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </div>
                ) : (
                  t('sendButton')
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('contactInfo')}
            </h2>
            <p className="text-lg text-white/80">
              {t('followMe')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="liquid-card p-6 text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <a 
                href="mailto:viniciusgdoliveira@gmail.com"
                className="text-white/80 hover:text-white transition-colors"
              >
                viniciusgdoliveira@gmail.com
              </a>
            </div>
            
            <div className="liquid-card p-6 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
              <a 
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                {t('whatsappMessage')}
              </a>
            </div>
            
            <div className="liquid-card p-6 text-center">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">LinkedIn</h3>
              <a 
                href="https://linkedin.com/in/viniciusgdoliveira"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                viniciusgdoliveira
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center space-x-2 text-white hover:text-white/80 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-[20px] px-4 py-2 bg-white/10 hover:bg-white/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </Link>
        </div>
      </section>
    </div>
  );
}