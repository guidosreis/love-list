import { Thing } from '../thing-section/thing.model';

export interface StoreData {
  things: Thing[];
}

export const INITIAL_STORE_DATA: StoreData = {
  things: []
};
