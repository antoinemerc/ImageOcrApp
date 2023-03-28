
export interface StepSkeletonItem {
  id: number,
  title: string,
  description: string
}

export enum ValidSteps { 
  IMAGE_SELECTION_STEP = 0,
  TEXT_ANNOTATION_STEP = 1
}

export const stepsSkeleton: StepSkeletonItem[] = [
  // this double id business between which step is active and how the index of the stepsSkeleton is used to render
  // I dont like it...
  {
    id: ValidSteps.IMAGE_SELECTION_STEP,
    title: 'Image selection',
    description: 'Select images to send to google vision for annotation'
  },
  {
    id: ValidSteps.TEXT_ANNOTATION_STEP,
    title: 'Text recognition',
    description: 'Results of the api, rough translation and possibility of extraction as is on excel'
  },

]

