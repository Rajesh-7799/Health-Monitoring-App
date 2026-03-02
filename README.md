# 🩺 VitalTrack – Health Monitoring App

A beautiful, responsive health monitoring dashboard built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools — just open and run.

![VitalTrack Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JS](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- **Live Vitals** — Real-time animated heart rate chart, SpO₂ ring, blood pressure bar, and temperature gauge
- **Activity Tracking** — Steps, calories, hydration, and active minutes with progress bars
- **Sleep Analysis** — Sleep score, phases (Deep / REM / Light), and total duration
- **Vital Logger** — Log your own HR, BP, and weight with timestamped entries
- **History Panel** — View your last 5 entries, persisted via localStorage
- **Health Alerts** — Contextual reminders and suggestions
- **Fully Responsive** — Works on mobile, tablet, and desktop

## 🚀 Getting Started

### Option 1: Open Directly
```bash
# Clone the repo
git clone https://github.com/rajesh-7799/health-monitor-app.git

# Open in browser
open health-monitor-app/index.html
```

### Option 2: Live Server (recommended for development)
```bash
# Install live-server globally
npm install -g live-server

# Run
cd health-monitor-app
live-server
```

## 📁 Project Structure

```
health-monitor-app/
├── index.html    # Main app layout
├── style.css     # Dark theme styles, animations
├── app.js        # Live data simulation, logging, charts
└── README.md     # You're here!
```

## 🎨 Design

- **Theme**: Dark medical dashboard with bioluminescent accents
- **Fonts**: DM Serif Display (headings) + DM Mono (data)
- **Colors**: Deep navy `#0a0e17` with emerald `#00e5a0`, blue `#6c8fff`, and rose `#ff5e84`

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styles | CSS3 (custom properties, animations, grid) |
| Logic | Vanilla JavaScript (Canvas API, localStorage) |
| Fonts | Google Fonts |

## 📊 Metrics Tracked

| Metric | Unit | Normal Range |
|---|---|---|
| Heart Rate | bpm | 60–100 |
| Blood Pressure | mmHg | < 120/80 |
| SpO₂ | % | 95–100 |
| Temperature | °C | 36.1–37.2 |

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 📄 License

[MIT](LICENSE)
