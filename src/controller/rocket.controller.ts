import { resolveSoa } from 'dns';
import { Request, Response } from 'express';
import { imageData } from '../data/image-data';
import rocketManager from '../manager/rocket.manager';

class RocketController {
  //TODO: Todas las funciones dependientes de esta clase.

  public async getRocketImage(req: Request, res: Response) {
    try {
      const dataImage: imageData = await rocketManager.getRocketImage();
      return res.status(200).json(dataImage);
    } catch (error) {
      return res.status(500).json(`Error getRocketImage: ${error}`);
    }
  }

  public async getNextImage(req: Request, res: Response) {
    const imgData: imageData = req.body;
    try {
      const imgDataResult: imageData = await rocketManager.getNextImage(imgData);
      return res.status(200).json(imgDataResult);
    } catch (error) {
      return res.status(500).json(`Error getNextImage: ${error}`);
    }
  }
}

export default new RocketController();
