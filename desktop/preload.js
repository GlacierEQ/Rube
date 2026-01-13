/*
 * ════════════════════════════════════════════════════════════════════════════
 *  COPYRIGHT © 2026 GlacierEQ × ANTIGRAVITY. ALL RIGHTS RESERVED.
 *
 *  This software is the confidential and proprietary information of GlacierEQ.
 *  Unauthorized copying, scraping, modification, or distribution of this file,
 *  via any medium, is strictly prohibited.
 *
 *  TYPE: PROPRIETARY & CONFIDENTIAL
 *  SYSTEM: ANTIGRAVITY STEALTH ARSENAL
 *  ID: GLACIEREQ-IP-GUARD-V1
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
