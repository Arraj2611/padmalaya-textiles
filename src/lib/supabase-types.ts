export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  size: string | null;
  weight: string | null;
  tag: string | null;
  image_url: string | null;
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
  phone: string | null;
  product_interest: string | null;
  message: string;
  status: "new" | "read" | "responded" | "archived";
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  role: "admin" | "super_admin";
  created_at: string;
}

export interface ProductView {
  id: string;
  product_id: string | null;
  viewed_at: string;
  user_agent: string | null;
  referrer: string | null;
}

/** Row shape returned from Supabase RPC / queries */
export type Database = {
  public: {
    Tables: {
      products:      { Row: Product;     Insert: Omit<Product, "id" | "created_at" | "updated_at">; Update: Partial<Product> };
      enquiries:     { Row: Enquiry;     Insert: Omit<Enquiry, "id" | "created_at">;                Update: Partial<Enquiry> };
      admin_users:   { Row: AdminUser;   Insert: Omit<AdminUser, "id" | "created_at">;              Update: Partial<AdminUser> };
      product_views: { Row: ProductView; Insert: Omit<ProductView, "id" | "viewed_at">;             Update: Partial<ProductView> };
    };
  };
};
