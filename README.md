# Roblox EU/US Server Bypasser

This simple tool lets you bypass joining Roblox EU servers. It fetches the server list for a given game (Place ID), determines the geographical location of each server using a *secret* API, and filters them out based on their UDMUX or Machine IP addresses..

## Prerequisites

- [Bun](https://bun.sh/) installed on your system.
- A valid `.ROBLOSECURITY` cookie from your Roblox account in a `.cookie` file.

## How to Use

1.  **Enter the Place ID:**
	- Run `bun run src/index.ts`.
    - When prompted, enter the Place ID of the Roblox game you want to scan.
    - You can find the Place ID in the URL of the game's page (e.g., `https://www.roblox.com/games/PLACE_ID/`).

2.  **Wait:**
    - The script will start scanning for servers and printing their locations.
    - Servers in your target countries will be highlighted.
    - A final list of servers in the target regions will be displayed at the end.
    - Interrupt the scan early with `^C`.

## How It Works

The tool works by making a series of API calls to Roblox endpoints:

1.  **Get Server List:** It uses the `games.roblox.com` API to fetch a list of public servers for the given `placeId`.
2.  **Get Server IP:** For each server, it calls the `gamejoin.roblox.com` endpoint. This undocumented API returns details about the server, including it's IP addresses (which are used to determine the server's region).
3.  **Determine Region:** Look the IP up on a predefined list of IP address ranges to determine the geographical location of the server. This list is based on known Roblox server locations.

## Disclaimer

This tool uses undocumented Roblox APIs, which may change or break at any time. Use it at your own risk. You may get rate-limited by Roblox.
