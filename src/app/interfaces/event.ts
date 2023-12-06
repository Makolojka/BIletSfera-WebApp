import {Ticket} from "./ticket";

export interface Event {
  title: string;
  image: string;
  text: string;
  additionalText: string;
  organiser: string;
  date: string;
  location: string;
  category: string[];
  subCategory: string[];
  tickets: Ticket[];
  artists: string[];
  likes: string[];
  followers: string[];
  views: number;
}
