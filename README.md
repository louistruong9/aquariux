# Aquariux Weather App

A modern weather application built with React and TypeScript that provides real-time weather information and forecasts using the OpenWeather API.

## Technologies Used

- **Framework**: React with TypeScript
- **Routing**: React Router
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, Shadcn
- **State Management**: Zustand
- **Testing**: Vitest
- **Linting**: ESLint
- **Formatting**: Prettier
- **Node Version**: 22.14.0

## Prerequisites

- Node.js (v22.14.0 or higher)
- npm or yarn package manager
- OpenWeather API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aquariux.git
cd aquariux
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your OpenWeather API key:
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Run tests:
```bash
npm test
# or
yarn test
```
5. Start the production server:
```bash
npm run build
npm run preview
# or
yarn build
yarn preview
```

## Project Structure

```
aquariux/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── store/         # Zustand store
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   └── App.tsx        # Main application component
├── __tests__/         # Test files
├── public/            # Static assets
└── package.json       # Project dependencies
```

## Features Implementation

### Current Weather
- Real-time weather data display
- Responsive design for all screen sizes
- Clear and intuitive UI with weather icons

### Forecast
- 5-day weather forecast with 3-hour intervals
- Organized display by days
- Temperature range and weather conditions for each forecast

### Search Functionality
- City search with validation
- Persistent search history
- Error handling for invalid searches
- Quick access to previously searched cities


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenWeather API for providing weather data
- React and TypeScript communities
- All contributors and maintainers
