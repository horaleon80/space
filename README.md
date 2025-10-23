# Space Micro-Frontend Project

A modern micro-frontend architecture built with Vite, React, TypeScript, Redux Toolkit, GraphQL, and Tailwind CSS.

## 🚀 Technologies Used

### Core Technologies
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite 5** - Build tool and dev server
- **Module Federation** - Micro-frontend architecture (@originjs/vite-plugin-federation)

### State Management
- **Redux Toolkit** - Global state management (user preferences)
- **React Context API** - Local state management (filters, views, navigation)

### Data Fetching
- **Apollo Client** - GraphQL client
- **SpaceX GraphQL API** - Public API for launches and rockets data

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Development Tools
- **Concurrently** - Run multiple commands simultaneously
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Micro-Frontends
1. **Host App** (Port 5000) - Main container that orchestrates all MFEs
2. **Layout MFE** (Port 5001) - Provides Header and Footer components via Module Federation
3. **Launches MFE** (Port 5002) - Standalone Space launches application (loaded via iframe)
4. **Rockets MFE** (Port 5003) - Standalone Space rockets application (loaded via iframe)

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js** >= 18.x
- **npm** >= 9.x
- A modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Getting Started

### Step 1: Install Dependencies

From the **root folder**:

```bash
# Install root dependencies (concurrently)
npm install

# Install all project dependencies
cd host-app && npm install && cd ..
cd layout-mfe && npm install && cd ..
cd launches-mfe && npm install && cd ..
cd rockets-mfe && npm install && cd ..
```

### Step 2: Build Layout MFE

The layout must be built first (only once):

```bash
npm run build:layout
```

### Step 3: Start All Services

```bash
npm run start
```

This will start all 4 services:
- 🟢 **[layout]** - Port 5001 (preview mode)
- 🔵 **[launches]** - Port 5002 (dev mode)
- 🟣 **[rockets]** - Port 5003 (dev mode)
- 🔷 **[host]** - Port 5000 (dev mode)

### Step 4: Open Your Browser

Navigate to: **http://localhost:5000**

You should see:
- ✅ Header with navigation and theme toggle
- ✅ SpaceX Launches section (left)
- ✅ SpaceX Rockets section (right)
- ✅ Footer with links

## 📜 Available Scripts

### Root Folder Scripts

Run these from the **root folder** (space-microfrontends/):

| Command | Description |
|---------|-------------|
| `npm install` | Install concurrently for running multiple commands |
| `npm run install:all` | Install dependencies in all projects |
| `npm run build:layout` | Build the layout MFE |
| `npm run dev:launches` | Start launches MFE in dev mode |
| `npm run dev:rockets` | Start rockets MFE in dev mode |
| `npm run preview:layout` | Preview built layout MFE |
| `npm run dev:host` | Start host app in dev mode |
| `npm run dev` | Start all services (layout must be built first) |
| `npm run start` | **Build layout + Start all services (recommended)** |

### Individual Project Scripts

Run these from **inside each project folder**:

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🔧 Running All Together (Integrated Mode)

### Method 1: One Command (Recommended)

From the **root folder**:

```bash
npm run start
```

This automatically:
1. Builds the layout MFE
2. Starts all 4 services simultaneously

### Method 2: Manual Steps

```bash
# Step 1: Build layout
npm run build:layout

# Step 2: Start all services
npm run dev
```

### Method 3: Separate Terminals

Open **4 terminal windows**:

**Terminal 1 - Layout MFE:**
```bash
cd layout-mfe
npm run build
npm run preview
```

**Terminal 2 - Launches MFE:**
```bash
cd launches-mfe
npm run dev
```

**Terminal 3 - Rockets MFE:**
```bash
cd rockets-mfe
npm run dev
```

**Terminal 4 - Host App:**
```bash
cd host-app
npm run dev
```

Then open: **http://localhost:5000**

## 🎯 Running Standalone (Individual MFEs)

Each micro-frontend can run independently.

### Launches MFE Standalone

```bash
cd launches-mfe
npm run dev
```

Open: **http://localhost:5002**

Features:
- Search missions by name
- Filter by success/failure status
- Adjust result limit (5, 10, 20, 50)
- Click cards to view detailed information
- Real-time data from SpaceX GraphQL API

### Rockets MFE Standalone

```bash
cd rockets-mfe
npm run dev
```

Open: **http://localhost:5003**

Features:
- Toggle between grid and list view
- Sort by name, cost, success rate, or first flight
- Filter active rockets only
- Click cards to view detailed information
- Real-time data from SpaceX GraphQL API

### Layout MFE Standalone

```bash
cd layout-mfe
npm run dev
```

Open: **http://localhost:5001**

Features:
- Responsive header with navigation
- Theme toggle (light/dark)
- Login/Logout functionality
- Mobile-friendly menu
- Footer with social links

### Host App Standalone

```bash
cd host-app
npm run dev
```

Open: **http://localhost:5000**

**Note:** Without other MFEs running, you'll see loading spinners or empty frames.

## 🏭 Production Build

### Build All Projects

```bash
# Build layout (required)
npm run build:layout

# Build launches (optional - runs in dev mode)
cd launches-mfe && npm run build && cd ..

# Build rockets (optional - runs in dev mode)
cd rockets-mfe && npm run build && cd ..

# Build host
cd host-app && npm run build && cd ..
```

### Preview Production Build

After building, preview with:

```bash
# In separate terminals
cd layout-mfe && npm run preview    # Port 5001
cd launches-mfe && npm run preview  # Port 5002
cd rockets-mfe && npm run preview   # Port 5003
cd host-app && npm run preview      # Port 5000
```

Open: **http://localhost:5000**

## 🌐 Ports Reference

| Service | Port | URL | Mode |
|---------|------|-----|------|
| **Host App** | 5000 | http://localhost:5000 | Dev |
| **Layout MFE** | 5001 | http://localhost:5001 | Preview (built) |
| **Launches MFE** | 5002 | http://localhost:5002 | Dev |
| **Rockets MFE** | 5003 | http://localhost:5003 | Dev |

## 🔍 GraphQL API

### Endpoint
```
https://spacex-production.up.railway.app/
```

### Launches Queries
- `launchesPast` - Fetch list of past launches
- `launch` - Fetch single launch details

### Rockets Queries
- `rockets` - Fetch list of all rockets
- `rocket` - Fetch single rocket details

No authentication required!

## 🛠️ Development Workflow

### Daily Development

Start all services once:
```bash
npm run start
```

### Working on Host App

Make changes to `host-app/src/**` - browser auto-reloads ✅

### Working on Launches MFE

Make changes to `launches-mfe/src/**` - browser auto-reloads ✅

### Working on Rockets MFE

Make changes to `rockets-mfe/src/**` - browser auto-reloads ✅

### Working on Layout MFE

Make changes to `layout-mfe/src/**`, then rebuild:
```bash
cd layout-mfe
npm run build
```
Browser will reload automatically ✅

## 📊 Architecture Decisions

### Why Iframe-Based for Data MFEs?

1. **No React Version Conflicts** - Each MFE has isolated React instance
2. **True Independence** - Can use different React versions
3. **Simpler Debugging** - Each app has its own DevTools
4. **Hot Reload Works** - Immediate feedback during development
5. **Production-Ready** - Reliable and battle-tested approach

### Why Module Federation for Layout?

1. **Simple Components** - Header/Footer don't have complex dependencies
2. **Shared Styling** - Consistent look across the app
3. **No Apollo/GraphQL** - Avoids version conflict issues
4. **Better Performance** - No iframe overhead for simple components