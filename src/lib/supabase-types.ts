export interface Product {
  id: string;
  name: string;
  slug: string;
  size: string | null;
  weight: string | null;
  tag: string | null;
  description: string | null;
  image_url: string | null;
  images: string[];
  features: string[];
  colors: string[];
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string | null;
  selected_products: string[];
  clerk_user_id: string | null;
  status: "new" | "contacted" | "quoted" | "closed";
  created_at: string;
}

export interface AdminUser {
  id: string;
  clerk_user_id: string;
  role: "admin" | "super_admin";
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      products:    { Row: Product;   Insert: Omit<Product, "id" | "created_at" | "updated_at">; Update: Partial<Product> };
      enquiries:   { Row: Enquiry;   Insert: Omit<Enquiry, "id" | "created_at">;                Update: Partial<Enquiry> };
      admin_users: { Row: AdminUser; Insert: Omit<AdminUser, "id" | "created_at">;              Update: Partial<AdminUser> };
    };
  };
};
