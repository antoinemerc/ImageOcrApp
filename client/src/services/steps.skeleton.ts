
export interface StepSkeletonItem {
  id: number,
  title: string,
  description: string
}

export const stepsSkeleton: StepSkeletonItem[] = [
  // this double id business between which step is active and how the index of the stepsSkeleton is used to render
  // I dont like it...
  {
    id: 0,
    title: 'Image selection',
    description: 'Select images to send to google vision for annotation'
  },
  {
    id: 1,
    title: 'Text recognition',
    description: 'Results of the api, rough translation and possibility of extraction as is on excel'
  },

]

