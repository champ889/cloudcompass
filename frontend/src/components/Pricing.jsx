import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Pricing = () => {
  const [computeHours, setComputeHours] = useState(720);
  const [storage, setStorage] = useState(1000);
  const [networkTransfer, setNetworkTransfer] = useState(500);
  const [chartData, setChartData] = useState({
    labels: ['AWS', 'Azure', 'GCP', 'Oracle Cloud'],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // Pricing data
    const pricing = {
      aws: { compute: 0.04, storage: 0.10, network: 0.09 },
      azure: { compute: 0.045, storage: 0.09, network: 0.085 },
      gcp: { compute: 0.035, storage: 0.08, network: 0.08 },
      oracle: { compute: 0.025, storage: 0.05, network: 0.07 },
    };

    // Calculate costs
    const costs = {
      aws: computeHours * pricing.aws.compute + storage * pricing.aws.storage + networkTransfer * pricing.aws.network,
      azure: computeHours * pricing.azure.compute + storage * pricing.azure.storage + networkTransfer * pricing.azure.network,
      gcp: computeHours * pricing.gcp.compute + storage * pricing.gcp.storage + networkTransfer * pricing.gcp.network,
      oracle: computeHours * pricing.oracle.compute + storage * pricing.oracle.storage + networkTransfer * pricing.oracle.network,
    };

    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDarkMode ? '#F3F4F6' : '#1F2937';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    setChartData({
      labels: ['AWS', 'Azure', 'GCP', 'Oracle Cloud'],
      datasets: [
        {
          label: 'Estimated Monthly Cost ($)',
          data: [costs.aws, costs.azure, costs.gcp, costs.oracle],
          backgroundColor: ['#FF9900', '#0078D4', '#4285F4', '#F80000'],
        },
      ],
    });

    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Estimated Monthly Cloud Costs',
          color: textColor,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: textColor, callback: (value) => '$' + value },
          grid: { color: gridColor },
        },
        x: {
          ticks: { color: textColor },
          grid: { color: gridColor },
        },
      },
    });

  }, [computeHours, storage, networkTransfer]); // Re-run effect when inputs change

  return (
    <section id="pricing" className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Pricing Calculator</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="price-calculator p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Price Calculator</h3>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Compute Hours</label>
              <input
                type="number"
                value={computeHours}
                onChange={(e) => setComputeHours(Number(e.target.value))}
                className="form-input rounded-md bg-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Storage (GB)</label>
              <input
                type="number"
                value={storage}
                onChange={(e) => setStorage(Number(e.target.value))}
                className="form-input rounded-md bg-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Network Transfer (GB)</label>
              <input
                type="number"
                value={networkTransfer}
                onChange={(e) => setNetworkTransfer(Number(e.target.value))}
                className="form-input rounded-md bg-transparent"
              />
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg shadow-lg" style={{ height: '400px', position: 'relative' }}>
          {chartData.datasets.length > 0 && <Bar options={chartOptions} data={chartData} />}
        </div>
      </div>
    </section>
  );
};

export default Pricing;