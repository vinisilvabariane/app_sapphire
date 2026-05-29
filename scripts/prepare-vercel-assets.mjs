import { cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve("public/build");
const target = resolve("build");

if (!existsSync(source)) {
    throw new Error("public/build was not generated. Run vite build first.");
}

await rm(target, { recursive: true, force: true });
await cp(source, target, { recursive: true });
