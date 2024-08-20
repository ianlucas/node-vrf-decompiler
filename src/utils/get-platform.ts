/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import os from "os";

export function getPlatform() {
    const platform = os.platform();
    const arch = os.arch();
    if (platform === "win32") return arch === "arm64" ? "windows-arm64" : "windows-x64";
    if (platform === "darwin") return arch === "arm64" ? "macos-arm64" : "macos-x64";
    if (platform === "linux") {
        if (arch === "arm") return "linux-arm";
        if (arch === "arm64") return "linux-arm64";
        return "linux-x64";
    }
    throw new Error("Unsupported platform");
}
