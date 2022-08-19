import { CanvasCoordinate } from "./CanvasCoordinate";

export class ImageProperty {
  id: number;
  file: File;
  selected: boolean = false;
  processed: boolean = false;
  selectedAreas: { cooTL: CanvasCoordinate, cooBR: CanvasCoordinate }[] = [];

  constructor(object?: any) {
    Object.assign(this, object);
  }
}