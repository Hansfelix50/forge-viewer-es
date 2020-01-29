function MarkupExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
}

MarkupExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
MarkupExtension.prototype.constructor = MarkupExtension;

MarkupExtension.prototype.load = function () {
    // Set background environment to "Infinity Pool"
    // and make sure the environment background texture is visible
    this.viewer.setLightPreset(6);
    this.viewer.setEnvMapBackground(true);

    // Ensure the model is centered
    this.viewer.fitToView();

    return true;
};

MarkupExtension.prototype.onToolbarCreated = function (toolbar) {


    var viewer = this.viewer;

    // Crear Toolbar vertical
    var toolbar2 = new Autodesk.Viewing.UI.ToolBar('toolbar-markup', { collapsible: true, alignVertically: true });

    var ctrlGroup = new Autodesk.Viewing.UI.ControlGroup('Autodesk.Research.TtIf.Extension.Toolbar.ControlGroup');
    ctrlGroup.addClass('toolbar-vertical-group');


    var button2 = new Autodesk.Viewing.UI.ComboButton('show-env-bg-button');
    button2.addClass('show-env-bg-button');
    button2.setToolTip('Create a markup');
    button2.setIcon('adsk-icon-measure-area-new');
    ctrlGroup.addControl(button2);

    toolbar2.addControl(ctrlGroup);
    // viewer.addControl(ctrlGroup);
    toolbar2.setVisible(true);




    //toolbar3
    var toolbar3 = new Autodesk.Viewing.UI.ToolBar('toolbar-hide', { collapsible: true, alignVertically: false });
    var button3 = new Autodesk.Viewing.UI.Button('show-env-bg-button');
    button2.addControl(button3);
    toolbar3.setVisible(true);
    // button2.container.append(toolbar3.container);


//
    this.viewer.container.append(toolbar2.container)
    debugger;

    // Button 1
    var button1 = new Autodesk.Viewing.UI.Button('show-env-bg-button');
    button1.onClick = function (e) {
        // viewer.setEnvMapBackground(true);

        let MarkupsExtension = viewer.getExtension('Autodesk.Viewing.MarkupsCore');
        MarkupsExtension.enterEditMode();

        var modeText = new Autodesk.Markups.Core.EditModeText(MarkupsExtension);
        MarkupsExtension.changeEditMode(modeText);

    };
    button1.addClass('show-env-bg-button');
    button1.setToolTip('Create a markup');
    button1.setIcon('adsk-icon-measure-area-new');


    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('my-custom-toolbar');
    this.subToolbar.addControl(button1);

    toolbar.addControl(this.subToolbar);

};

MarkupExtension.prototype.unload = function () {
    if (this.subToolbar) {
        this.viewer.toolbar.removeControl(this.subToolbar);
        this.subToolbar = null;
    }
};

Autodesk.Viewing.theExtensionManager.registerExtension('MarkupExtension', MarkupExtension);