How to Run the Application

To run this React Native application locally, please follow the steps below.

First, make sure that Node.js is installed on your system. The recommended version is the latest LTS release.
You also need npm or yarn and Expo CLI installed globally.

If Expo CLI is not installed, install it using npm.

Step 1 – Clone the Repository

Download or clone the project repository from GitHub to your local machine.
After cloning, open the project folder in your code editor or terminal.

Step 2 – Install Dependencies

Inside the project folder, install all required dependencies using npm or yarn.
This step will download all packages defined in the project configuration.

Step 3 – Install Expo Dependencies

Make sure Expo is available in the project.
If needed, you can install Expo locally using npm.

Step 4 – Prebuild the Project (Optional)

If native folders are required (for Android or iOS native builds), run the Expo prebuild command.
This step generates the android and ios folders automatically.

Step 5 – Start the Application

Start the development server using Expo with cache cleaning enabled.
This ensures a clean start without old cached files.

After the server starts:

Scan the QR code using the Expo Go app on a mobile device

Or run the application on an Android or iOS emulator

Common Commands Used

The following commands are commonly used while working with this project:

npm install – installs project dependencies

npx expo prebuild – generates native Android and iOS folders

expo start -c – starts the development server with cache cleared

Troubleshooting

If the application does not start correctly:

Make sure all dependencies are installed

Clear the Expo cache and restart the server

Check Node.js version compatibility

Restart the emulator or Expo Go app if needed

Development Notes

This project uses Expo for faster development and easier environment setup.
The application is optimized for mobile devices and follows a modular screen-based structure.
