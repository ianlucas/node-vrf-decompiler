/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createReadStream } from "fs";
import unzipper from "unzipper";

export function unzipFile(zipPath: string, dest: string): Promise<void> {
    return createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: dest }))
        .promise();
}
