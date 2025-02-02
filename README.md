
# Environmental Dashboard 🌍

A modern, responsive React dashboard for visualizing environmental metrics with dark mode support and interactive charts.

![GitHub](https://img.shields.io/github/license/Temiloluwagboyega/Sustainability-dashboard)
![React](https://img.shields.io/badge/React-18.0.0-blue)
![Chart.js](https://img.shields.io/badge/Chart.js-4.0.0-brightgreen)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC)

## Features ✨

- **Real-time Visualization**
  - Line chart for carbon emissions trends
  - Bar chart for energy savings analysis
  - Pie chart for air quality distribution
- **Interactive Controls**
  - Date range filtering
  - Dark/Light mode toggle with local storage persistence
- **Responsive Design**
  - Mobile-first approach
  - Collapsible sidebar navigation
  - Touch-friendly interface
- **Modern UI**
  - Smooth transitions
  - Dynamic theming
  - Interactive charts

## Tech Stack 🛠️

- **Frontend:** React
- **Visualization:** Chart.js & react-chartjs-2
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State:** Local Storage for theme persistence

## Getting Started 🚀

### Prerequisites

- Node.js (v16.0+)
- npm (v7.0+)

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/Temiloluwagboyega/Sustainability-dashboard.git
   cd Sustainability-dashboard
   ```

2. Install NPM packages
   ```sh
   npm install
   ```

3. Start the development server
   ```sh
   npm run dev
   ```

## Project Structure 📁

```
src/
├── components/
│   ├── Dashboard.jsx    # Main dashboard component
│   └── Sidebar.jsx      # Navigation sidebar
├── data/
│   └── mockData.json    # Mock environmental data
└── index.css            # Global styles
```

## Component Details 🔍

### Dashboard Component

```javascript
// Key features
const [data, setData] = useState([]);
const [filteredData, setFilteredData] = useState([]);
const [darkMode, setDarkMode] = useState(
  localStorage.getItem("darkMode") === "true"
);
const [dateRange, setDateRange] = useState({ start: "", end: "" });
```

### Sidebar Navigation

```javascript
// Navigation structure
const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: BarChart, label: 'Statistics', path: '/statistics', active: true },
  { icon: Users, label: 'Team', path: '/team' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];
```

## Styling Guide 🎨

### Dark Mode Configuration

```javascript
const getChartOptions = (title) => ({
  plugins: {
    legend: {
      labels: {
        color: darkMode ? '#fff' : '#000'
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      }
    }
  }
});
```

## Responsive Design 📱

- Mobile-first approach
- Breakpoints optimization
- Flexible layouts
- Touch-friendly elements

## Configuration ⚙️

### Theme Persistence

```javascript
localStorage.setItem("darkMode", darkMode);
```

## Roadmap 🗺️

- [ ] Additional chart types
- [ ] Data export functionality
- [ ] Date range comparison features
- [ ] Real-time data updates
- [ ] Enhanced filtering options
- [ ] Improved mobile interactions
- [ ] Performance optimizations

## Author ✍️

Temiloluwa Gboyega
- GitHub: [@Temiloluwagboyega](https://github.com/Temiloluwagboyega)

## Contributing 🤝

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
⭐️ From [Temiloluwagboyega](https://github.com/Temiloluwagboyega)
