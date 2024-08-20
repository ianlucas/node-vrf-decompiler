/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { exec } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { DecompilerArgs, DecompilerArgsKey } from "./interfaces/decompiler.js";
import { toOriginalCase } from "./utils/to-original-case.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootPath = join(__dirname, "..");
const extractPath = join(rootPath, "DepotDownloader");
const executablePath = join(extractPath, "DepotDownloader");

export function vrfDecompiler({ debug, ...args }: DecompilerArgs): Promise<string> {
    return new Promise((resolve, reject) => {
        const formattedArgs = Object.entries(args)
            .map(([key, value]) => {
                key = toOriginalCase(key as DecompilerArgsKey);
                return typeof value === "boolean" ? `-${key}` : `-${key} ${value}`;
            })
            .join(" ");
        const command = `${executablePath} ${formattedArgs}`;
        if (debug) {
            console.log(command);
        }
        exec(command, (error, stdout) => {
            if (error) return reject(error);
            resolve(stdout);
        });
    });
}

export function resolvePath(...paths: string[]): string {
    return join(rootPath, ...paths);
}
