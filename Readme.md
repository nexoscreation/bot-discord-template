# Discord Bot Starter Template 🚀

> This project is a strong foundation for building powerful, scalable Discord bots using [Discord.js](https://discord.js.org). It focuses on **best practices**, **modular structure**, **dynamic command/event handling**, and **modern development standards**.

---

## 🌟 Features

#### ✨ Modular Command System

Organized by categories for both **prefix**, **context** and **slash** commands.

#### ⚙️ Dynamic Event Handling

Built-in support for major Discord events with **dynamic event loading** for scalability.

#### 📜 Easy Configuration

Manage environment variables and bot settings via `.env` files or JSON configs.

#### 📡 API Integration Ready

Example setups for connecting to external APIs like GitHub, RSS feeds, and more.

#### 🛠️ **Utility Functions**

Pre-built utilities for logging, embed creation, and more to streamline development.

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

| Command   | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| `!help`   | Prefix | Lists all available commands  |
| `!info`   | Prefix | Displays bot information      |
| `!ping`   | Prefix | Check bot and API latency     |
| `!say`    | Prefix | Make the bot repeat a message |
| `!server` | Prefix | Displays server information   |
| `!user`   | Prefix | Displays your user details    |

## 🛡️ Moderation Slash Commands

| Command      | Description              |
| ------------ | ------------------------ |
| `/ban`       | Bans a user              |
| `/unban`     | Unbans a user            |
| `/kick`      | Kicks a user             |
| `/mute`      | Mutes a user             |
| `/unmute`    | Unmutes a user           |
| `/timeout`   | Temporarily mutes a user |
| `/untimeout` | Removes timeout          |
| `/warn`      | Warns a user             |
| `/purge`     | Bulk deletes messages    |
| `/slowmode`  | Enables channel slowmode |

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

We ❤️ contributions! Follow these steps to contribute:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a new branch (`git checkout -b feature/AmazingFeature`)
3. 💾 **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. 🚀 **Push** to the branch (`git push origin feature/AmazingFeature`)
5. 🔃 **Open a Pull Request**

📖 _See our [Contribution Guidelines](CONTRIBUTING.md) for more details._

---

## 📄 License

This project is licensed under the **Apache-2.0 license**. See the [LICENSE](LICENSE) file for details.

---

## 🎉 Acknowledgments

Special thanks to:

- [Discord.js](https://discord.js.org) team for the amazing library
- [Node.js](https://nodejs.org) team
- All open-source contributors 💖

---

## 📬 Contact & Community

💬 Join us on **Discord**: [Click Here](https://discord.gg/H7pVc9aUK2)  
🐦 **Follow on Twitter**: [@nexoscreation](https://twitter.com/nexoscreator)  
📧 **Email**: [contact@nexoscreation.tech](mailto:contact@nexoscreation.tech)

<p align="center">
  Made with ❤️ by <a href="https://github.com/nexoscreation">@nexoscreation</a>
</p>
