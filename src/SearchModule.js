;(function(){
    class SearchModule {
        constructor(options) {
            this.input = options.input;
            this.items = options.items;
            this.defaultDisplay = options.defaultDisplay || "block";
            this.oninput = options.oninput;
            this.onEnterKey = options.onEnterKey;

            if (!this.input || !this.items) {
                throw new Error("SearchModule(options) : input parameter and items parameter cannot be null.");
            }

            var self = this;
            window.addEventListener('load', function() {
                var input = document.querySelector(self.input);
                if (!input) {
                    throw new Error("SearchModule(options) : input given doesn't exist. Must be an ID.");
                } else {
                    input.addEventListener("input", function(e) {
                        self.search(e);
                    });
                }
            });
        }
        
        /// Everytimes that the user writes in the input...
        search(e) {
            var value = e.target.value.trim().toLowerCase();

            var areThereResults = false;
            var funcOnInput = this.oninput || null;
            var defaultDisplay = this.defaultDisplay;
            var allitems = document.querySelectorAll(this.items);
            if (allitems) {
                Array.from(allitems).forEach(function(item) {
                    var keywords = item.getAttribute("data-keywords").trim().toLowerCase();
                    if (keywords) {
                        if (keywords.indexOf(value) === -1) {
                            item.style.display = "none";
                            for (var i of allitems) {
                                if (i.style.display === "none") {
                                    areThereResults = false;
                                } else {
                                    areThereResults = true;
                                    break;
                                }
                            }
                        } else {
                            item.style.display = defaultDisplay;
                            areThereResults = true;
                        }
                    } else {
                        console.error("SearchModule(options) : one of the items doesn't have a data-keywords attribute : ", item);
                    }
                });
                if (funcOnInput) funcOnInput(value, areThereResults);
            } else {
                throw new Error("SearchModule(options) : the items don't exist. Must be a class.");
            }
        }
    }

    window.SearchModule = SearchModule;
})();