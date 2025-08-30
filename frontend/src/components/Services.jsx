import React, { useState } from 'react';

const Services = () => {
  // State to track the currently active service filter
  const [activeService, setActiveService] = useState('networking');

  const serviceCategories = [
    'networking', 'compute', 'storage', 'security', 'database', 'devops'
  ];

  return (
    <section id="services" className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Cloud Services Comparison</h2>

      {/* Service filter pills */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {serviceCategories.map(service => (
          <button
            key={service}
            className={`service-pill ${activeService === service ? 'active' : ''}`}
            onClick={() => setActiveService(service)}
          >
            {/* Capitalize the first letter for display */}
            {service.charAt(0).toUpperCase() + service.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-8">
        <div className="services-grid">
          {/* Networking Table */}
          <div className={`service-category ${activeService === 'networking' ? 'active' : ''}`}>
            <h2 className="text-2xl font-semibold mb-4 text-center">Networking Services</h2>
            <div className="comparison-table">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="p-3">Cloud Provider</th>
                    <th className="p-3">Load Balancing</th>
                    <th className="p-3">VPC</th>
                    <th className="p-3">CDN</th>
                    <th className="p-3">DNS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3">AWS</td>
                    <td className="p-3">ELB</td>
                    <td className="p-3">Amazon VPC</td>
                    <td className="p-3">CloudFront</td>
                    <td className="p-3">Route 53</td>
                  </tr>
                  <tr>
                    <td className="p-3">Azure</td>
                    <td className="p-3">Azure LB</td>
                    <td className="p-3">Virtual Network</td>
                    <td className="p-3">Azure CDN</td>
                    <td className="p-3">Azure DNS</td>
                  </tr>
                  <tr>
                    <td className="p-3">GCP</td>
                    <td className="p-3">Cloud Load Balancing</td>
                    <td className="p-3">VPC Network</td>
                    <td className="p-3">Cloud CDN</td>
                    <td className="p-3">Cloud DNS</td>
                  </tr>
                  <tr>
                    <td className="p-3">Oracle Cloud</td>
                    <td className="p-3">OCI LB</td>
                    <td className="p-3">Virtual Cloud Network</td>
                    <td className="p-3">OCI CDN</td>
                    <td className="p-3">OCI DNS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Placeholder for other service categories */}
          {activeService === 'compute' && <div className="service-category active"><h2>Compute Services</h2>{/* Add table here */}</div>}
          {activeService === 'storage' && <div className="service-category active"><h2>Storage Services</h2>{/* Add table here */}</div>}
          {activeService === 'security' && <div className="service-category active"><h2>Security Services</h2>{/* Add table here */}</div>}
          {activeService === 'database' && <div className="service-category active"><h2>Database Services</h2>{/* Add table here */}</div>}
          {activeService === 'devops' && <div className="service-category active"><h2>DevOps Services</h2>{/* Add table here */}</div>}
        </div>
      </div>
    </section>
  );
};

export default Services;