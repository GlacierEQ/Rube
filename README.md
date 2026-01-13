# 🌌 RUBE: THE SUPERLUMINAL COMMAND CENTER

[Rube](https://rube.app) is no longer just a standard MCP server. It has undergone a **Superluminal Expansion**, transforming into a high-precision Command Center for system optimization, forensic analysis, and universal power management.

## 🚀 SUPERLUMINAL EXPANSION

Rube now integrates several advanced subsystems designed for maximum power and autonomy:

- **🌌 Universal Power System**: Engage `ascend`, `overdrive`, and `godmode` to maximize system performance and cosmic energy integration.
- **🧊 GlacierEQ Mastermind**: A deep-forensic engine for diagnostics, chain of custody tracking, and predictive analysis.
- **🌠 Comet Hyper-Agent**: Integrated browser automation, deep research, and high-IQ code generation.
- **🎛️ Command Dashboard**: A stunning, real-time Web UI for monitoring system status and executing remote commands.
- **🐙 GitHub & Alerts**: Automated repository synchronization and critical Discord notifications.

## 🎛️ RUBE COMMAND CENTER DASHBOARD

Launch the visual interface to monitor your universal power in real-time:

```bash
rube dashboard
```
Accessible at `http://localhost:3847`.

## 📦 ADVANCED CLI COMMANDS

Rube now features a comprehensive suite of power commands. Run `rube help:all` for the full reference.

### 🌌 Universal Power
- `rube ascend` - Ascend to Universal Power level
- `rube overdrive` - Engage Overdrive Mode
- `rube godmode` - Activate God-Mode
- `rube power:cosmic` - View cosmic energy metrics

### 🧊 Mastermind Forensics
- `rube mastermind:init` - Initialize forensic engine
- `rube mastermind:diagnose` - Run deep system diagnostics
- `rube mastermind:predict` - Predictive forensic analysis

### 🌠 Comet Hyper-Agent
- `rube comet:research <query>` - Deep multi-source intelligence
- `rube comet:code <desc>` - High-IQ code generation
- `rube comet:status` - Check agent transcendence level

### 🐙 Utilities
- `rube github:sync` - Automated repository synchronization
- `rube alert <msg>` - Send critical alert to Discord
- `rube benchmark` - System performance benchmarking

---

## Why Rube?

- **Works everywhere** – Rube integrates with major AI clients like **Cursor**, **Claude Desktop**, **VS Code**, **Claude Code** and any custom MCP‑compatible client. You can switch between these clients and your integrations follow you.
- **500+ tools out of the box** – Composio has connectors for hundreds of SaaS and internal apps; Rube exposes them to your AI so you can automate emails, tasks, spreadsheets, calendars, documents and more with a single server.
- **Human‑friendly commands** – Rube translates plain‑English instructions into the correct API calls. A Slack‑like chat example on the site shows how Rube takes “Find my last 5 customers in Airtable” and “Post them to Slack” and handles the API requests under the hood.
- **Team‑ready** – You can start alone and later invite teammates. A single Rube URL gives your team access to every connected app; you can bring your own API keys, share connections across the team or keep them private. There’s no limit on the number of tools you connect.
- **Built on Composio** – Rube uses Composio’s infrastructure for authentication, security and integration management. Composio handles OAuth 2.1 flows, end‑to‑end encryption and SOC 2 compliant practices.

## Prerequisites

1. **An AI client that supports the MCP protocol** – Rube provides instructions for Cursor, Claude Desktop, VS Code, Claude Code and any generic MCP client.
2. **Composio or client account** – Rube uses Composio’s authentication and you may need to sign in during setup.
3. **Access to the apps you want to automate** – Rube will prompt you to authenticate using OAuth or an API key. You can connect multiple apps at once.

## Quick Start (npm)

Install the npm package for easy setup:

```bash
npm install -g @composio/rube
rube setup
```

Or use npx without installing:

```bash
npx @composio/rube setup
```

The setup wizard will guide you through configuring Rube for your AI client.

## Installing Rube

### Cursor

**Option 1 - One-click install (recommended):**
Click this link: [cursor://anysphere.cursor-deeplink/mcp/install?name=rube&config=eyJ1cmwiOiJodHRwczovL3J1YmUuY29tcG9zaW8uZGV2L21jcD9hZ2VudD1jdXJzb3IifQ%3D%3D](cursor://anysphere.cursor-deeplink/mcp/install?name=rube&config=eyJ1cmwiOiJodHRwczovL3J1YmUuY29tcG9zaW8uZGV2L21jcD9hZ2VudD1jdXJzb3IifQ%3D%3D)

**Option 2 - Manual setup:**
1. In Cursor, click **Add MCP Server** (e.g. from the "MCP Tools" sidebar).
2. In the "Install MCP server?" dialog choose **Rube** with the following details:
  - **Name** – `rube`
  - **Type** – `streamableHttp`
  - **URL** – `https://rube.app/mcp?agent=cursor`
3. Confirm the installation. Rube will show as "Needs login"; click this to authenticate.
4. Follow the sign‑in flow in your browser and authorise the apps you wish to use.

### Claude Desktop

**For Pro/Max Plans (manual setup):**
1. Copy the Rube MCP URL (`https://rube.app/mcp`).
2. Open **Claude Desktop** → **Settings** → **Connectors**. Choose **Add custom connector**.
3. Enter a name (e.g. `Rube`), paste the MCP URL, and click **Add**. You may need to confirm that you trust the connector.
4. Click **Connect** next to the new connector and complete the web‑based authentication.

**For Free/Pro Plans (auto setup):**
```bash
npx @composio/mcp@latest setup "https://rube.app/mcp" "rube" --client claude
```
Then restart Claude Desktop.

### VS Code (ChatGPT or Claude Extensions)

1. Open a terminal and run the setup command:

```
npx mcp-remote "https://rube.app/mcp"
```

This installs the Rube MCP server into VS Code.
2. Restart VS Code after the command completes. The configuration will add Rube to the list of MCP servers.
3. Open VS Code settings (search for _Chat > MCP_) and ensure the following are enabled:

  - **Chat > MCP: Autostart** – automatically starts MCP servers for new chats.
  - **Chat > MCP: Discovery** – enables discovery of MCP servers on your machine.
  - **Chat > MCP: Enabled** – enables integration with MCP servers.
4. Open a new chat (e.g. ChatGPT/Claude extension) and start issuing commands like “Create a Notion task” or “Send an email via Gmail”. Rube will handle the operations in the background.

### Claude Code (CLI + Chat)

1. In a terminal, run the command to register the Rube server with Claude Code:

```
claude mcp add --transport http rube -s user "https://rube.app/mcp"
```

(You can copy this command directly from the installation modal.)
2. Inside Claude Code chat, run the `/mcp` command to manage MCP servers.
3. Select **rube** from the list and press **Enter** to log in. This will open a browser for authentication.
4. In the Rube MCP server menu, select **Authenticate** and complete the sign‑in flow. The status will change from _needs authentication_ to _connected_.
5. After authentication, return to Claude Code, run `/mcp` again, and confirm that `rube` is connected. You can now use Rube commands within Claude Code chat.

### Generic MCP Client

- If your client supports MCP servers via URL, simply copy the Rube MCP endpoint `https://rube.app/mcp` and supply it to your client or agentic SDK. Follow the client’s documentation to register the server and authenticate the apps you wish to use.

## Using Rube

1. **Connect apps** – Rube offers connectors for hundreds of SaaS apps. When you first invoke a command that touches a new app (e.g. “Send an email via Gmail”), Rube will prompt you to authenticate using OAuth or an API key. You can connect multiple apps at once and even share them with teammates.
2. **Issue plain‑English commands** – In your AI chat, describe what you want to do. For example:

  - “Send a welcome email to the latest sign‑up in Airtable.”
  - “Create a Linear ticket titled ‘Bug in checkout flow’ and assign it to \[username\].”
  - “Schedule a meeting for Monday at 10 AM and notify the participants on Slack.”

Rube will interpret the intent, fetch or send data via the appropriate APIs and return results directly in the chat.
3. **Chain multiple actions** – Rube can perform multi‑step workflows that cross apps. For instance, fetch data from Gmail, generate an issue in GitHub and post a Slack update about it.
4. **Monitor & manage** – You can view connected apps and manage credentials through your Composio dashboard. Shared connections allow a team to reuse the same integration without re‑authenticating.

## Security & Privacy

- **OAuth 2.1 and encryption** – Rube uses Composio’s secure OAuth flow. Your credentials are never stored on Composio’s servers; tokens are encrypted end‑to‑end and only used to call the underlying APIs.
- **Scope & access control** – You decide which apps to connect and which scopes to authorise. Connections can be personal or shared across your organisation.
- **Compliance** – Composio is SOC 2 compliant and follows modern security best practices.

## Pricing & Support

- **Free (beta)** – Rube is currently free while it’s in beta. Paid plans will be introduced in the future and will include generous usage limits.
- **Unsupported apps** – If you need an integration that isn’t yet supported, you can request it through the Composio community or contact sales for enterprise solutions.
- **Help** – For problems or feedback, email **support@composio.dev**.

## Summary

Rube abstracts away the complexity of dealing with dozens of APIs and provides a unified, chat‑first interface to your favourite tools. Install it in your MCP‑compatible client, authenticate the apps you care about, and start automating everyday tasks with simple plain‑English commands. Because Rube is built on Composio’s trusted infrastructure, it’s easy to get started (setup takes under five minutes) and safe for teams of any size.
