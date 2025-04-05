# My Location Tracker

A modern React Native application built with Expo for tracking and managing locations. This app provides a user-friendly interface for location tracking with features like map integration, location history, and real-time updates.

## 🚀 Features

- Real-time location tracking
- Interactive map interface
- Location history management
- Modern UI with smooth animations
- Cross-platform support (iOS & Android)

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
├── app.json           # Expo configuration
├── babel.config.js    # Babel configuration
├── metro.config.js    # Metro bundler configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
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
# or
npm install
```

3. Start the development server:
```bash
yarn start
# or
npm start
```

4. Run on specific platform:
```bash
# For iOS
yarn ios
# For Android
yarn android
# For web
yarn web
```

## 🧪 Testing

Run the test suite:
```bash
yarn test
```

## 📝 Scripts

- `yarn start` - Start the Expo development server
- `yarn android` - Run on Android device/emulator
- `yarn ios` - Run on iOS simulator
- `yarn web` - Run on web browser
- `yarn test` - Run test suite
- `yarn lint` - Run linter
- `yarn reset-project` - Reset project configuration

## 🔧 Configuration

The app uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:
```
GOOGLE_MAPS_API_KEY=your_api_key_here
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
