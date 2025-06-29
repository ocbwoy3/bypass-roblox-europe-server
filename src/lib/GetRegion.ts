import { RobloxCookie } from "./Cookie";
import { serverRegionsByIp, type Region } from "./IPAddresses";

// https://github.com/AntiBoomz/BTRoblox/blob/master/js/shared/serverdetails.js

export async function getServerUDMUXAddress(
	placeId: string,
	gameId: string
): Promise<string | "full"> {
	const res = await fetch(
		`https://gamejoin.roblox.com/v1/join-game-instance`,
		{
			method: "POST",
			headers: {
				Cookie: RobloxCookie,
				"Content-Type": "application/json",
				"User-Agent": "Roblox/WinInet"
			},
			body: JSON.stringify({ placeId, gameId })
		}
	);

	const json: any = await res.json();
	const address =
		json?.joinScript?.UdmuxEndpoints?.[0]?.Address ??
		json?.joinScript?.MachineAddress;

	if (!address) {
		return "full";
	}

	return address;
}

export async function getServerRegion(
	placeId: string,
	gameId: string
): Promise<Region | null> {
	const ipAddress = await getServerUDMUXAddress(placeId, gameId);
	if (ipAddress === "full") return null;
	const location = ipAddress.startsWith("128.116")
		? serverRegionsByIp[ipAddress.replace(/^(128\.116\.\d+)\.\d+$/, "$1.0")]
		: serverRegionsByIp.Non118;
	return !!location
		? location
		: {
				city: "Nowhereville",
				country: { name: "Veridia", code: "VD" },
				region: { name: "Robloxia", code: "RB" }
		  };
}
