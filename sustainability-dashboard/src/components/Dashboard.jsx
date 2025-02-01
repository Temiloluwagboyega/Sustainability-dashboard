import React, { useState, useEffect, useRef } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import mockData from "../mockData.json";
import '../index.css';
import Sidebar from "./Sidebar";

Chart.register(...registerables);

const chartContainerStyle = {
  width: '100%',
  height: 'auto',
  minHeight: '300px',
  padding: '10px',
  marginBottom: '20px'
};

const Dashboard = () => {
  // Define all state variables
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Define refs
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  // Chart options function
  const getChartOptions = (title) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? '#fff' : '#000',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: title,
        color: darkMode ? '#fff' : '#000',
        font: {
          size: 16
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: darkMode ? '#fff' : '#000'
        }
      },
      y: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: darkMode ? '#fff' : '#000'
        }
      }
    }
  });

  // Effect for initial data load
  useEffect(() => {
    setData(mockData);
    setFilteredData(mockData);
  }, []);

  // Effect for dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = '#1a1a1a';
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = '#ffffff';
    }
    localStorage.setItem("darkMode", darkMode);

    [lineChartRef, barChartRef, pieChartRef].forEach(ref => {
      if (ref.current?.chartInstance) {
        ref.current.chartInstance.update();
      }
    });
  }, [darkMode]);

  // Effect for date filtering
  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      setFilteredData(
        data.filter(
          (item) => item.date >= dateRange.start && item.date <= dateRange.end
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [dateRange, data]);

  return (
    <div className="flex flex-wrap min-h-screen">
      <Sidebar
        darkMode={darkMode} 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className={`flex-1 transition-all duration-300 min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}>
        <div className="p-4 lg:p-6 pt-20 lg:pt-6">
          <div className="flex justify-end mb-6">
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${
                darkMode 
                  ? "bg-gray-700 hover:bg-gray-600 text-white" 
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              onClick={() => setDarkMode(prev => !prev)}
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </div>

          <div className="flex flex-wrap gap-4 items-center mb-6">
            <div className="flex items-center w-full sm:w-auto">
              <label className={`mr-2 ${darkMode ? "text-white" : "text-black"}`}>
                Start:
              </label>
              <input 
                type="date" 
                value={dateRange.start} 
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} 
                className={`p-2 rounded border w-full sm:w-auto ${
                  darkMode 
                    ? "bg-gray-800 border-gray-700 text-white" 
                    : "bg-white border-gray-300"
                }`}
              />
            </div>
            
            <div className="flex items-center w-full sm:w-auto">
              <label className={`mr-2 ${darkMode ? "text-white" : "text-black"}`}>
                End:
              </label>
              <input 
                type="date" 
                value={dateRange.end} 
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} 
                className={`p-2 rounded border w-full sm:w-auto ${
                  darkMode 
                    ? "bg-gray-800 border-gray-700 text-white" 
                    : "bg-white border-gray-300"
                }`}
              />
            </div>
          </div>

          <h1 className="text-xl lg:text-2xl font-bold text-center mb-6">Statistics Chart for the Month of Jan 2025</h1>

          <div className="grid grid-cols-1 gap-4">
            <div className={`p-2 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`} style={chartContainerStyle}>
              <div className="h-[400px]">
                <Line 
                  ref={lineChartRef}
                  data={{
                    labels: filteredData.map(item => item.date),
                    datasets: [{
                      label: "Emissions (kg)",
                      data: filteredData.map(item => item.carbon),
                      borderColor: darkMode ? "#4ade80" : "#2563eb",
                      backgroundColor: darkMode 
                        ? "rgba(74, 222, 128, 0.2)" 
                        : "rgba(37, 99, 235, 0.2)",
                      borderWidth: 2,
                      pointRadius: 3,
                      pointHoverRadius: 8,
                      tension: 0.4,
                      fill: true
                    }]
                  }} 
                  options={{
                    ...getChartOptions("Carbon Emissions"),
                    elements: {
                      line: {
                        cubicInterpolationMode: 'monotonic'
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className={`p-2 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`} style={chartContainerStyle}>
              <div className="h-[400px]">
                <Bar 
                  ref={barChartRef}
                  data={{
                    labels: filteredData.map(item => item.date),
                    datasets: [{
                      label: "Energy Savings (kWh)",
                      data: filteredData.map(item => item.energy),
                      backgroundColor: darkMode ? "#22d3ee" : "#3b82f6",
                      borderWidth: 2,
                      borderRadius: 2,
                      barThickness: 10,
                      maxBarThickness: 50,
                      categoryPercentage: 0.7,
                      barPercentage: 0.8
                    }]
                  }} 
                  options={getChartOptions("Energy Savings")}
                />
              </div>
            </div>

            <div className={`p-2 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`} style={chartContainerStyle}>
              <div className="h-[400px]">
                <Pie 
                  ref={pieChartRef}
                  data={{
                    labels: ["Good", "Moderate", "Unhealthy"],
                    datasets: [{
                      label: "Air Quality",
                      data: [40, 35, 25],
                      backgroundColor: darkMode 
                        ? ["#4ade80", "#facc15", "#f87171"]
                        : ["#22c55e", "#eab308", "#ef4444"],
                      borderWidth: 3,
                      hoverOffset: 25
                    }]
                  }} 
                  options={{
                    ...getChartOptions("Air Quality Index"),
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: darkMode ? '#fff' : '#000',
                          font: {
                            size: 14
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;