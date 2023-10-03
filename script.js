
(async function() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs?.query(queryOptions);

    const url = tab?.url;

    sessionStorage.setItem("site", url);
})();