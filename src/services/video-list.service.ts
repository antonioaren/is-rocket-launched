import axios, { AxiosResponse } from 'axios';
import { videoFrameX } from '../data/video';

interface videoInterface {
  getMetaDataVideo(): Promise<videoFrameX>;
  getUrlImageVideoByFrame(name: string, frameNumber: number): string;
}

class VideoList implements videoInterface {
  private URL_API: string = 'https://framex-dev.wadrid.net/api/video/?format';

  constructor() {}

  public async getMetaDataVideo(): Promise<videoFrameX> {
    const { data } = await axios.get(this.URL_API);
    return data[0] as videoFrameX;
  }

  public getUrlImageVideoByFrame(url: string, frameNumber: number): string {
    return `${this.queryParamsTakeOut(url)}frame/${frameNumber}/`;
  }

  private queryParamsTakeOut(url: string): string {
    const isQueryParamExist = url.includes('?');
    return isQueryParamExist ? url.split('?')[0] : url;
  }
}

export default new VideoList();
