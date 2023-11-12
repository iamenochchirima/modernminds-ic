import { Principal } from "@dfinity/principal";

export interface Response {
  ok: any
  err: any
}

type Bool = boolean;
type Text = string;
type Int = number;

// User and UserBody
type User = {
  id: Principal;
  is_anonymous: Bool;
  user_body: UserBody | null;
  created_at: Int;
};

type UserBody = {
  first_name: Text;
  last_name: Text;
  email: Text;
  country: Text;
  gender: Text; 
  is_admin: Bool;
  is_verified: Bool;
  is_email_verified: Bool;
  is_staff: Bool;
  is_subscribed: Bool;
  is_newsletter_sub: Bool;
  is_active: Bool;
};

type Article = {
  id: Text;
  title: Text;
  author: Text;
  cover_image: Text;
  content: Section[];
  category: Text;
  slug: Text;
  is_editor_note: Bool;
  is_todays_pick: Bool;
  is_top_story: Bool;
  is_special: Bool;
  is_archived: Bool;
  issue: Text;
  status: Text;
  editor: Principal;
  created_at: Int;
};

type Section = {
  body: Text;
  image: SectionImage;
};

type SectionImage = {
  url: Text;
  caption: Text;
  credit: Text;
  is_left: Bool;
  is_center: Bool;
  is_right: Bool;
};

type Category = {
  id: Text;
  name: Text;
  cover_image: Text;
  slug: Text;
  is_active: Bool;
  created_at: Int;
};

enum Role {
  owner = "owner",
  admin = "admin",
  staff = "staff",
  authorized = "authorized",
}

enum Permission {
  assign_role = "assign_role",
  lowest = "lowest",
}
