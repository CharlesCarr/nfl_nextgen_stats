import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

export interface TimelineFilter {
  timeline: string;
  dataFn: ActionCreatorWithoutPayload<string>;
}
