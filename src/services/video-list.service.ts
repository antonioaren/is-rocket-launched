import axios, { AxiosResponse } from 'axios';
import { videoFrameX } from '../data/video';

interface videoInterface {
  getMetaDataVideo(): Promise<videoFrameX>;
  getImageVideoByFrame(name: string, frameNumber: number): Promise<any>;
}

class VideoList implements videoInterface {
  private URL_API: string = 'https://framex-dev.wadrid.net/api/video/?format';

  constructor() {}

  public async getMetaDataVideo(): Promise<videoFrameX> {
    const { data } = await axios.get(this.URL_API);
    return data[0] as videoFrameX;
  }

  public async getImageVideoByFrame(url: string, frameNumber: number): Promise<any> {
    const { data } = await axios.get(`${this.queryParamsTakeOut(url)}/frame/${frameNumber}/`);
    return data;
  }

  private queryParamsTakeOut(url: string): string {
    const isQueryParamExist = url.includes('?');
    return isQueryParamExist ? url.split('?')[0] : url;
  }
}

export default new VideoList();
