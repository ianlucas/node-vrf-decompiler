/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ChildProcessWithoutNullStreams } from "child_process";
import { createWriteStream, existsSync } from "fs";
import { rm } from "fs/promises";
import { resolve } from "path";
import { afterAll, beforeAll, expect, test } from "vitest";
import { postInstall } from "../scripts/postinstall.js";
import { vrfDecompiler } from "./vrf-decompiler.js";

const url = "https://github.com";
const repo = "ValveResourceFormat/ValveResourceFormat";
const commit = "9acf01d01522e7c6e93d31da273ca6782ac1f0c2";
const file = "subscriptions_gamerpvp_inhouse_png.vtex_c";
const sampleVtexCUrl = `${url}/${repo}/raw/${commit}/Tests/Files/${file}`;

const cwd = process.cwd();
const sampleVtexCPath = resolve(cwd, "sample_png.vtex_c");
const decompiledSamplePngPath = resolve(cwd, "sample_png.png");
const vrfDecompilerPath = resolve(cwd, "Decompiler");
const vrfDecompilerBinPath = resolve(vrfDecompilerPath, "Decompiler");

function read(ps: ChildProcessWithoutNullStreams) {
    return new Promise((resolve, reject) => {
        let stdout = "";
        ps.stdout.on("data", (data) => {
            stdout += data.toString();
        });
        ps.stderr.on("data", (data) => {
            console.error(data.toString());
        });
        ps.on("close", (code) => {
            (code === 0 ? resolve : reject)(stdout);
        });
    });
}

beforeAll(async () => {
    await postInstall();
    await fetch(sampleVtexCUrl).then((response) => {
        const writeStream = createWriteStream(sampleVtexCPath);
        const writableStream = new WritableStream<Uint8Array>({
            write(chunk) {
                writeStream.write(chunk);
            },
            close() {
                writeStream.end();
            },
            abort() {
                writeStream.destroy();
            }
        });
        response.body?.pipeTo(writableStream);
    });
});

test("npm run postinstall", () => {
    expect(existsSync(vrfDecompilerBinPath)).toBe(true);
});

test("vrf-decompiler", async () => {
    expect(
        await read(
            vrfDecompiler({
                input: sampleVtexCPath,
                vpkDecompile: true,
                output: cwd,
                debug: true
            })
        )
    ).toMatch(/File Size: 1924 bytes/);
    expect(existsSync(decompiledSamplePngPath)).toBe(true);
});

afterAll(async () => {
    if (existsSync(vrfDecompilerPath)) {
        await rm(vrfDecompilerPath, {
            recursive: true
        });
    }
    if (existsSync(sampleVtexCPath)) {
        await rm(sampleVtexCPath);
    }
    if (existsSync(decompiledSamplePngPath)) {
        await rm(decompiledSamplePngPath);
    }
});
