# Med-Connect XR

Med-Connect XR is a Digital Twin Diagnostic Interface featuring WebAR visualizations such as antithrombotic effect visualization, real-time platelet mapping, and circulatory system visualizations.

## How to Run Locally

Because this project uses 3D models and WebAR technologies, opening the HTML files directly in your browser (e.g., `file:///path/to/index.html`) may not work correctly due to browser security restrictions (CORS) on loading local assets like `.glb` or `.mind` files.

To run this repository locally on your laptop, you need to serve the files using a local web server. Here are a few easy ways to do this:

**Clone the repo in the terminal:**

git clone <repo url>

### Option 1: Using VS Code (Recommended)
If you use Visual Studio Code:
1. Open the project folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions marketplace.
3. Right-click on `index.html` and select **"Open with Live Server"**.
4. Your default browser will open automatically and load the application.

### Option 2: Using Python
If you have Python installed on your computer, you can use its built-in HTTP server:
1. Open your terminal (Mac/Linux) or Command Prompt / PowerShell (Windows).
2. Navigate to the folder where you downloaded or cloned the repository:
   ```bash
   cd path/to/medconnect-xr
   ```
3. Start the server:
   - For Python 3: `python -m http.server 8000` (or `python3 -m http.server 8000` on Mac/Linux)
   - For Python 2 (older Macs): `python -m SimpleHTTPServer 8000`
4. Open your web browser and navigate to `http://localhost:8000`.

### Option 3: Using Node.js (npx)
If you are a web developer and have Node.js installed, you can quickly serve the directory:
1. Open your terminal.
2. Navigate to the project folder:
   ```bash
   cd path/to/medconnect-xr
   ```
3. Run the following command:
   ```bash
   npx serve .
   ```
4. Open your web browser and navigate to the local URL provided in the terminal (usually `http://localhost:3000`).

To run the project locally using npm (Node Package Manager), you will need to have Node.js installed on your laptop, which includes npm. Since this is a static website without a backend or build process, npm is used here simply to start a local web server to serve the HTML files.

Here are detailed step-by-step instructions:

1) Install Node.js: If you haven't already, download and install Node.js from nodejs.org. This will install both node and npm.

2) Open your Terminal or Command Prompt:
On Mac/Linux: Open the "Terminal" app.
On Windows: Open "Command Prompt" or "PowerShell".

3) Navigate to your project folder: Use the cd (change directory) command to navigate to the folder where you saved the repository files.
Start the local server using npm/npx: You can use the npx command (which comes with npm) to run a static server without needing to configure a package.json file. Run the following command: Alternatively, you can install a server globally using npm:
Open in your browser: The terminal will output a local address (usually http://localhost:3000 or http://127.0.0.1:8080). Open that URL in your web browser to view the application.

You need all the files (including aspirin-mode-of-action.html, app.js, styles.css, and any related 3D models or .mind files on your laptop.

Because this project is a "static website" (meaning all the code runs directly inside your web browser rather than on a remote server), your browser needs to have access to the physical files on your hard drive to display them.

When you run the local web server using npm or Python, the server is simply acting as a delivery mechanism to hand those local files to your web browser. If the files for the aspirin visualization are missing from your folder, the server won't be able to find them when you click the link, and you will see a "404 Not Found" error. Make sure your local folder matches the complete structure of the GitHub repository. 


## Navigation

Once the server is running, the main entry point is `index.html`. From there, you can access the different visualizations included in the project:
* **Digital Twin Diagnostic Interface**: The main landing page.
* **Circulatory System Visualization**: Accessible via the button on the landing page.
* **Aspirin Mode of Action on Blood Vessels**: Accessible via the button on the landing page.
