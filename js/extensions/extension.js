//TODO: Puede ser usado como clase ES6 ?
function forgeExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);

    // Preserve "this" reference when methods are invoked by event handlers.
    this.lockViewport = this.lockViewport.bind(this);
    this.unlockViewport = this.unlockViewport.bind(this);
}

forgeExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
forgeExtension.prototype.constructor = forgeExtension;


forgeExtension.prototype.lockViewport = function () {
    this.viewer.setNavigationLock(true);
};

forgeExtension.prototype.unlockViewport = function () {
    this.viewer.setNavigationLock(false);
};

forgeExtension.prototype.load = function () {
    // alert('forgeExtension is loaded!');
    // console.log('this', this)
    // var viewer = this.viewer;

    // var lockBtn = document.getElementById('lock-button');
    // lockBtn.addEventListener('click', function () {
    //     viewer.setNavigationLock(true);
    // });

    // var unlockBtn = document.getElementById('unlock-button');
    // unlockBtn.addEventListener('click', function () {
    //     viewer.setNavigationLock(false);
    // });

    this._lockBtn = document.getElementById('lock-button');
    this._lockBtn.addEventListener('click', this.lockViewport);

    this._unlockBtn = document.getElementById('unlock-button');
    this._unlockBtn.addEventListener('click', this.unlockViewport);


    return true;
};

forgeExtension.prototype.unload = function () {
    if (this._lockBtn) {
        this._lockBtn.removeEventListener('click', this.lockViewport);
        this._lockBtn = null;
    }

    if (this._unlockBtn) {
        this._unlockBtn.removeEventListener('click', this.unlockViewport);
        this._unlockBtn = null;
    }
    return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('forgeExtension', forgeExtension);