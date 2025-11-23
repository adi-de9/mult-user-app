# Multi-User Notes App

A secure, multi-user note-taking application built with React Native, Expo, and Redux. Create private notes, switch between multiple user accounts, and keep your data secure with encrypted authentication.

## 🚀 Features

- **Multi-User Support**: Create and switch between multiple user accounts
- **Secure Authentication**: Password and PIN-based login options
- **Local Storage**: Notes and user data stored securely on device
- **Modern UI**: Clean, responsive interface with smooth animations
- **Offline-First**: Works without an internet connection
- **Cross-Platform**: Runs on iOS, Android, and Web

## VIDEO TUTORIAL

https://www.youtube.com/watch?v=zgz6kaqtyIc

## VIDEO TUTORIAL

live link: https://expo.dev/accounts/kilefex/projects/multy-note/builds/badfe47c-d642-423d-8d51-810c8765b17c

## 🛠️ Setup Instructions


### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app (for mobile testing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/adi-de9/mult-user-app
   cd multy-note
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npx expo start
   # or
   yarn start
   ```

4. Run the app:
   - **iOS**: Press `i` in the terminal or scan the QR code with your iPhone camera
   - **Android**: Press `a` in the terminal or scan the QR code with Expo Go
   - **Web**: Press `w` in the terminal

### First-Time Setup

1. Create a new account using the sign-up screen
2. Choose a secure password or set up a 4-digit PIN
3. Start creating and managing your notes!

## 📚 Core Technologies

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **Redux** - State management
- **TypeScript** - Type-safe JavaScript
- **Expo Router** - Navigation and routing
- **AsyncStorage** - Local data persistence
- **Expo Crypto** - Secure password hashing
- **React Native Paper** - UI components
- **React Native Vector Icons** - Icon library

## 🔒 Security Features

- Secure password hashing with SHA-256
- Separate authentication for each user account
- Encrypted storage for sensitive data
- Automatic session management

## 🐛 Known Issues / Limitations

- User data is currently stored locally (no cloud sync)
- No password recovery mechanism
- Limited to text notes (no rich text or media support yet)
- No data export/backup functionality

## 🚧 Future Improvements

- [ ] Add cloud sync functionality
- [ ] Implement note sharing between users
- [ ] Add rich text formatting support
- [ ] Include media attachments in notes
- [ ] Add biometric authentication (Face ID/Touch ID)
- [ ] Implement data backup/export

### Core
- **React Native** - Framework for building native apps
- **Expo** - Platform for building cross-platform apps
- **Expo Router** - File-based routing for React Native
- **Redux Toolkit** - State management
- **React Navigation** - Navigation between screens

### UI & Styling
- **NativeWind** - Utility-first CSS framework
- **Expo Vector Icons** - Icon library
- **React Native Reanimated** - Smooth animations
- **React Native Gesture Handler** - Gesture recognition

### Storage
- **AsyncStorage** - Local storage for data persistence
- **Expo File System** - File system access

### Utilities
- **Expo Image Picker** - Image selection
- **Expo Haptics** - Haptic feedback
- **Expo Web Browser** - In-app browser

## 🐛 Known Issues

- Image uploads may be slow on some devices
- Some UI elements may need adjustment on smaller screens
- Offline sync functionality is currently in development

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
