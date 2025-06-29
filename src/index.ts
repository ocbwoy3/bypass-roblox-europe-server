import { sleep } from "bun";
import { getServerRegion } from "./lib/GetRegion";
import { getServerList } from "./lib/List";

const PLACE_ID = prompt("Enter place ID: ");
if (!PLACE_ID) {
	throw "no input :(";
}

let cursor: string | undefined = undefined;

let shouldBreak: boolean = false;

const targetCountries = ["Singapore", "Japan", "India", "Australia"];

let win: string[] = [];

process.on("SIGINT", ()=>{
	shouldBreak = true;
})

try {
	do {
		if (shouldBreak) break;
		const x = await getServerList(PLACE_ID, cursor);
		if (!x.data) {
			console.error(x);
			break;
		}
		cursor = x.nextPageCursor;

		for (const a of x.data) {
			(async () => {
				try {
					const reg = await getServerRegion(PLACE_ID, a.id);
					if (!reg) return;
					if (targetCountries.includes(reg.country.name)) {
						console.warn(
							`${a.id} - ${reg.city}${
								reg.region ? `, ${reg.region.name}` : ""
							}, ${reg.country.name}`
						);
						win.push(
							`${a.id} - ${reg.city}${
								reg.region ? `, ${reg.region.name}` : ""
							}, ${reg.country.name}`
						);
					} else {
						console.log(
							`${a.id} - ${reg.city}${
								reg.region ? `, ${reg.region.name}` : ""
							}, ${reg.country.name}`
						);
					}
				} catch (a_) {
					console.error(a_);
				}
			})();
		}

		await sleep(1500);
	} while (cursor);
} catch {};

console.log("\n".repeat(5))
console.log(win.join("\n"))
