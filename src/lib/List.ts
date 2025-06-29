// https://games.roblox.com/v1/games/16991287194/servers/Public?sortOrder=Desc&excludeFullGames=true&limit=100&cursor=

import { RobloxCookie } from "./Cookie";

type ListResponse = {
	previousPageCursor?: string,
	nextPageCursor?: string,
	data: {
		/** The server's jobId */
		id: string,

		/** Max number of players */
		maxPlayers: number,

		/** Number of players */
		playing: number,

		/** Player PFP tokens */
		playerTokens: string[],

		/** Unused */
		players: [],

		/** The server's FPS */
		fps: number,

		/** The server's ping */
		ping: number
	}[]
}

export async function getServerList(placeId: string, paginationToken?: string): Promise<ListResponse> {
	const req = await fetch(`https://games.roblox.com/v1/games/${placeId}/servers/Public?sortOrder=desc&excludeFullGames=true&limit=100&cursor=${paginationToken || ""}`, {
		headers: {
			Cookie: RobloxCookie,
			"Content-Type": "application/json",
			"User-Agent": "Roblox/WinInet",
			Origin: "https://www.roblox.com",
			Referer: "https://www.roblox.com"
		}
	});
	return (await req.json()) as ListResponse;
}
