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
 * 🌠 RUBE COMMAND CENTER - DESKTOP GUI
 *
 * Native Electron wrapper for the Rube Superluminal Command Center
 */

const { app, BrowserWindow, Menu, shell, Tray } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const RubeDashboardServer = require('../dashboard/server');

// Keep a global reference of the window object
let mainWindow;
let tray = null;
let serverInstance = null;

async function startDashboardServer() {
    const port = process.env.PORT || 3847;
    const server = new RubeDashboardServer(port);
    serverInstance = await server.start();
    console.log('🚀 Rube Dashboard Server started on port:', port);
    return port;
}

function createWindow(port) {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        backgroundColor: '#0a0a0f',
        title: '🚀 Rube Command Center',
        icon: path.join(__dirname, '..', 'dashboard', 'public', 'rube_icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        show: false, // Don't show the window until it's ready
        frame: true,
        titleBarStyle: 'hiddenInset' // Premium macOS look
    });

    // Load the dashboard
    mainWindow.loadURL(`http://localhost:${port}`);

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    // Open external links in the default browser
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    setupMenu();
}

function setupMenu() {
    const template = [
        {
            label: 'Rube',
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'selectAll' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Commands',
            submenu: [
                {
                    label: 'Ascend',
                    accelerator: 'CmdOrCtrl+Shift+A',
                    click: () => mainWindow.webContents.send('execute-command', 'ascend')
                },
                {
                    label: 'Overdrive',
                    accelerator: 'CmdOrCtrl+Shift+O',
                    click: () => mainWindow.webContents.send('execute-command', 'overdrive')
                },
                { type: 'separator' },
                {
                    label: 'Diagnostics',
                    accelerator: 'CmdOrCtrl+D',
                    click: () => mainWindow.webContents.send('execute-command', 'diagnostics')
                }
            ]
        },
        {
            role: 'window',
            submenu: [{ role: 'minimize' }, { role: 'zoom' }, { type: 'separator' }, { role: 'front' }]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: async () => {
                        await shell.openExternal('https://rube.app');
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

function createTray(port) {
    // tray = new Tray(path.join(__dirname, 'tray-icon.png'));
    // const contextMenu = Menu.buildFromTemplate([
    //     { label: 'Open Rube', click: () => { mainWindow.show(); } },
    //     { type: 'separator' },
    //     { role: 'quit' }
    // ]);
    // tray.setToolTip('Rube Command Center');
    // tray.setContextMenu(contextMenu);
}

// App lifecycle
app.on('ready', async () => {
    try {
        const port = await startDashboardServer();
        createWindow(port);
        createTray(port);
    } catch (error) {
        console.error('Failed to start Rube:', error);
        app.quit();
    }
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) {
        startDashboardServer().then(port => createWindow(port));
    }
});
