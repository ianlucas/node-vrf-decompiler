/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { type ChildProcessWithoutNullStreams, spawn } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import type { DecompilerArgs, DecompilerArgsKey } from "./interfaces/decompiler.js";
import { toOriginalCase } from "./utils/to-original-case.js";

export const EXECUTABLE_NAME = "Source2Viewer-CLI";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootPath = join(__dirname, "..");
const extractPath = join(rootPath, EXECUTABLE_NAME);
const executablePath = join(extractPath, EXECUTABLE_NAME);

export function vrfDecompiler({ debug, ...args }: DecompilerArgs): ChildProcessWithoutNullStreams {
    const formattedArgs = Object.entries(args).flatMap(([key, value]) => {
        key = toOriginalCase(key as DecompilerArgsKey);
        return typeof value === "boolean" ? [key] : [key, value.toString()];
    });
    if (debug) {
        console.log(`${executablePath} ${formattedArgs.join(" ")}`);
    }
    return spawn(executablePath, formattedArgs);
}
