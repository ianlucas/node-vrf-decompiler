/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ChildProcessWithoutNullStreams } from "child_process";
import { existsSync } from "fs";
import { rm } from "fs/promises";
import { resolve } from "path";
import { afterAll, beforeAll, expect, test } from "vitest";
import { postInstall } from "../scripts/postinstall.js";
import { EXECUTABLE_NAME, vrfDecompiler } from "./vrf-decompiler.js";

const cwd = process.cwd();
const sampleVtexCPath = resolve(cwd, "tests/sample_png.vtex_c");
const decompiledSamplePngPath = resolve(cwd, "tests/sample_png.png");
const vrfDecompilerPath = resolve(cwd, EXECUTABLE_NAME);
const vrfDecompilerBinPath = resolve(vrfDecompilerPath, EXECUTABLE_NAME);

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
    ).toMatch(/Dump written/);
    expect(existsSync(decompiledSamplePngPath)).toBe(true);
});

afterAll(async () => {
    if (existsSync(vrfDecompilerPath)) {
        await rm(vrfDecompilerPath, {
            recursive: true
        });
    }
    if (existsSync(decompiledSamplePngPath)) {
        await rm(decompiledSamplePngPath);
    }
});
