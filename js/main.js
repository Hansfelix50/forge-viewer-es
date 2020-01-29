// Configuración de la inicialización
var viewer;
var options = {
    env: 'AutodeskProduction',
    api: 'derivativeV2',  // for models uploaded to EMEA change this option to 'derivativeV2_EU'

    // Function to define the method to get the token and renew it
    getAccessToken: function (onTokenReady) {
        let token = '';
        let timeInSeconds = 3600; // TODO: Use value provided by Forge Authentication (OAuth) API

        axios.get('http://localhost:3000/model/oauth')
            .then(function (response) {
                token = response.data;
                // TODO: Config server and get the real time reaining
                onTokenReady(token, timeInSeconds);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
};

/**
 * Initializer function, when load the viewer
 */
Autodesk.Viewing.Initializer(options, function () {
    // Extensions
    var config3d = {
        extensions: ['forgeExtension', 'EventsTutorial', 'Autodesk.DocumentBrowser', 'Autodesk.Viewing.MarkupsCore','MarkupExtension'],
    };

    // The dom element, where load the viewer
    var htmlDiv = document.getElementById('forgeViewer');
    viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv, config3d);


    // viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, (x) => {
    //     let MarkupsExtension = viewer.getExtension('Autodesk.Viewing.MarkupsCore');
    //     MarkupsExtension.enterEditMode();
    // })


    var startedCode = viewer.start();
    if (startedCode > 0) {
        console.error('Failed to create a Viewer: WebGL not supported.');
        return;
    }

    console.log('Initialization complete, loading a model next...');
});


/**
 * Carga del Modelo
 */
let buttonFloat = document.getElementById('button-float');
buttonFloat.addEventListener('click', function name(params) {

    var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bGlzaXN0ZXN0LWRlc2Fycm9sbG9fYnVja2V0LzE1NzczNzY0MDYyMDlfQVJRX01BRVNUUkFOWkFfRVNUQUNJT05BTUlFTlRPLnJ2dA==';
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);

    function onDocumentLoadSuccess(viewerDocument) {
        var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
        viewer.loadDocumentNode(viewerDocument, defaultModel);



        // var thePromise = viewer.model.getPropertyDb().executeUserFunction(userFunction);
        // thePromise.then(function (retValue) {
        //     console.log('retValue is: ', retValue); // prints 'retValue is: 42'
        // }).catch(function (err) {
        //     console.log("Something didn't go right...")
        //     console.log(err);
        // });
    }

    function onDocumentLoadFailure() {
        console.error('Failed fetching Forge manifest');
    }

    // function userFunction(pdb) {
    //     return 42;
    // }

})