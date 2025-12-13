import React from 'react';

const Hero = () => {
    const scrollToPricing = () => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="mt-20 pt-20 pb-40 px-4 bg-gradient-to-br from-blue-600 to-indigo-900 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">CloudCompass</h1>
                    <p className="text-xl mb-8">Get accurate cost estimates and compare services across AWS, Azure, Google Cloud, and Oracle Cloud.</p>
                    <button onClick={scrollToPricing} className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">Get Started</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;