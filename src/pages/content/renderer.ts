import { constants } from '../../../utils/constants';
import { openFloatingChat, pictureInPicture, skipVideoTime } from './actions';

export const renderLeftButtons = (): void => {
  const playerControls = document.querySelector(constants.classes.leftControls);
  const playPause = playerControls?.children[0] ?? null;
  const volume =
    playerControls?.children[playerControls?.children.length - 1] ?? null;

  // Create control elements
  const skipIconLeft = document.createElement('div');
  skipIconLeft.classList.add('ATT_Icon', 'skipPlayer', 'skipPlayer--left');
  const skipIconRight = document.createElement('div');
  skipIconRight.classList.add('ATT_Icon', 'skipPlayer', 'skipPlayer--right');
  const skipIconLeftImg = document.createElement('img');
  const skipIconRightImg = document.createElement('img');

  chrome.runtime.sendMessage(
    {
      message: constants.requests.svg.skip,
    },
    function (response) {
      skipIconLeftImg.src = response.url;
      skipIconRightImg.src = response.url;
      skipIconLeft.append(skipIconLeftImg);
      skipIconRight.append(skipIconRightImg);
      playerControls?.insertBefore(skipIconLeft, playPause);
      playerControls?.insertBefore(skipIconRight, volume);

      skipIconRight.addEventListener('click', () => skipVideoTime(10));
      skipIconLeft.addEventListener('click', () => skipVideoTime(-10));
    }
  );
};

export const renderRightButtons = (): void => {
  const rightControls = document.querySelector(constants.classes.rightControls);
  const secondButton =
    rightControls?.children[rightControls.children.length - 1] ?? null;

  // Create PIP control
  if (document.pictureInPictureEnabled) {
    const PIPButton = document.createElement('div');
    PIPButton.classList.add('ATT_Icon', 'pipButton');
    const PIPIcon = document.createElement('img');

    chrome.runtime.sendMessage(
      {
        message: constants.requests.svg.pip,
      },
      function (response) {
        PIPIcon.src = response.url;
        PIPButton.append(PIPIcon);
        rightControls?.insertBefore(PIPButton, secondButton);

        PIPButton.addEventListener('click', () => pictureInPicture());
      }
    );
  }
};

export const renderChatButtons = (): void => {
  const rightControls = document.querySelector(
    constants.classes.chatTopControls
  );

  // Create PIP control
  if (document.pictureInPictureEnabled) {
    const floatingChatBtn = document.createElement('div');
    floatingChatBtn.classList.add('ATT_Icon', 'floatingChatBtn');
    const floatingChatIcon = document.createElement('img');

    chrome.runtime.sendMessage(
      {
        message: constants.requests.svg.draggable,
      },
      function (response) {
        floatingChatIcon.src = response.url;
        floatingChatBtn.append(floatingChatIcon);
        rightControls?.append(floatingChatBtn);

        floatingChatBtn.addEventListener('click', () => openFloatingChat());
      }
    );
  }
};
