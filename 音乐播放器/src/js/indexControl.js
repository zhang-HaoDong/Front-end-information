(function (root) {
    function CreateIndex(len) {
        this.index = 0;
        this.len = len;
    }
    CreateIndex.prototype = {
        next() {
            return this.get(1);
        },
        prev() {
            return this.get(-1);
        },
        get(val){
            this.index = (this.index + val + this.len) % this.len;
            return this.index;
        }
    }
    root.CreateIndex = CreateIndex;

})(window.player || (window.player = {}))