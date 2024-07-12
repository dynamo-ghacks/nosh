export interface Review {
  id: string;
  title: string;
  body: string;
  tags: string[];
  user: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Destination {
  id: string;
  name: string;
  headline: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  tags: string[];
  isVerified: boolean;
  image: string | null;
  Review: Review[];
}
