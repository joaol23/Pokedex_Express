import { Controller } from "../Controller.js";
import { Exception } from "../../Exception/Exception.js";
import { Request, Response } from "express";

export class MemesTextController extends Controller {
  requireMain = ["meme_id"];
  constructor() {
    super();
  }

  getNamespace(): string {
    return "memes/";
  }

  async getTextMemes(req: Request, res: Response) {
    try {
      this.firtStepsController(req, "query");      
      const texts = await this.business.getData(true, "texts");
      const memeTexts = this.business.getDataByParameter('idImage', texts, this.data.meme_id)
      res.status(200).json({ data: memeTexts });
    } catch (err) {
      if (err instanceof Exception)
        throw new Exception(err.status, err.message, err.saveLog);
      else
        throw new Error(err)
    }
  }

  async insertMemeText(req: Request, res: Response) {
    try {
      this.setData(req.body);
      this.setRequireInsert();
      this.validateParams();
      const texts = await this.business.getData(true, "texts");
      this.data = await this.business.addIdToObject(this.data);
      const newTexts = this.business.addDataToArray(this.data, texts)
      await this.business.insertData(newTexts, true, "texts");
      res.status(200).json({ data: this.data });
    } catch (err) {
      if (err instanceof Exception)
        throw new Exception(err.status, err.message, err.saveLog);
      else
        throw new Error(err)
    }
  }

  setRequireInsert() {
    this.require = ["text", "idImage", "position", "color", "fontSize"]
  }
}
