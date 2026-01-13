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
 * 🔔 RUBE NOTIFICATION SERVICE
 *
 * Handles sending alerts and status updates to external services
 * like Discord, Slack, or Email.
 */

const https = require('https');
const { EventEmitter } = require('events');

class NotificationService extends EventEmitter {
    constructor() {
        super();
        this.webhooks = {
            discord: process.env.DISCORD_WEBHOOK_URL || null,
            slack: process.env.SLACK_WEBHOOK_URL || null
        };
    }

    /**
     * Send a message to Discord
     * @param {Object} payload
     */
    async sendDiscord(payload) {
        if (!this.webhooks.discord) {
            throw new Error('Discord Webhook URL not configured in .env');
        }

        const data = JSON.stringify(payload);

        return new Promise((resolve, reject) => {
            const req = https.request(this.webhooks.discord, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                }
            }, (res) => {
                let body = '';
                res.on('data', (chunk) => body += chunk);
                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve({ success: true, statusCode: res.statusCode });
                    } else {
                        reject(new Error(`Discord API error: ${res.statusCode} ${body}`));
                    }
                });
            });

            req.on('error', reject);
            req.write(data);
            req.end();
        });
    }

    /**
     * Send a formatted status update to Discord
     * @param {string} title
     * @param {string} message
     * @param {string} color (hex)
     */
    async notifyStatus(title, message, color = 0x667eea) {
        const payload = {
            embeds: [{
                title: `🚀 RUBE: ${title}`,
                description: message,
                color: color,
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'Rube Command Center'
                }
            }]
        };

        return this.sendDiscord(payload);
    }

    /**
     * Send a critical alert to Discord
     * @param {string} error
     */
    async notifyAlert(error) {
        return this.notifyStatus('⚠️ CRITICAL ALERT', error, 0xef4444);
    }
}

module.exports = NotificationService;
