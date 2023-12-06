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
  createdAt: string;
  tickets: string[]; // Assuming you store ticket ObjectId strings
  artists: string[]; // Assuming you store artist ObjectId strings
  likes: string[]; // Assuming you store user ObjectId strings for likes
  followers: string[]; // Assuming you store user ObjectId strings for followers
  views: number;
}
