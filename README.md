# My Location Tracker

A modern React Native application built with Expo for tracking and managing locations. This app provides a user-friendly interface for location tracking with features like map integration, location history, and real-time updates.

Video link

https://drive.google.com/file/d/12TU59fc_C4lFC-0P5fFsBEXMN_hpmBBU/view?usp=sharing

Expo Snack Link

https://snack.expo.dev/@evanoralph/mylocatorapp

## 🚀 Features

- Real-time location tracking
- Interactive map interface
- Location history management
- Modern UI with smooth animations
- Cross-platform support (iOS & Android)

## 📱 How the App Works

### Location Tracking
The app uses the device's GPS capabilities to track your location in real-time. It provides:

### Map Integration
- Interactive Google Maps interface
- Real-time location marker
- Location search and autocomplete
- Custom map markers for saved locations

### User Interface
- Clean and intuitive design
- Smooth animations for better user experience
- Responsive layout for different screen sizes
- Gesture-based navigation

## 🛠️ Tech Stack

### Core Technologies
- **React Native** - Mobile app framework
- **Expo** - Development platform for React Native
- **TypeScript** - Type-safe JavaScript
- **NativeWind** - Utility-first CSS framework for React Native
- **TailwindCSS** - Styling framework

### Key Libraries
- **expo-location** - Location services integration
- **react-native-maps** - Map rendering and interaction
- **react-native-google-places-autocomplete** - Location search and autocomplete
- **@gluestack-ui** - UI component library
- **expo-router** - File-based routing
- **react-native-reanimated** - Smooth animations
- **lottie-react-native** - Animation support

## 📁 Project Structure

```
my-location-tracker/
├── app/                 # Main application routes and screens
├── assets/             # Static assets (images, fonts, etc.)
├── components/         # Reusable UI components
├── constants/          # App-wide constants and configurations
├── hooks/              # Custom React hooks
├── scripts/            # Utility scripts
├── .env                # Environment variables
├── app.config.json     # Expo configuration
├── babel.config.js    # Babel configuration
├── metro.config.js    # Metro bundler configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or later)
- yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd my-location-tracker
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn start
```

4. Run on specific platform:
```bash
# For iOS
yarn ios
# For Android
yarn android
```

## 🔧 Configuration

The app uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:
```
GOOGLE_MAPS_API_KEY=your_api_key_here
```
