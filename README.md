# Petchiappan P - Portfolio

Modern, responsive portfolio website built with React, Vite, and GSAP animations.

## Features

- 🎨 Modern, responsive design with dark/light theme
- 🚀 Smooth GSAP animations and transitions
- 🤖 Spline 3D Robot integration (see setup instructions below)
- 📱 Fully responsive across all devices
- ⚡ Fast performance with Vite
- 🎯 Smooth scroll navigation

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Setting Up the Spline 3D Robot

The hero section includes a Spline 3D robot that follows your cursor. To enable it:

### 1. Create or Get a Spline Robot Model

1. Go to [Spline](https://spline.design/)
2. Create a new scene or use an existing robot model
3. Make sure your robot has a head object that you can name

### 2. Export the Scene as Public

1. In Spline, click the "Share" button (top right)
2. Set the scene to **"Public"**
3. Copy the scene URL (should look like: `https://prod.spline.design/xxxxx/scene.splinecode`)

### 3. Add the URL to Hero.jsx

Open `src/components/Hero.jsx` and uncomment the robot section:

```jsx
{/* Spline Robot on the right */}
<div className="hero-robot">
  <Spline 
    scene="YOUR_SPLINE_SCENE_URL_HERE"
    onLoad={onLoad}
  />
</div>
```

Replace `YOUR_SPLINE_SCENE_URL_HERE` with your actual Spline scene URL.

### 4. Naming Your Robot Head Object

In your Spline scene, make sure to name your robot's head object one of these:
- `Head` (recommended)
- `head`
- `Robot`
- `robot`
- `RobotHead`

The code will automatically find and animate this object to follow your cursor.

## Technologies Used

- React 19
- Vite
- GSAP (animations)
- Spline (@splinetool/react-spline)
- CSS3 with custom properties

## License

Personal Portfolio - All Rights Reserved
