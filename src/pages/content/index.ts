import { constants } from '../../../utils/constants';
import {
  renderChatButtons,
  renderLeftButtons,
  renderRightButtons,
} from './renderer';

window.addEventListener('load', myMain, false);

let VIDEO_PLAYER: Element;

function myMain() {
  setInterval(checkForPlayer, 100);

  function checkForPlayer() {
    VIDEO_PLAYER = document.querySelector(
      constants.classes.videoContainer
    ) as HTMLMediaElement;

    if (VIDEO_PLAYER && !VIDEO_PLAYER.classList.contains('att-loaded')) {
      VIDEO_PLAYER.classList.add('att-loaded');
      const isLive = !!document.querySelector(constants.classes.liveTag);

      if (!isLive) {
        renderLeftButtons();
      }
      renderChatButtons();
      renderRightButtons();
    }
  }
}
