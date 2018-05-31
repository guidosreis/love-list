import { Thing } from '../thing-section/thing.model';

export interface ApplicationState {
  things: Thing[];
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  things: []
};
