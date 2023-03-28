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
} as ImageStore);

function findImageIndexByIdInImageList(imageList: ImageProperty[], id: number): number {
  return imageList.findIndex((imageProperty: ImageProperty) => imageProperty.id === id);
}

export interface ErrorStructure { 
  id: number,
  title: string,
  message: string
}

export enum ErrorTypes { 
  MINIMUM_IMAGE_ERROR = 0,
}

// todo: move to separate ui-state store? dont like mixing image logic with ui logic
export interface ErrorStore { 
  activeError: ErrorStructure[];
  resetActiveError(): void;
  setMinimumImageError(): void;
}

export const errorStore: ErrorStore = reactive({
  activeError: [],
  resetActiveError(): void {
    this.activeError = [];
  },
  setMinimumImageError(): void {
    this.activeError.push({
      id: ErrorTypes.MINIMUM_IMAGE_ERROR,
      title: 'Minimum image required',
      message: 'At least one image must be selected to be annoted'
    });
  }
} as ErrorStore);

export interface WorkspaceStepStore { 
  activeStep: number;
  setStepById(stepId: number): void;
  goToNextStep(): void;
  goToPreviousStep(): void;
}

export const workspaceStepStore: WorkspaceStepStore = reactive({
  activeStep: 0,
  setStepById(id: number): void {
    this.activeStep = id;
  },
  goToNextStep(id: number): void {
    if (this.activeStep >= 1)
      return;
    this.activeStep += 1;
  },
  goToPreviousStep(id: number): void {
    if (this.activeStep <= 0)
      return;
    this.activeStep -= 1;
  },
} as WorkspaceStepStore);


