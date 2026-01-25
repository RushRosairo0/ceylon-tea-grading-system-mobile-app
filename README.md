<div align="center">
  <h1="center" style="font-size: 5em; margin: 0;">LeafMetric - Ceylon Tea Grading System Mobile Application</h1>
</div>

### LeafMetric – Ceylon Tea Grading System Mobile Application is a React Native application built with Expo that serves as the client interface for the LeafMetric Tea Grading System. It provides an intuitive and interactive experience for tea graders to capture tea leaf images, submit sensory input, and receive AI-powered grading results in real time.

### The app integrates seamlessly with the Node.js backend API, supporting secure user registration and login, image uploads, feedback submission, and access to historical grading results. It emphasizes user-friendly design, responsive workflows, and offline-aware capabilities, ensuring consistent performance across mobile devices.

### Structured with modular components, reusable hooks, and efficient state management, the app delivers a scalable foundation for future enhancements, including data visualization, notifications, and advanced analytics. LeafMetric Mobile empowers tea graders with actionable insights and a streamlined, intelligent workflow for evaluating tea quality.

### Built with

- [![React Native][ReactNative]][ReactNative-url]
- [![Expo][Expo]][Expo-url]
- [![JavaScript][JavaScript]][JavaScript-url]
- [![Axios][Axios]][Axios-url]

### Prerequisites

- NodeJS: [NodeJS download page](https://nodejs.org/en/download)
- ngrok: [ngrok download page](https://ngrok.com/download/windows)
- Expo CLI: [Expo CLI](https://docs.expo.dev/more/expo-cli/)
- Expo GO: [Expo GO download page](https://expo.dev/go)

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/RushRosairo0/ceylon-tea-grading-system-mobile-app.git
   ```
2. Step into the project
   ```bash
   cd ceylon-tea-grading-system-mobile-app
   ```
3. Step into the app (root) folder
   ```bash
   cd app
   ```

### Configuration setup

1. Launch ngrok in a new terminal to expose local server
   ```bash
   ngrok http 8000
   ```
2. Copy the generated forwarding URL from ngrok and update the `config/config.js` file
   ```js
   export const config = {
     API_URL: "<pase the forwarding URL here>",
   };
   ```

### Start the project using terminal

1. Install NPM packages
   ```bash
   npm install
   ```
2. Start the expo app
   ```bash
   npm run start
   ```
3. Open the app on your device by scanning the QR code with your mobile camera

### Other scripts

1. Start the android application
   ```bash
   npm run android
   ```
2. Start the IOS application
   ```bash
   npm run ios
   ```

<!-- MARKDOWN LINKS & IMAGES -->

[ReactNative]: https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=white
[ReactNative-url]: https://reactnative.dev/
[Expo]: https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white
[Expo-url]: https://expo.dev/
[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Axios]: https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white
[Axios-url]: https://axios-http.com/
