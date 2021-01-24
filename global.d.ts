/**
 * GJS Environment Type Definitions
 */

declare function log(msg: string): void;
declare function print(msg: string): void;
declare function logError(error: Error, msg?: string): void;
declare function printerr(msg: string): void;

declare interface GjsGiImports {
    versions: {
        [key: string]: string;
    };
    GLib: typeof import("@gi-types/glib");
    Gtk: typeof import("@gi-types/gtk");
    Gio: typeof import("@gi-types/gio");
    GObject: typeof import("@gi-types/gobject");
}

declare module "@gi-types/gmodule" {
    var _: any;

    export default _;
}

declare interface GjsImports {
    gi: GjsGiImports;
}

declare const imports: GjsImports;
