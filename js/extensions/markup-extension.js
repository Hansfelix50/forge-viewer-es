function MarkupExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
}

MarkupExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
MarkupExtension.prototype.constructor = MarkupExtension;

MarkupExtension.prototype.load = function () {
    let viewer = this.viewer;

    this.viewer.setLightPreset(6);
    this.viewer.setEnvMapBackground(true);

    // Ensure the model is centered
    this.viewer.fitToView();

    //Create a Custom toolbar for markup
    this.toolBarMarkup = new Autodesk.Viewing.UI.ToolBar('toolBarMarkup', { collapsible: true, alignVertically: false });

    var controlGroupDraw = new Autodesk.Viewing.UI.ControlGroup('controlGroupDraw');

    var buttonSquare = new Autodesk.Viewing.UI.ComboButton('buttonSquare');
    buttonSquare.setToolTip('Cuadrado');
    buttonSquare.setIcon('adsk-icon-measure-area-new');
    let toolBarMarkup = this.toolBarMarkup;
    buttonSquare.onClick = function (e) {
        let markupExtension = viewer.getExtension('Autodesk.Viewing.MarkupsCore');
        markupExtension.leaveEditMode();
        markupExtension.hide();
        toolBarMarkup.setVisible(false);
    }
    controlGroupDraw.addControl(buttonSquare);

    // Add Control Group to Toolbar
    this.toolBarMarkup.addControl(controlGroupDraw);
    this.toolBarMarkup.setVisible(false);

    this.viewer.container.append(this.toolBarMarkup.container)

    return true;
};

MarkupExtension.prototype.onToolbarCreated = function (toolbar) {


    // var viewer = this.viewer;

    // // Crear Toolbar vertical
    // var toolbar2 = new Autodesk.Viewing.UI.ToolBar('toolbar-markup', { collapsible: true, alignVertically: true });

    // var ctrlGroup = new Autodesk.Viewing.UI.ControlGroup('Autodesk.Research.TtIf.Extension.Toolbar.ControlGroup');
    // ctrlGroup.addClass('toolbar-vertical-group');


    // var button2 = new Autodesk.Viewing.UI.ComboButton('show-env-bg-button');
    // button2.addClass('show-env-bg-button');
    // button2.setToolTip('Create a markup');
    // button2.setIcon('adsk-icon-measure-area-new');
    // ctrlGroup.addControl(button2);

    // toolbar2.addControl(ctrlGroup);
    // // viewer.addControl(ctrlGroup);
    // toolbar2.setVisible(true);




    //toolbar3
    // var toolbar3 = new Autodesk.Viewing.UI.ToolBar('toolbar-hide', { collapsible: true, alignVertically: false });
    // var button3 = new Autodesk.Viewing.UI.Button('show-env-bg-button');
    // button2.addControl(button3);
    // toolbar3.setVisible(true);
    // button2.container.append(toolbar3.container);


    //
    // this.viewer.container.append(toolbar2.container)
    // debugger;

    // Button 1}/
    // PAra aactivar modo texto supuestamente
    // var modeText = new Autodesk.Markups.Core.EditModeText(MarkupsExtension);
    // MarkupsExtension.changeEditMode(modeText);


    // Añadir el boton de crear markup al toolbar
    var buttonMarkup = new Autodesk.Viewing.UI.Button('buttonMarkup');
    buttonMarkup.setToolTip('Crear un markup');
    buttonMarkup.setIcon('adsk-icon-measure-area-new'); // TODO: mejorar botón, se podría usar css

    let toolBarMarkup = this.toolBarMarkup;
    buttonMarkup.onClick = function (e) {
        let markupExtension = viewer.getExtension('Autodesk.Viewing.MarkupsCore');
        markupExtension.enterEditMode();
        toolBarMarkup.setVisible(true);
    };

    // Control Group para el markup
    this.controlGroupMarkup = new Autodesk.Viewing.UI.ControlGroup('controlGroupMarkup');
    this.controlGroupMarkup.addControl(buttonMarkup);

    toolbar.addControl(this.controlGroupMarkup);

};

MarkupExtension.prototype.unload = function () {
    if (this.controlGroupMarkup) {
        this.viewer.toolbar.removeControl(this.controlGroupMarkup);
        this.controlGroupMarkup = null;
    }
};

Autodesk.Viewing.theExtensionManager.registerExtension('MarkupExtension', MarkupExtension);