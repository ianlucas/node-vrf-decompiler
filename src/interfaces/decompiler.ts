/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface DecompilerArgs {
    /**
     * Print debug information.
     */
    debug?: boolean;

    /**
     * Input file to be processed. With no additional arguments, a summary of the input(s) will be displayed.
     * @remarks Can be specified using `--input` or `-i`.
     */
    input?: string;

    /**
     * If specified and given input is a folder, all subdirectories will be scanned too.
     * @remarks Can be specified using `--recursive`.
     */
    recursive?: boolean;

    /**
     * If specified along with `--recursive`, will also recurse into VPK archives.
     * @remarks Can be specified using `--recursive_vpk`.
     */
    recursiveVpk?: boolean;

    /**
     * File extension(s) filter, example: "vcss_c,vjs_c,vxml_c".
     * @remarks Can be specified using `--vpk_extensions` or `-e`.
     */
    vpkExtensions?: string;

    /**
     * File path filter, example: "panorama\" or "scripts/items/items_game.txt".
     * @remarks Can be specified using `--vpk_filepath` or `-f`.
     */
    vpkFilepath?: string;

    /**
     * Use cached VPK manifest to keep track of updates. Only changed files will be written to disk.
     * @remarks Can be specified using `--vpk_cache`.
     */
    vpkCache?: boolean;

    /**
     * Verify checksums and signatures.
     * @remarks Can be specified using `--vpk_verify`.
     */
    vpkVerify?: boolean;

    /**
     * Output path to write to. If input is a folder (or a VPK), this should be a folder.
     * @remarks Can be specified using `--output` or `-o`.
     */
    output?: string;

    /**
     * Print the content of each resource block in the file.
     * @remarks Can be specified using `--all` or `-a`.
     */
    all?: boolean;

    /**
     * Print the content of a specific block, example: DATA, RERL, REDI, NTRO.
     * @remarks Can be specified using `--block` or `-b`.
     */
    block?: string;

    /**
     * Decompile supported resource files.
     * @remarks Can be specified using `--vpk_decompile` or `-d`.
     */
    vpkDecompile?: boolean;

    /**
     * Decompile supported resource files. Alias of `vpkDecompile`.
     * @remarks Can be specified using `--decompile`.
     */
    decompile?: boolean;

    /**
     * Lists all resources in given VPK. File extension and path filters apply.
     * @remarks Can be specified using `--vpk_list` or `-l`.
     */
    vpkList?: boolean;

    /**
     * Print a list of files in given VPK and information about them.
     * @remarks Can be specified using `--vpk_dir`.
     */
    vpkDir?: boolean;

    /**
     * @remarks Can be specified using `--gltf_export_animations`.
     */
    gltfExportAnimations?: boolean;

    /**
     * @remarks Can be specified using `--gltf_animation_list`.
     */
    gltfAnimationList?: string;

    /**
     * Exports meshes/models in given glTF format. Must be either 'gltf' (default) or 'glb'.
     * @remarks Can be specified using `--gltf_export_format`.
     */
    gltfExportFormat?: "gltf" | "glb";

    /**
     * Whether to export materials during glTF exports.
     * @remarks Can be specified using `--gltf_export_materials`.
     */
    gltfExportMaterials?: boolean;

    /**
     * Whether to perform any glTF spec adaptations on textures (e.g. split metallic map).
     * @remarks Can be specified using `--gltf_textures_adapt`.
     */
    gltfTexturesAdapt?: boolean;

    /**
     * Export additional Mesh properties into glTF extras.
     * @remarks Can be specified using `--gltf_export_extras`.
     */
    gltfExportExtras?: boolean;

    /**
     * Whether to print only file paths for tools_asset_info files.
     * @remarks Can be specified using `--tools_asset_info_short`.
     */
    toolsAssetInfoShort?: boolean;

    /**
     * @remarks Can be specified using `--texture_decode_flags`.
     */
    textureDecodeFlags?: string;
}

export type DecompilerArgsKey = keyof Omit<DecompilerArgs, "debug">;
