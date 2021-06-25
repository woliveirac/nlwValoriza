import {Request, Response} from "express";
import {ListTagsService} from "../services/tags/ListTagsService";

export class ListTagController {
    async handle(request: Request, response: Response) {
        const listTagService = new ListTagsService();

        const tags = await listTagService.execute();

        return response.json(tags);
    }
}