# Med-Connect XR

Med-Connect XR is a Digital Twin Diagnostic Interface featuring WebAR visualizations such as antithrombotic effect visualization, real-time platelet mapping, and circulatory system visualizations.

## How to Run Locally

Because this project uses 3D models and WebAR technologies, opening the HTML files directly in your browser (e.g., `file:///path/to/index.html`) may not work correctly due to browser security restrictions (CORS) on loading local assets like `.glb` or `.mind` files.

To run this repository locally on your laptop, you need to serve the files using a local web server. Here are a few easy ways to do this:

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

## Navigation

Once the server is running, the main entry point is `index.html`. From there, you can access the different visualizations included in the project:
* **Digital Twin Diagnostic Interface**: The main landing page.
* **Circulatory System Visualization**: Accessible via the button on the landing page.
* **Aspirin Mode of Action on Blood Vessels**: Accessible via the button on the landing page.
