chrome.runtime.onInstalled.addListener(function() {
    // open a new tab after installing :)
    chrome.tabs.create({
        active: true
    });
    chrome.storage.sync.set({ "mode" : "dark"});
    chrome.storage.sync.set({ "format" : "24"});
})