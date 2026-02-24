# Deployment Guide — GoDaddy Shared Hosting (cPanel)

This guide walks you through deploying the Star Wars Explorer to GoDaddy Shared Hosting using cPanel's Node.js App Manager (powered by Phusion Passenger).

## Overview

In production:
- The Express server serves the built React app as static files
- Both the API (`/api/*`) and the React SPA (`/`) run from the same Node.js process
- Phusion Passenger manages the Node.js process lifecycle

## Prerequisites

- GoDaddy Shared Hosting account with cPanel access
- cPanel login at `yourdomain.com/cpanel` or `cpanel.yourdomain.com`
- FTP client (e.g. [FileZilla](https://filezilla-project.org/)) or access to cPanel File Manager
- Node.js development environment locally (for building)

---

## Step 1 — Build the Project Locally

On your local machine, inside the project directory:

```bash
cd /home/andrew/Starwars
npm install
npm run build
```

After this succeeds, you will have:
- `server/dist/` — compiled Express server (JavaScript)
- `client/dist/` — bundled React app (HTML + JS + CSS)

---

## Step 2 — Prepare the Deployment Package

Create a deployment folder with only what is needed for production. **Do NOT include** `node_modules/` or `*/src/` directories.

### Files to include:

```
deploy/
├── package.json              ← root (workspaces definition)
├── server/
│   ├── package.json
│   └── dist/                 ← compiled server JS
└── client/
    ├── package.json
    └── dist/                 ← built React app
```

### Quick way using zip (from project root):

```bash
# On macOS/Linux:
zip -r starwars-deploy.zip \
  package.json \
  server/package.json \
  server/dist \
  client/package.json \
  client/dist

# On Windows (PowerShell):
Compress-Archive -Path package.json, server/package.json, server/dist, client/package.json, client/dist -DestinationPath starwars-deploy.zip
```

---

## Step 3 — Upload to GoDaddy

### Option A: cPanel File Manager (recommended)

1. Log in to cPanel (`yourdomain.com/cpanel`)
2. Click **File Manager**
3. Navigate to your desired location — for example, create a folder:
   - `public_html/starwars/` — if you want the app at `yourdomain.com/starwars`
   - Or directly into `public_html/` for the root domain
4. Click **Upload** and upload `starwars-deploy.zip`
5. After upload, right-click the zip file → **Extract**
6. The files will be extracted in place

### Option B: FTP (FileZilla)

1. Connect using:
   - Host: `ftp.yourdomain.com`
   - Username: your cPanel username
   - Password: your cPanel password
   - Port: `21`
2. Navigate to `public_html/starwars/` (create the folder if it doesn't exist)
3. Upload the contents of your deploy folder directly (not the zip)

---

## Step 4 — Set Up the Node.js App in cPanel

1. In cPanel, scroll to the **Software** section
2. Click **Setup Node.js App**
3. Click **Create Application**
4. Fill in the settings:

   | Field                  | Value                                           |
   |------------------------|-------------------------------------------------|
   | **Node.js version**    | 20.x (or the highest available ≥ 18)           |
   | **Application mode**   | Production                                      |
   | **Application root**   | `public_html/starwars` (or wherever you uploaded) |
   | **Application URL**    | Your domain or subdirectory (e.g. `/starwars`)  |
   | **Application startup file** | `server/dist/index.js`                  |

5. Click **Create**

---

## Step 5 — Install Production Dependencies

After creating the app, you need to install the server's npm dependencies on the server.

### Option A: cPanel Node.js App Manager (easiest)

1. In the Node.js App Manager, find your app
2. Click the **Run NPM Install** button
3. Wait for it to complete (may take 30–60 seconds)

### Option B: cPanel Terminal

1. In cPanel, open **Terminal** (under Advanced)
2. Run:

```bash
cd ~/public_html/starwars
npm install --omit=dev --workspace=server
```

This installs only the server's production dependencies (express, axios, cors, dotenv) — not devDependencies, and not the client's React packages.

---

## Step 6 — Set Environment Variables

In the cPanel Node.js App Manager, click your app → **Environment Variables** section, and add:

| Variable    | Value        |
|-------------|--------------|
| `NODE_ENV`  | `production` |

> You do NOT need to set `PORT` — Phusion Passenger manages the port automatically.
> You do NOT need to set `CLIENT_ORIGIN` — in production, everything is served from the same origin.

---

## Step 7 — Start the Application

1. In the Node.js App Manager, click **Start** (or **Restart** if already running)
2. The status should change to **Running**

---

## Step 8 — Verify the Deployment

1. Open `https://yourdomain.com` (or `https://yourdomain.com/starwars` if in a subdirectory)
   - You should see the Star Wars Explorer React UI
2. Open `https://yourdomain.com/api/people`
   - You should see JSON data from SWAPI

---

## Troubleshooting

### 503 Service Unavailable

- Check the startup file path in the Node.js App Manager: it should be exactly `server/dist/index.js`
- Verify `server/dist/index.js` actually exists in the uploaded files
- Check cPanel error logs: **Error Logs** in cPanel main menu

### API returns 502 or empty responses

- SWAPI may be temporarily unavailable — try again in a few minutes
- Check that outbound HTTPS connections are allowed on your hosting plan

### Static files not loading (blank page or 404 for JS/CSS)

- Verify `client/dist/` was included in the upload
- Confirm `NODE_ENV=production` is set in the environment variables
- Restart the Node.js app after setting environment variables

### Changes not taking effect after update

1. Re-build locally: `npm run build`
2. Upload only the changed files via FTP or File Manager
3. In Node.js App Manager, click **Restart**

### npm install fails

- Try running it via the cPanel Terminal instead of the button
- Check available disk space
- Try: `npm install --omit=dev --workspace=server --legacy-peer-deps`

---

## Updating the Application

1. Make your code changes locally
2. Run `npm run build`
3. Upload the updated files:
   - If server code changed: upload `server/dist/`
   - If client code changed: upload `client/dist/`
   - If dependencies changed: also upload `server/package.json` and re-run npm install
4. In cPanel Node.js App Manager → **Restart**

---

## File Structure on the Server

After a successful deployment, your server should look like:

```
~/public_html/starwars/
├── package.json
├── node_modules/         ← created by npm install on server
├── server/
│   ├── package.json
│   └── dist/
│       ├── index.js      ← Passenger entry point
│       ├── app.js
│       ├── config.js
│       ├── routes/
│       ├── services/
│       ├── middleware/
│       └── types/
└── client/
    ├── package.json
    └── dist/
        ├── index.html
        └── assets/
            ├── index-[hash].js
            └── index-[hash].css
```

---

## Notes on Phusion Passenger

- Passenger manages the Node.js process — you don't use `npm start` manually
- Passenger injects the `PORT` environment variable; the Express server reads it via `process.env.PORT`
- If the app crashes, Passenger will restart it automatically
- Application logs can be found in cPanel → **Error Logs** or in `~/logs/`
