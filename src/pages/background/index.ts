chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'SVG: skip') {
    sendResponse({ url: chrome.runtime.getURL('skip.svg') });
  } else if (request.message === 'SVG: pip') {
    sendResponse({ url: chrome.runtime.getURL('pip.svg') });
  } else if (request.message === 'SVG: draggable') {
    sendResponse({ url: chrome.runtime.getURL('draggable.svg') });
  }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(() => {
  chrome.tabs.query({ active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0]?.id as number, {
      action: 'refresh_content-script',
    });
  });
});
