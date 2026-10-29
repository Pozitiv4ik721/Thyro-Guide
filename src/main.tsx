import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

try {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (e: any) {
  document.body.innerHTML = `
    <div style="padding:40px;font-family:sans-serif;max-width:800px;margin:0 auto">
      <h1 style="color:red">Ошибка при загрузке</h1>
      <pre style="background:#f5f5f5;padding:20px;overflow:auto;border-radius:8px">${e?.message || e}</pre>
      <pre style="background:#f5f5f5;padding:20px;overflow:auto;border-radius:8px;margin-top:10px">${e?.stack || ''}</pre>
    </div>
  `;
}

window.addEventListener('error', (e) => {
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:red;color:white;padding:20px;font-family:monospace;z-index:99999;max-height:40vh;overflow:auto';
  el.textContent = 'JS Error: ' + e.message + ' at ' + e.filename + ':' + e.lineno;
  document.body.appendChild(el);
});

window.addEventListener('unhandledrejection', (e) => {
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:orange;color:black;padding:20px;font-family:monospace;z-index:99999';
  el.textContent = 'Promise Error: ' + e.reason;
  document.body.appendChild(el);
});
