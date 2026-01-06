import React, { useState } from 'react';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id='pricing' className="py-24 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Simple, transparent <span className="text-primary">pricing</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            Choose the plan that's right for you. All plans include access to our basic URL shortening tools.
          </p>

          {/* Monthly/Yearly Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 bg-slate-200 dark:bg-surface-dark rounded-full p-1 transition-colors duration-300 focus:outline-none ring-2 ring-primary/20"
            >
              <div className={`size-5 bg-primary rounded-full transition-transform duration-300 transform ${isYearly ? 'translate-x-7' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
              Yearly <span className="ml-1 text-xs text-green-500 font-bold uppercase">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Free Plan */}
          <PricingCard 
            title="Free"
            price="0"
            description="Perfect for individuals and side projects."
            features={["50 Links / month", "Basic Analytics", "QR Code Support", "Community Support"]}
            buttonText="Get Started"
            isPopular={false}
          />

          {/* Pro Plan */}
          <PricingCard 
            title="Professional"
            price={isYearly ? "19" : "24"}
            description="Advanced tools for growing brands and creators."
            features={["Unlimited Links", "Advanced Analytics", "Custom Branded Domains", "API Access", "Priority Support"]}
            buttonText="Start Free Trial"
            isPopular={true}
          />

          {/* Enterprise Plan */}
          <PricingCard 
            title="Enterprise"
            price="99"
            description="Scalable solutions for large marketing teams."
            features={["Multiple Team Members", "SAML SSO", "Dedicated Account Manager", "Custom SLA", "White-label Dashboard"]}
            buttonText="Contact Sales"
            isPopular={false}
          />

        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ title, price, description, features, buttonText, isPopular }) => {
  return (
    <div className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 border ${
      isPopular 
      ? 'bg-white dark:bg-surface-dark border-primary shadow-glow scale-105 z-10' 
      : 'bg-white dark:bg-surface-dark border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-md'
    }`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline">
          <span className="text-4xl font-extrabold text-slate-900 dark:text-white">${price}</span>
          <span className="text-slate-500 ml-2 text-sm">/month</span>
        </div>
      </div>

      <ul className="space-y-4 mb-10 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
            {feature}
          </li>
        ))}
      </ul>

      <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
        isPopular 
        ? 'bg-primary hover:bg-primary-dark text-white shadow-lg' 
        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
      }`}>
        {buttonText}
      </button>
    </div>
  );
};

export default Pricing;