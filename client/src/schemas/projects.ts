export enum Status {
  Incomplete = "INCOMPLETE",
  Shooting = "SHOOTING",
  Editing = "EDITING",
  Feedback = "FEEDBACK",
  Completed = "COMPLETED",
}

export enum Type {
  Educational = "educational",
  Testimonial = "testimonial",
  Training = "training",
  Feedback = "feedback",
}

export type Project = {
  id: string;
  name: string;
  status: Status;
  type: Type;
  createdOn: Date;
  archived: boolean;
};
