async function updateLocalStorage() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs?.query(queryOptions);

    const url = tab?.url;

};

// const geniesIFrame = document.querySelector(".genieus_iframe").contentWindow;

// geniesIFrame.postMessage("TEST", "chrome-extension://jcdngkhngklghoachcgnglicjplkdolo");