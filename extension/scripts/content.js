let isCapturing = false;
let directoryHandle = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("CONTENT", message, sender);
  switch (message.action) {
    case "capture-process":
      isCapturing = true;
      captureProcess().then(() => {
        isCapturing = false;
        sendResponse(true);
      });
      break;
    case "clickNextImageIfExists":
      sendResponse(clickNextImageIfExists());
      break;
    case "saveImage":
      saveImage(message.image).then(() => sendResponse(true));
  }
  return true;
});

const saveImage = async (image) => {
  if (!directoryHandle) {
    return;
  }
  const fileHandle = await directoryHandle.getFileHandle(image.name, {
    create: true,
  });
  const writable = await fileHandle.createWritable();
  const blob = await fetch(image.url).then((r) => r.blob());
  await writable.write(blob);
  await writable.close();
};

const captureProcess = async () => {
  try {
    // Create a new button to pick the directory
    // Chrome doesn't allow to use the native file picker without user interaction
    const pickButton = document.createElement("button");
    pickButton.innerText = "Pick a directory";
    pickButton.style.position = "fixed";
    pickButton.style.top = "0";
    pickButton.style.right = "0";
    pickButton.style.zIndex = "99";
    pickButton.classList.add(
      "bg-blue-500",
      "text-white",
      "px-4",
      "py-2",
      "rounded-lg"
    );
    pickButton.onclick = async () => {
      directoryHandle = await window.showDirectoryPicker({
        mode: "readwrite",
      });
      pickButton.remove();
      chrome.runtime.sendMessage({ action: "capture" });
    };
    document.body.appendChild(pickButton);
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
