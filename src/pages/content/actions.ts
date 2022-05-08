import { constants } from '../../../utils/constants';

export const skipVideoTime = (time: number): void => {
  const player = document.querySelector(
    constants.classes.videoPlayer
  ) as HTMLVideoElement;

  player.currentTime = player.currentTime + time;
};

export const pictureInPicture = (): void => {
  const player = document.querySelector(
    constants.classes.videoPlayer
  ) as HTMLVideoElement;

  if (document.pictureInPictureElement !== null) {
    document.exitPictureInPicture();
  } else {
    player?.requestPictureInPicture();
  }
};

export const openFloatingChat = (): void => {
  const fullWidthDivs = [
    '.channel-root--hold-chat + .persistent-player',
    '.channel-root--watch-chat + .persistent-player',
    '.channel-root__info--with-chat .channel-info-content',
    '.channel-root__player--with-chat',
  ];

  fullWidthDivs.forEach((c: string) => {
    const playerWrapper = document.querySelector(c);
    playerWrapper?.classList.add('full-width');
  });

  const floatingColumn = document.querySelector(
    '.right-column.right-column--beside'
  )?.parentElement as HTMLElement;
  const floatingColumnHeader = document.querySelector(
    '.video-chat__header, .stream-chat-header'
  );

  floatingColumn?.classList.add('floating-column');

  // Add draggable events
  dragElement(floatingColumn, floatingColumnHeader as HTMLElement);

  // Add click listener to break floating chat
  const collapseChatBtn = document.querySelector(
    '.toggle-visibility__right-column'
  )?.children[0];
  const onCollapseClick = () => {
    closeFloatingChat(fullWidthDivs);
    // Remove width and height in case it was resized
    const channelRoot = document.querySelector('.channel-root__right-column');
    (channelRoot as HTMLElement)?.style.removeProperty('width');
    (channelRoot as HTMLElement)?.style.removeProperty('height');
    // RRemove listener for collapse button
    collapseChatBtn?.removeEventListener('click', onCollapseClick);
  };
  collapseChatBtn?.addEventListener('click', onCollapseClick);
};

const closeFloatingChat = (fullWidthDivs: string[]): void => {
  fullWidthDivs.forEach((c: string) => {
    const playerWrapper = document.querySelector(c);
    playerWrapper?.classList.remove('full-width');
  });

  document
    .querySelector('.floating-column')
    ?.classList.remove('floating-column');
};

const dragElement = (elmnt: HTMLElement, draggableElmnt: HTMLElement): void => {
  let [pos1, pos2, pos3, pos4] = [0, 0, 0, 0];

  const dragMouseDown = (e: MouseEvent) => {
    draggableElmnt.style.cursor = 'grabbing';
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  };

  const elementDrag = (e: MouseEvent) => {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
    elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
  };

  const closeDragElement = () => {
    draggableElmnt.style.cursor = 'grab';
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  };

  draggableElmnt.onmousedown = dragMouseDown;
};
