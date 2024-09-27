/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { DecompilerArgsKey } from "../interfaces/decompiler";

const map: Record<DecompilerArgsKey, string> = {
    input: "--input",
    recursive: "--recursive",
    recursiveVpk: "--recursive_vpk",
    vpkExtensions: "--vpk_extensions",
    vpkFilepath: "--vpk_filepath",
    vpkCache: "--vpk_cache",
    vpkVerify: "--vpk_verify",
    output: "--output",
    all: "--all",
    block: "--block",
    vpkDecompile: "--vpk_decompile",
    decompile: "--decompile",
    vpkList: "--vpk_list",
    vpkDir: "--vpk_dir",
    gltfExportFormat: "--gltf_export_format",
    gltfExportMaterials: "--gltf_export_materials",
    gltfTexturesAdapt: "--gltf_textures_adapt",
    gltfExportExtras: "--gltf_export_extras",
    toolsAssetInfoShort: "--tools_asset_info_short",
    gltfAnimationList: "--gltf_animation_list",
    gltfExportAnimations: "--gltf_export_animations",
    textureDecodeFlags: "--texture_decode_flags"
};

export function toOriginalCase(option: DecompilerArgsKey): string {
    return map[option];
}
