
export interface SocialPosts {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface PromotionPlan {
  titles: string[];
  description: string;
  hashtags: string[];
  socialPosts: SocialPosts;
}
