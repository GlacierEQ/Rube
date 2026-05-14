/*
 * ════════════════════════════════════════════════════════════════════════════
 *  WARNING: CLASSIFIED TECHNOLOGY // TIER 0 CLEARANCE REQUIRED
 * ════════════════════════════════════════════════════════════════════════════
 *  COPYRIGHT © 2026 GlacierEQ × ANTIGRAVITY.
 *
 *  This file contains "Stealth" and "Ring-Level" technologies.
 *  UNAUTHORIZED ACCESS, COPYING, OR REVERSE ENGINEERING IS FORBIDDEN.
 *
 *  DANGER: Capable of hardware-level interaction (Ring -3 to Ring -6).
 *  Operate strictly within authorized "God Mode" parameters.
 *
 *  PROPERTY OF GLACIEREQ. DO NOT DISTRIBUTE.
 * ════════════════════════════════════════════════════════════════════════════
 */

/**
 * 🌠 RUBE PRELOAD SCRIPT
 *
 * Secure bridge between native Electron and Rube Dashboard
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('rubeNative', {
    // Send commands to main process
    send: (channel, data) => {
        let validChannels = ['execute-command', 'system-info'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    // Receive events from main process
    on: (channel, func) => {
        let validChannels = ['execute-command', 'status-update'];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});

console.log('✨ Rube Native Bridge engaged');
