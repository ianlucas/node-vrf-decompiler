/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { chmodSync, unlinkSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { downloadFile } from "../src/utils/download-file.js";
import { getPlatform } from "../src/utils/get-platform.js";
import { unzipFile } from "../src/utils/unzip-file.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BASE_URL = "https://github.com/ValveResourceFormat/ValveResourceFormat/releases/download/10.2/";
const platform = getPlatform();
const zipName = `Decompiler-${platform}.zip`;
const downloadPath = join(__dirname, "..", zipName);
const extractPath = join(__dirname, "..", "Decompiler");

export async function postInstall() {
    await downloadFile(`${BASE_URL}${zipName}`, downloadPath);
    await unzipFile(downloadPath, extractPath);
    unlinkSync(downloadPath);
    if (process.platform !== "win32") {
        const executablePath = join(extractPath, "Decompiler");
        chmodSync(executablePath, "755");
    }
}

if (process.argv[1] === __filename) {
    postInstall();
}
