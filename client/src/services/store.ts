import { reactive } from 'vue'
import { CanvasCoordinate } from '../models/CanvasCoordinate';
import { ImageProperty } from '../models/ImageProperty';

export interface ImageStore {
  imageList: ImageProperty[];

  addBulkImage(imagePropertyList: ImageProperty[]): void;
  addImage(imageProperty: ImageProperty): number;
  deleteImageById(id: number): void;
  setImageSelected(id: number, selectedStatus: boolean): void;
  setImageProcessed(id: number, processedStatus: boolean): void;
  setImageSelectedAreas(id: number, selectedAreas: { cooTL: CanvasCoordinate, cooBR: CanvasCoordinate }[]): void;
}

export const imageStore: ImageStore = reactive({
  imageList: [],
  addBulkImage(imagePropertyList: ImageProperty[]): number {
    return this.imageList.push(...imagePropertyList);
  },
  addImage(imageProperty: ImageProperty): number {
    return this.imageList.push(imageProperty);
  },
  setImageSelected(id: number, selectedStatus: boolean): void {
    const imageIndex = findImageIndexByIdInImageList(this.imageList, id);
    this.imageList[imageIndex].selected = selectedStatus;
  },
  setImageProcessed(id: number, processedStatus: boolean): void {
    const imageIndex = findImageIndexByIdInImageList(this.imageList, id);
    this.imageList[imageIndex].processed = processedStatus;
  },
  setImageSelectedAreas(id: number, selectedAreas: { cooTL: CanvasCoordinate, cooBR: CanvasCoordinate }[]): void {
    const imageIndex = findImageIndexByIdInImageList(this.imageList, id);
    this.imageList[imageIndex].selectedAreas = selectedAreas;
  },
  deleteImageById(id: number): void {
    const imageIndex = findImageIndexByIdInImageList(this.imageList, id);
    this.imageList.splice(imageIndex, 1);
  }
} as ImageStore)

function findImageIndexByIdInImageList(imageList: ImageProperty[], id: number): number {
  return imageList.findIndex((imageProperty: ImageProperty) => imageProperty.id === id);
}
