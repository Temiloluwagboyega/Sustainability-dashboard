import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Sun, Moon, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock data generator
const generateMockData = (days = 30) => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    carbonEmissions: Math.round(Math.random() * 100 + 50),
    energySavings: Math.round(Math.random() * 200 + 100),
    airQualityIndex: Math.round(Math.random() * 150 + 50)
  }));
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData = generateMockData(dateRange);
        setData(mockData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const aggregateData = () => ({
    totalEmissions: data.reduce((sum, day) => sum + day.carbonEmissions, 0),
    totalSavings: data.reduce((sum, day) => sum + day.energySavings, 0),
    averageAQI: Math.round(data.reduce((sum, day) => sum + day.airQualityIndex, 0) / data.length)
  });

  const stats = aggregateData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Sustainability Dashboard</h1>
          <div className="flex gap-4">
            <select 
              className="p-2 rounded bg-white dark:bg-gray-800"
              value={dateRange}
              onChange={(e) => setDateRange(Number(e.target.value))}
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="icon"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Carbon Emissions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalEmissions} kg</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Energy Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalSavings} kWh</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Air Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">AQI {stats.averageAQI}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Emissions Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart width={500} height={300} data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="carbonEmissions" stroke="#0088FE" />
              </LineChart>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Energy Savings Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart width={500} height={300} data={data.slice(-7)}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="energySavings" fill="#00C49F" />
              </BarChart>
            </CardContent>
          </Card>
        </div>

        <Alert className="mt-6">
          <AlertDescription>
            Data shown is for demonstration purposes only. Last updated: {new Date().toLocaleDateString()}
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default Dashboard;