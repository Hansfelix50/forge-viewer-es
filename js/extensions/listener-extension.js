function EventsTutorial(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);

    // Preserve "this" reference when methods are invoked by event handlers.
    this.onLoadedModel = this.onLoadedModel.bind(this);
}

EventsTutorial.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
EventsTutorial.prototype.constructor = EventsTutorial;


// Event hanlder for Autodesk.Viewing.SELECTION_CHANGED_EVENT
EventsTutorial.prototype.onLoadedModel = function (event) {
    console.log('Se cargó el modelo')
    console.log(this.viewer.getObjectTree)

    this.getAllLeafComponents(function (dbIds) {
        console.log(dbIds)

        var count = dbIds.length;
        var modelData = {};
        dbIds.forEach(function (dbId) {
            viewer.getProperties(dbId, function (props) {
                props.properties.forEach(function (prop) {
                    if (!isNaN(prop.displayValue)) return; // let's not categorize properties that store numbers

                    // some adjustments for revit:
                    prop.displayValue = prop.displayValue.replace('Revit ', ''); // remove this Revit prefix
                    if (prop.displayValue.indexOf('<') == 0) return; // skip categories that start with <

                    // ok, now let's organize the data into this hash table
                    if (modelData[prop.displayName] == null) modelData[prop.displayName] = {};
                    if (modelData[prop.displayName][prop.displayValue] == null) modelData[prop.displayName][prop.displayValue] = [];
                    modelData[prop.displayName][prop.displayValue].push(dbId);
                })
                if ((--count) == 0) {
                    console.log(modelData)
                    console.log(Object.keys(modelData['Category']))
                    console.log(Object.keys(modelData['Category']).map(key => modelData['Category'][key].length))
                    // Cargar PIE
                    let pieSeries = Object.keys(modelData['Category']).map(key => modelData['Category'][key].length)
                    let pieLabels = Object.keys(modelData['Category'])
                    loadPieChart(pieLabels, pieSeries, 'Category', modelData)

                    // Cargar BAR
                    let barSeries = Object.keys(modelData['Type Name']).map(key => modelData['Type Name'][key].length)
                    let barLabels = Object.keys(modelData['Type Name'])
                    loadBarChart(barLabels, barSeries, 'Type Name', modelData)


                };
            });
        })

    });


};


EventsTutorial.prototype.getAllLeafComponents = function (callback) {
    // from https://learnforge.autodesk.io/#/viewer/extensions/panel?id=enumerate-leaf-nodes
    viewer.getObjectTree(function (tree) {
        console.log(tree)
        var leaves = [];
        tree.enumNodeChildren(tree.getRootId(), function (dbId) {
            if (tree.getChildCount(dbId) === 0) {
                leaves.push(dbId);
            }
        }, true);
        callback(leaves);
    });
};


EventsTutorial.prototype.load = function () {
    this.onLoadedModel = this.onLoadedModel.bind(this);
    this.viewer.setBackgroundColor(246,246,246,246,246,246);
    this.viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, this.onLoadedModel);
    return true;
};

EventsTutorial.prototype.unload = function () {
    this.viewer.removeEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, this.onLoadedModel);
    this.onLoadedModel = null;
    return true;
};


Autodesk.Viewing.theExtensionManager.registerExtension('EventsTutorial', EventsTutorial);