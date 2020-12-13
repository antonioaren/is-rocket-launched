import { imageData } from '../../../data/image-data';
import { videoFrameX } from '../../../data/video';
import videoListService from '../../../services/video-list.service';
import rocketModel from '../model/rocket.model';

class RocketManager {
  public async getRocketImage(): Promise<imageData> {
    const metaVideo: videoFrameX = await videoListService.getMetaDataVideo();
    const bisectFrame: number = rocketModel.bisectionCalculateFrame(metaVideo.frames, 0);
    const urlImage: string = videoListService.getUrlImageVideoByFrame(metaVideo.url, bisectFrame);
    return {
      urlImage,
      max: metaVideo.frames,
      min: 0,
      timeAsked: 0,
      currentFrame: bisectFrame,
      url: metaVideo.url,
    };
  }

  public async getNextImage(imgData: imageData) {
    const dataCopy: imageData = JSON.parse(JSON.stringify(imgData));
    if (!imgData.isRocketLaunched) {
      dataCopy.min = imgData.currentFrame;
      dataCopy.max = imgData.max;
      dataCopy.currentFrame = rocketModel.bisectionCalculateFrame(imgData.max, imgData.currentFrame) + imgData.currentFrame;
    } else {
      dataCopy.min = imgData.min;
      dataCopy.max = imgData.currentFrame;
      dataCopy.currentFrame = rocketModel.bisectionCalculateFrame(imgData.currentFrame, imgData.min) + imgData.min;
    }
    dataCopy.urlImage = videoListService.getUrlImageVideoByFrame(dataCopy.url, dataCopy.currentFrame);
    dataCopy.timeAsked = ++dataCopy.timeAsked;

    return dataCopy;
  }
}

export default new RocketManager();
