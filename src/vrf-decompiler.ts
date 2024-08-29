/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { DecompilerArgs, DecompilerArgsKey } from "./interfaces/decompiler.js";
import { toOriginalCase } from "./utils/to-original-case.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootPath = join(__dirname, "..");
const extractPath = join(rootPath, "Decompiler");
const executablePath = join(extractPath, "Decompiler");

export function vrfDecompiler({ debug, ...args }: DecompilerArgs): ChildProcessWithoutNullStreams {
    const formattedArgs = Object.entries(args).flatMap(([key, value]) => {
        key = toOriginalCase(key as DecompilerArgsKey);
        return typeof value === "boolean" ? [key] : [key, value];
    });
    if (debug) {
        console.log(`${executablePath} ${formattedArgs.join(" ")}`);
    }
    return spawn(executablePath, formattedArgs);
}
