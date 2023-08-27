const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("BG", message, sender);

  if (message.action === "capture") {
    (async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      try {
        const images = [];
        while (true) {
          const screenshot = await chrome.tabs.captureVisibleTab({
            format: "png",
          });
          images.push(screenshot);
          const result = await chrome.tabs.sendMessage(tab.id, {
            action: "clickNextImageIfExists",
          });
          if (!result) {
            break;
          }
          await wait(500);
        }
        console.log("end");
        console.log(images);
        sendResponse(images);
        chrome.action.setBadgeText({
          text: "END",
        });
      } catch (err) {
        console.error(err);
        chrome.action.setBadgeText({
          text: "ERROR",
        });
      }
    })();
  }
  return true;
});
/*

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "takeScreenshot") {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      chrome.runtime.sendMessage({ action: "downloadScreenshot", dataUrl });
    });
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "downloadScreenshot") {
    const dataUrl = message.dataUrl;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "screenshot.png";
    link.click();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("SENDER", sender);
  if (message.action === "capture") {
    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id },
        function: () => {
          chrome.runtime.sendMessage({ action: "takeScreenshot" });
        },
      },
      (results) => {
        const dataUrl = results[0].result;
        chrome.runtime.sendMessage({ action: "downloadScreenshot", dataUrl });
      }
    );
  }
});
*/
