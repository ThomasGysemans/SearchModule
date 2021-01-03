class SearchModule {
    constructor(options) {
        this.items = options.items;
        this.defaultDisplay = options.defaultDisplay || "block";
        this.oninput = options.oninput;

        if (!this.items) {
            throw new Error("SearchModule(options) : input parameter and items parameter cannot be null.");
        }
    }
    
    /// Everytimes that the user writes in the input...
    search(e) {
        if (!e) {
            throw new Error("SearchModule: you need to pass 'this' (the input) to search: search(this).");
        }

        var value = e.value.trim().toLowerCase();

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
