import React, { useRef } from 'react';

const News = () => {
  const newsContainerRef = useRef(null);

  const newsData = [
      { title: 'AWS announces new Sydney region expansion', date: '2024-07-20', source: 'AWS News', link: '#' },
      { title: 'Microsoft Azure enhances AI capabilities for Australian businesses', date: '2024-07-18', source: 'Azure Updates', link: '#' },
      { title: 'Google Cloud Platform reduces pricing for network egress', date: '2024-07-15', source: 'GCP Blog', link: '#' },
      { title: 'Oracle Cloud Infrastructure launches new edge locations in Australia', date: '2024-07-12', source: 'Oracle News', link: '#' },
      { title: 'AWS introduces new sustainability features', date: '2024-07-10', source: 'AWS Blog', link: '#' },
      { title: 'Azure announces partnership with Australian startups', date: '2024-07-08', source: 'Azure News', link: '#' }
  ];

  const scroll = (direction) => {
    if (newsContainerRef.current) {
      const { current } = newsContainerRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="news" className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Latest Updates</h2>
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          <button 
            className="news-scroll-button prev" 
            onClick={() => scroll('left')}>
            ←
          </button>
          <div 
            ref={newsContainerRef}
            className="flex gap-6 overflow-x-hidden scroll-smooth p-2"
          >
            {newsData.map((item, index) => (
              <div key={index} className="news-item flex-shrink-0 w-full md:w-1/3 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{item.date} - {item.source}</p>
                <a href={item.link} className="text-blue-500 hover:underline">Read More →</a>
              </div>
            ))}
          </div>
          <button 
            className="news-scroll-button next" 
            onClick={() => scroll('right')}>
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;