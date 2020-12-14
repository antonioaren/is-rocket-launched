class RocketModel {
  bisectionCalculateFrame(max: number, min: number) {
    return Math.round((max - min) / 2);
  }
}

export default new RocketModel();
