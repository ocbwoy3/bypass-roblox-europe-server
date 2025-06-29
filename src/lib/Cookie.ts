import { readFileSync } from "fs";
import { join } from "path";

export const RobloxCookie = readFileSync(join(__dirname, "..", "..", ".cookie")).toString(
	"utf-8"
);
