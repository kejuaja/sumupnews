import * as fs from 'fs';
import * as path from 'path';
import { Resvg } from '@resvg/resvg-js';

const svgContent = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .bg { fill: #F8F5EE; }
      .border-outer { fill: none; stroke: #1A1A1A; stroke-width: 4; }
      .border-inner { fill: none; stroke: #1A1A1A; stroke-width: 1; }
      .masthead { font-family: 'Georgia', serif; font-weight: bold; font-size: 46px; fill: #111111; letter-spacing: 3px; text-anchor: middle; }
      .sub-masthead { font-family: 'Arial', sans-serif; font-weight: bold; font-size: 11px; fill: #444444; letter-spacing: 2px; text-anchor: middle; }
      .divider { stroke: #1A1A1A; stroke-width: 2; }
      .divider-thin { stroke: #1A1A1A; stroke-width: 1; }
      
      .tag { font-family: 'Arial', sans-serif; font-weight: bold; font-size: 11px; fill: #A61C1C; letter-spacing: 1px; }
      .headline-lead { font-family: 'Georgia', serif; font-weight: bold; font-size: 22px; fill: #111111; }
      .body-lead { font-family: 'Georgia', serif; font-size: 13px; fill: #333333; line-height: 1.5; }
      
      .headline-sec { font-family: 'Georgia', serif; font-weight: bold; font-size: 14px; fill: #111111; }
      .body-sec { font-family: 'Georgia', serif; font-size: 12px; fill: #333333; }
      
      .chart-title { font-family: 'Arial', sans-serif; font-weight: bold; font-size: 12px; fill: #222222; }
      .chart-label { font-family: 'Arial', sans-serif; font-size: 11px; fill: #555555; text-anchor: middle; }
      .chart-val { font-family: 'Arial', sans-serif; font-weight: bold; font-size: 11px; fill: #111111; text-anchor: middle; }
      
      .ticker-title { font-family: 'Arial', sans-serif; font-weight: bold; font-size: 11px; fill: #FFFFFF; letter-spacing: 1px; }
      .ticker-label { font-family: 'Arial', sans-serif; font-size: 11px; fill: #555555; }
      .ticker-value { font-family: 'Arial', sans-serif; font-weight: bold; font-size: 13px; fill: #111111; }
      .ticker-change-pos { font-family: 'Arial', sans-serif; font-weight: bold; font-size: 11px; fill: #1B8A36; }
      .ticker-change-neg { font-family: 'Arial', sans-serif; font-weight: bold; font-size: 11px; fill: #C53030; }
      
      .footer { font-family: 'Arial', sans-serif; font-size: 10px; fill: #666666; text-anchor: middle; letter-spacing: 1px; }
    </style>
  </defs>

  <!-- Background and Outer Frame -->
  <rect width="1024" height="1024" class="bg" />
  <rect x="24" y="24" width="976" height="976" class="border-outer" />
  <rect x="30" y="30" width="964" height="964" class="border-inner" />

  <!-- Masthead Section -->
  <text x="512" y="82" class="masthead">THE GLOBAL CHRONICLE</text>
  <text x="512" y="106" class="sub-masthead">WEDNESDAY, NOVEMBER 18, 2026 • EDITION NO. 14,289 • DAILY GLOBAL BRIEFING</text>
  
  <line x1="48" y1="120" x2="976" y2="120" class="divider" />
  <line x1="48" y1="124" x2="976" y2="124" class="divider-thin" />

  <!-- LEAD STORY (Left / Center: x=48 to 630, y=140 to 740) -->
  <g transform="translate(48, 145)">
    <text x="0" y="18" class="tag">CLIMATE &amp; DIPLOMACY • GENEVA SUMMIT</text>
    <text x="0" y="46" class="headline-lead">Global Climate Accord 2026 Finalized:</text>
    <text x="0" y="72" class="headline-lead">Binding 70% Renewable Target Set for 2035</text>
    
    <text x="0" y="104" class="body-lead" width="560">
      <tspan x="0" dy="0">Delegates from 195 nations ratified the landmark Geneva Protocol today,</tspan>
      <tspan x="0" dy="20">establishing enforceable carbon pricing mechanisms and committing</tspan>
      <tspan x="0" dy="20">industrialized economies to a 70% renewable energy grid transition by</tspan>
      <tspan x="0" dy="20">2035. A mobilized $1.2 trillion financial instrument fund will support</tspan>
      <tspan x="0" dy="20">developing nations in accelerating coal plant retirements.</tspan>
    </text>

    <!-- Infographic Chart: Global Renewable Grid Transition -->
    <g transform="translate(0, 230)">
      <rect x="0" y="0" width="568" height="290" fill="#F1ECE1" stroke="#D1C7B7" stroke-width="1" />
      <text x="20" y="30" class="chart-title">INFOGRAPHIC: GLOBAL RENEWABLE GRID SHARE (2020 – 2035)</text>
      <line x1="20" y1="42" x2="548" y2="42" stroke="#D1C7B7" stroke-width="1" />

      <!-- Bar 1: 2020 -->
      <g transform="translate(50, 70)">
        <rect x="0" y="30" width="60" height="130" fill="#C5BDB0" />
        <text x="30" y="20" class="chart-val">28%</text>
        <text x="30" y="185" class="chart-label">2020</text>
      </g>

      <!-- Bar 2: 2023 -->
      <g transform="translate(170, 70)">
        <rect x="0" y="18" width="60" height="142" fill="#B0A695" />
        <text x="30" y="8" class="chart-val">38%</text>
        <text x="30" y="185" class="chart-label">2023</text>
      </g>

      <!-- Bar 3: 2026 (Current) -->
      <g transform="translate(290, 70)">
        <rect x="0" y="-10" width="60" height="170" fill="#2C5282" />
        <text x="30" y="-20" class="chart-val" fill="#2C5282">54% (Now)</text>
        <text x="30" y="185" class="chart-label" font-weight="bold">2026</text>
      </g>

      <!-- Bar 4: 2035 Target -->
      <g transform="translate(410, 70)">
        <rect x="0" y="-40" width="60" height="200" fill="#1B8A36" />
        <text x="30" y="-50" class="chart-val" fill="#1B8A36">70% Target</text>
        <text x="30" y="185" class="chart-label" font-weight="bold">2035</text>
      </g>

      <!-- Horizontal gridline -->
      <line x1="30" y1="210" x2="538" y2="210" stroke="#C5BDB0" stroke-width="1" stroke-dasharray="4,4" />
      <text x="545" y="213" font-size="10" fill="#666">0%</text>
    </g>
  </g>

  <!-- Vertical Divider between columns -->
  <line x1="636" y1="135" x2="636" y2="760" class="divider-thin" />

  <!-- RIGHT COLUMN / SECONDARY STORIES (x=660 to 976) -->
  <g transform="translate(660, 145)">
    <!-- Story 2 -->
    <text x="0" y="18" class="tag">TECHNOLOGY &amp; COMPUTING</text>
    <text x="0" y="42" class="headline-sec">
      <tspan x="0" dy="0">First 1,000-Qubit Fault-Tolerant</tspan>
      <tspan x="0" dy="18">Processor Unveiled</tspan>
    </text>
    <text x="0" y="82" class="body-sec" width="316">
      <tspan x="0" dy="0">TOKYO — A multinational research consortium</tspan>
      <tspan x="0" dy="18">successfully benchmarked a 1,000-logical-qubit</tspan>
      <tspan x="0" dy="18">quantum processor operating with zero error</tspan>
      <tspan x="0" dy="18">drift for over 10 consecutive hours. Experts</tspan>
      <tspan x="0" dy="18">predict immediate breakthroughs in novel drug</tspan>
      <tspan x="0" dy="18">discovery and battery material synthesis.</tspan>
    </text>

    <line x1="0" y1="195" x2="316" y2="195" class="divider-thin" />

    <!-- Story 3 -->
    <text x="0" y="220" class="tag">SPACE EXPLORATION</text>
    <text x="0" y="244" class="headline-sec">
      <tspan x="0" dy="0">Lunar Habitat Alpha Welcomes</tspan>
      <tspan x="0" dy="18">First Crew of Six</tspan>
    </text>
    <text x="0" y="284" class="body-sec" width="316">
      <tspan x="0" dy="0">LUNAR SOUTH POLE — Artemis-IV astronauts</tspan>
      <tspan x="0" dy="18">successfully docked at Habitat Alpha today,</tspan>
      <tspan x="0" dy="18">initiating a 90-day mission focused on polar</tspan>
      <tspan x="0" dy="18">ice extraction, closed-loop life support,</tspan>
      <tspan x="0" dy="18">and deep-space radiation shielding trials.</tspan>
    </text>

    <line x1="0" y1="395" x2="316" y2="395" class="divider-thin" />

    <!-- Story 4 / Brief -->
    <text x="0" y="420" class="tag">GLOBAL HEALTH &amp; BIO</text>
    <text x="0" y="444" class="headline-sec">
      <tspan x="0" dy="0">Universal Malaria Vaccine</tspan>
      <tspan x="0" dy="18">Eradication Milestone</tspan>
    </text>
    <text x="0" y="484" class="body-sec" width="316">
      <tspan x="0" dy="0">GENEVA — WHO reports a 94% reduction in</tspan>
      <tspan x="0" dy="18">endemic transmission across sub-Saharan Africa</tspan>
      <tspan x="0" dy="18">following the final rollout of the Mosquirix-2</tspan>
      <tspan x="0" dy="18">immunization campaign.</tspan>
    </text>
  </g>

  <!-- Horizontal divider above Ticker -->
  <line x1="48" y1="775" x2="976" y2="775" class="divider" />

  <!-- MARKET & GLOBAL INDICATORS TICKER (y=785 to 940) -->
  <g transform="translate(48, 790)">
    <rect x="0" y="0" width="928" height="30" fill="#1A1A1A" />
    <text x="15" y="20" class="ticker-title">GLOBAL MARKETS &amp; INDICES (WEDNESDAY, NOV 18, 2026)</text>

    <rect x="0" y="38" width="928" height="110" fill="#F1ECE1" stroke="#D1C7B7" stroke-width="1" />

    <!-- Card 1 -->
    <g transform="translate(25, 53)">
      <rect x="0" y="0" width="205" height="80" fill="#FFFFFF" stroke="#D1C7B7" stroke-width="1" />
      <text x="15" y="22" class="ticker-label">Global Equity Index</text>
      <text x="15" y="48" class="ticker-value">5,420.80 pts</text>
      <text x="15" y="68" class="ticker-change-pos">▲ +1.42% Today</text>
    </g>

    <!-- Card 2 -->
    <g transform="translate(250, 53)">
      <rect x="0" y="0" width="205" height="80" fill="#FFFFFF" stroke="#D1C7B7" stroke-width="1" />
      <text x="15" y="22" class="ticker-label">Brent Crude Oil</text>
      <text x="15" y="48" class="ticker-value">$74.20 / bbl</text>
      <text x="15" y="68" class="ticker-change-neg">▼ -0.80% Today</text>
    </g>

    <!-- Card 3 -->
    <g transform="translate(475, 53)">
      <rect x="0" y="0" width="205" height="80" fill="#FFFFFF" stroke="#D1C7B7" stroke-width="1" />
      <text x="15" y="22" class="ticker-label">Gold Spot (oz)</text>
      <text x="15" y="48" class="ticker-value">$2,640.50</text>
      <text x="15" y="68" class="ticker-change-pos">▲ +0.52% Today</text>
    </g>

    <!-- Card 4 -->
    <g transform="translate(700, 53)">
      <rect x="0" y="0" width="205" height="80" fill="#FFFFFF" stroke="#D1C7B7" stroke-width="1" />
      <text x="15" y="22" class="ticker-label">EU Carbon Allowance</text>
      <text x="15" y="48" class="ticker-value">€92.40 / ton</text>
      <text x="15" y="68" class="ticker-change-pos">▲ +2.10% Today</text>
    </g>
  </g>

  <!-- Footer -->
  <line x1="48" y1="965" x2="976" y2="965" class="divider-thin" />
  <text x="512" y="985" class="footer">THE GLOBAL CHRONICLE • VERIFIED DIGITAL NEWSPAPER INFOGRAPHIC • ZERO NETWORK DEPENDENCY • NOV 18, 2026</text>
</svg>
`;

async function main() {
  const outputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'entry.png');

  console.log('Rendering SVG infographic to PNG (1024x1024)...');
  const resvg = new Resvg(svgContent, {
    fitTo: {
      mode: 'width',
      value: 1024,
    },
    font: {
      loadSystemFonts: true,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  fs.writeFileSync(outputPath, pngBuffer);
  const stats = fs.statSync(outputPath);
  console.log(`Successfully generated ${outputPath}`);
  console.log(`File size: ${stats.size} bytes (${(stats.size / 1024).toFixed(2)} KiB)`);
}

main().catch((err) => {
  console.error('Error generating image:', err);
  process.exit(1);
});
