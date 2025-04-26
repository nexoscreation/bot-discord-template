# Discord Bot Starter Template 🚀

> This project is a strong foundation for building powerful, scalable Discord bots using [Discord.js](https://discord.js.org). It focuses on **best practices**, **modular structure**, **dynamic command/event handling**, and **modern development standards**.

---

## 🌟 Features

#### ✨ Modular Command System

Organized by categories for both **prefix** and **slash** commands:

- **Slash Commands**: `/help`, `/ping`, `/info`, etc.
- **Prefix Commands**: `!help`, `!info`, etc.
- **Moderation Tools**: Ban, Mute, Timeout, Warn.
- **Fun Commands**: Jokes, Dice rolls.

#### ⚙️ Dynamic Event Handling

Built-in support for major Discord events with **dynamic event loading** for scalability.

#### 🛠️ Utility Functions

Pre-built utilities for:

- Logging
- Embed creation
- Centralized error handling

#### 📜 Easy Configuration

Manage environment variables and bot settings via `.env` files or JSON configs.

#### 📡 API Integration Ready

Example setups for connecting to external APIs like GitHub, RSS feeds, and more.

#### 🛠️ **Utility Functions**

Pre-built utilities for logging, embed creation, and more to streamline development.

- **Utilities** Includes logging, error handling, embed builders, and more.

#### 💾 Database Ready

Structured to easily integrate databases like **MongoDB**.

#### 🔒 Secure & Scalable

- Token handling best practices
- Centralized error management
- Organized project architecture for large bots

---

## 🚀 Getting Started

### 📂 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) v16.6.0 or higher.
- npm v7 or higher
- [Discord Developer Portal](https://discord.com/developers/applications) account to create a bot and get your bot token.

### 🛠️ Installation

Follow these steps to set up the bot on your local machine:

1. Clone the repository:

```bash
git clone https://github.com/nexoscreation/bot-discord-template.git
```

2. Install dependencies:

```bash
npm install
```

### 📜 Environment Setup

Create a `.env` file in the root directory:

```env
DISCORD_BOT_TOKEN=your-token
DISCORD_BOT_PREFIX=!
DISCORD_CLIENT_ID=your-client-id
DISCORD_GUILD_ID=your-guild-id (optional for testing)
```

## 📜 Usage

### 🔥 Running the Bot

#### Production Mode:
```bash
npm run bot:start
```

#### Development Mode (hot reload):
```bash
npm run dev
```

### ⚙️ Commands

#### Deploying Slash Commands
```bash
npm run bot:deploy
```

#### Deleting All Slash Commands
```bash
npm run bot:delete
```

---

## 📜 Available Commands

| Command     | Type    | Description                    |
|-------------|---------|---------------------------------|
| `!help`     | Prefix   | Lists all available commands   |
| `!info`     | Prefix   | Displays bot information       |
| `!ping`     | Prefix   | Check bot and API latency      |
| `!say`      | Prefix   | Make the bot repeat a message  |
| `!server`   | Prefix   | Displays server information    |
| `!user`     | Prefix   | Displays your user details     |

## 🛡️ Moderation Slash Commands

| Command     | Description                               |
|-------------|-------------------------------------------|
| `/ban`      | Bans a user                               |
| `/unban`    | Unbans a user                             |
| `/kick`     | Kicks a user                              |
| `/mute`     | Mutes a user                              |
| `/unmute`   | Unmutes a user                            |
| `/timeout`  | Temporarily mutes a user                  |
| `/untimeout`| Removes timeout                           |
| `/warn`     | Warns a user                              |
| `/purge`    | Bulk deletes messages                     |
| `/slowmode` | Enables channel slowmode                  |


---

## 📚 Utilities

- **Embed Builder** — Create reusable, styled Discord embeds
- **Logger** — Color-coded logs for different levels (info, warn, error)
- **Centralized Error Handler** — Catch and manage runtime errors

---

## 📚 Documentation

Comming Soon!

---

## 🤝 Contributing

We welcome contributions from the community! Here’s how you can help:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and test thoroughly.
4. Submit a pull request with a detailed description.

---

## 🛡️ License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 💬 Support

Need help? Have suggestions? Feel free to open an issue or reach out:

- **Discord Server**: [Join Us](https://discord.gg/A3euTAVqHv)
- **GitHub Issues**: [Create an Issue](https://github.com/nexoscreation/bot-discord-template/issues)

---

## 🎉 Acknowledgments

Special thanks to:
- [Discord.js](https://discord.js.org) team for the amazing library
- [Node.js](https://nodejs.org) team
- All open-source contributors 💖

**Main Participants:**
- [nexoscreation](https://github.com/nexoscreation) — Project owner
- Community contributors — You make this project better!

---

Thanks for using **Discord Bot Starter Template**!  
Happy coding! 🎉