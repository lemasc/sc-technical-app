chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("CONTENT", message, sender);
  if (message.action === "capture-process") {
    captureProcess().then(() => sendResponse(true));
  }
  if (message.action === "clickNextImageIfExists") {
    sendResponse(clickNextImageIfExists());
  }
  return true;
});

const captureProcess = async () => {
  try {
    const images = await chrome.runtime.sendMessage({ action: "capture" });
    console.log(images);
    // Check if global jsPDF instance is already defined
    console.log(typeof window.jsPDF);
    const link = document.createElement("a");
    const file = new Blob([JSON.stringify(images)], {
      type: "application/json",
    });
    link.href = URL.createObjectURL(file);
    link.download = `ImagesResults.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    return true;
  } catch (err) {
    console.error(err);
  }
};

function clickNextImageIfExists() {
  const nextButton = document.querySelector(
    "button[test-id='image-viewer-next-button']"
  );

  if (nextButton) {
    nextButton.click();
    return true;
  }
  return false;
}
