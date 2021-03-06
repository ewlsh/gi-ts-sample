// SPDX-License-Identifier: MIT OR LGPL-2.0-or-later
// SPDX-FileCopyrightText: 2017 Andy Holmes <andrew.g.r.holmes@gmail.com>

import type * as glib from 'glib';

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;

import { ExampleWindow } from './window';

var ExampleApplication = GObject.registerClass({
    Signals: { 'examplesig': { param_types: [GObject.TYPE_INT] } },
}, class ExampleApplication extends Gtk.Application {
    _init() {
        super._init({
            application_id: 'org.gnome.gjs.ExampleApplication',
            flags: Gio.ApplicationFlags.FLAGS_NONE,
        });
    }

    // Example signal emission
    emitExamplesig(number: number) {
        this.emit('examplesig', number);
    }

    vfunc_startup() {
        super.vfunc_startup();

        // An example GAction, see: https://wiki.gnome.org/HowDoI/GAction
        let exampleAction = new Gio.SimpleAction({
            name: 'exampleAction',
            parameter_type: new GLib.VariantType('s'),
        });

        exampleAction.connect('activate', (action, param) => {
            // TODO: Check for null
            let paramStr = (param?.deepUnpack() as glib.Variant<any>).toString();

            if (paramStr === 'exampleParameter')
                log('Yes!');
        });

        this.add_action(exampleAction);
    }

    vfunc_activate() {
        super.vfunc_activate();

        this.hold();

        const window = new ExampleWindow(this);
        window.present();

        // Example GNotification, see: https://developer.gnome.org/GNotification/
        let notif = new Gio.Notification();
        notif.set_title('Example Notification');
        notif.set_body('Example Body');
        notif.set_icon(
            new Gio.ThemedIcon({ name: 'dialog-information-symbolic' })
        );

        // A default action for when the body of the notification is clicked
        notif.set_default_action("app.exampleAction('exampleParameter')");

        // A button for the notification
        notif.add_button(
            'Button Text',
            "app.exampleAction('exampleParameter')"
        );

        // This won't actually be shown, since an application needs a .desktop
        // file with a base name matching the application id
        this.send_notification('example-notification', notif);

        // Withdraw
        this.withdraw_notification('example-notification');
    }
});

let app = new ExampleApplication();
app.run([]);
