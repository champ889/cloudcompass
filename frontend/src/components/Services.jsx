import React, { useState, useEffect } from 'react';

const Services = () => {
  // State for the entire services data, loading status, and errors
  const [servicesData, setServicesData] = useState(null);
  const [providersData, setProvidersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to track the currently active category filter
  const [activeCategory, setActiveCategory] = useState('');

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    // Assuming your backend runs on port 3001
    fetch(`/api/services`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setServicesData(data.Categories);
        setProvidersData(data.Providers);
        // Set the first category as the default active one
        if (data.Categories && Object.keys(data.Categories).length > 0) {
          setActiveCategory(Object.keys(data.Categories)[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // The empty dependency array ensures this effect runs only once

  // Helper function to format category names for display (e.g., "AI_ML" -> "AI ML")
  const formatCategoryName = (name) => {
    return name.replace(/_/g, ' ');
  };

  // Define a consistent order and display name for providers
  const providers = {
    AWS: "AWS",
    Azure: "Azure",
    Google_Cloud_Platform: "GCP",
    Oracle: "Oracle",
    Alibaba: "Alibaba",
    IBM_Cloud: "IBM",
    Huawei: "Huawei"
  };

  const getServiceIcon = (service, providerKey) => {
    if (service.icon === 'UNAVAILABLE') {
        return getDefaultIcon(providerKey);
    }
    return service.icon;
  };

  const getDefaultIcon = (providerKey) => {
    switch (providerKey) {
        case "AWS":
            return "icons/aws/aws.png"
        case "Azure":
            return "icons/azure/azure.png"
        case "Google_Cloud_Platform":
            return "icons/google/google-icon.png"
        case "Oracle":
            return "icons/oracle/oracle.png"
        case "Alibaba":
            return "icons/alibaba/alibaba.png"
        case "IBM_Cloud":
            return "icons/ibm/ibm.png"
        case "Huawei":
            return "icons/huawei/hcs.png"
    }
  }

  const handleImageError = (e, providerKey) => {
    e.target.src = getDefaultIcon(providerKey);
  };

  // Handle loading and error states
  if (loading) return <p className="text-center py-20">Loading services...</p>;
  if (error) return <p className="text-center text-red-500 py-20">Error fetching services: {error}</p>;
  if (!servicesData) return <p className="text-center py-20">No service data available.</p>;

  // Get a list of all category keys from the data
  const serviceCategories = Object.keys(servicesData);
  const activeCategoryData = servicesData[activeCategory];

  return (
    <section id="services" className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Cloud Services Comparison</h2>

      {/* Service filter pills for medium screens and up */}
      <div className="hidden md:flex flex-wrap justify-center gap-2 md:gap-4 mb-12 px-4">
        {serviceCategories.map(category => (
          <button
            key={category}
            className={`service-pill ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {formatCategoryName(category)}
          </button>
        ))}
      </div>

      {/* Service filter dropdown for mobile */}
      <div className="md:hidden mb-12 px-4">
        <select
          aria-label="Select a service category"
          className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
        >
          {serviceCategories.map(category => (
            <option key={category} value={category}>
              {formatCategoryName(category)}
            </option>
          ))}
        </select>
      </div>

      {/* Dynamic Comparison Table */}
      <div className="px-4 md:px-8">
        <h3 className="text-2xl font-semibold mb-6 text-center">{formatCategoryName(activeCategory)}</h3>
        <div class="overflow-x-auto rounded-lg">
          <table class="min-w-full text-left comparison-table">
            <thead>
              <tr>
                {Object.values(providers).map(providerName => (
                  <th key={providerName} className="p-4 text-lg font-semibold">
                    {providerName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.keys(providers).map(providerKey => (
                  <td key={providerKey} className="p-4 align-top">
                    <ul className="space-y-3">
                      {activeCategoryData && activeCategoryData[providerKey] ? (
                        activeCategoryData[providerKey].map(service => (
                          <li key={service.name} className="flex items-center">
                            <img 
                              src={getServiceIcon(service, providerKey)} 
                              alt={`${service.name} icon`} 
                              className="w-6 h-6 mr-3 object-contain"
                              onError={(e) => handleImageError(e, providerKey)}
                            />
                            <span>{service.name}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-400 italic">N/A</li>
                      )}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Services;