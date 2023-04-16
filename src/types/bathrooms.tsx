import { IReview } from './reviews';

export interface IBathroom {
  id: string;
  name: string,
  location: {
    type: string,
    coordinates: number[], // longitude, latitude
  };
  description: string,
  unisex: boolean;
  levels: string[];
  hasElevatorAccess: boolean;
  hasGrabBars: boolean;
  isSingleUse: boolean;
  buildingRampAccess: boolean;
  changingTable: boolean;
  accessibleDoor: boolean;
  hasMenstrualProducts: boolean;
  reviews: IReview[];
}