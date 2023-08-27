document.getElementById("captureBtn").addEventListener("click", () => {
  (async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    await chrome.windows.update(tab.windowId, { state: "fullscreen" });
    await new Promise((resolve) =>
      chrome.tabs.sendMessage(tab.id, { action: "capture-process" }, () =>
        resolve()
      )
    );
    await chrome.windows.update(tab.windowId, { state: "normal" });
  })();
});
