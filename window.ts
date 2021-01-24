import type * as gtk from 'gtk';

const { GObject, Gtk } = imports.gi;

export const ExampleWindow = GObject.registerClass({
    Properties: {
        'exampleprop': GObject.ParamSpec.string(
            'exampleprop',                      // property name
            'ExampleProperty',                  // nickname
            'An example read write property',   // description
            GObject.ParamFlags.READWRITE,       // read/write/construct...
            'a default value'
        ),
    }
},
    class ExampleWindow extends Gtk.ApplicationWindow {
        exampleprop!: string;

        _init(application: gtk.Application) {
            // Example ApplicationWindow
            super._init({
                application,
                title: 'Example Application Window',
                default_width: 300,
                default_height: 200,
            });

            let label = new Gtk.Label({ label: this.exampleprop });
            this.add(label);

            this.connect('delete-event', () => {
                this.application.quit();
            });

            this.show_all();
        }
    }
)