export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "14.1"
    }
    public: {
        Tables: {
            events: {
                Row: {
                    created_at: string
                    description: string
                    event_number: number
                    id: string
                    image_url: string
                    stats: Json | null
                    title: string
                    updated_at: string
                }
                Insert: {
                    created_at?: string
                    description: string
                    event_number: number
                    id?: string
                    image_url: string
                    stats?: Json | null
                    title: string
                    updated_at?: string
                }
                Update: {
                    created_at?: string
                    description?: string
                    event_number?: number
                    id?: string
                    image_url?: string
                    stats?: Json | null
                    title?: string
                    updated_at?: string
                }
                Relationships: []
            }
            gallery_images: {
                Row: {
                    caption: string | null
                    category: string | null
                    created_at: string | null
                    id: string
                    image_url: string
                    title: string | null
                }
                Insert: {
                    caption?: string | null
                    category?: string | null
                    created_at?: string | null
                    id?: string
                    image_url: string
                    title?: string | null
                }
                Update: {
                    caption?: string | null
                    category?: string | null
                    created_at?: string | null
                    id?: string
                    image_url?: string
                    title?: string | null
                }
                Relationships: []
            }
            global_impact: {
                Row: {
                    country: string
                    created_at: string
                    description: string
                    id: string
                    image_url: string | null
                    lat: number
                    lng: number
                    stats: Json | null
                    title: string
                    updated_at: string
                }
                Insert: {
                    country: string
                    created_at?: string
                    description: string
                    id?: string
                    image_url?: string | null
                    lat: number
                    lng: number
                    stats?: Json | null
                    title: string
                    updated_at?: string
                }
                Update: {
                    country?: string
                    created_at?: string
                    description?: string
                    id?: string
                    image_url?: string | null
                    lat?: number
                    lng?: number
                    stats?: Json | null
                    title?: string
                    updated_at?: string
                }
                Relationships: []
            }
            hero_images: {
                Row: {
                    id: string
                    image_url: string
                    order_index: number | null
                    created_at: string
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    image_url: string
                    order_index?: number | null
                    created_at?: string
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    image_url?: string
                    order_index?: number | null
                    created_at?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            impact_report_image: {
                Row: {
                    id: string
                    image_url: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    image_url: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    image_url?: string
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
            job_postings: {
                Row: {
                    created_at: string
                    department: string
                    description: string
                    id: string
                    location: string
                    requirements: string[] | null
                    responsibilities: string[] | null
                    status: string
                    title: string
                    type: string
                    updated_at: string
                }
                Insert: {
                    created_at?: string
                    department: string
                    description: string
                    id?: string
                    location: string
                    requirements?: string[] | null
                    responsibilities?: string[] | null
                    status?: string
                    title: string
                    type: string
                    updated_at?: string
                }
                Update: {
                    created_at?: string
                    department?: string
                    description?: string
                    id?: string
                    location?: string
                    requirements?: string[] | null
                    responsibilities?: string[] | null
                    status?: string
                    title?: string
                    type?: string
                    updated_at?: string
                }
                Relationships: []
            }
            newsletter_subscribers: {
                Row: {
                    created_at: string | null
                    email: string
                    id: string
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    id?: string
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    id?: string
                }
                Relationships: []
            }
            newsletters: {
                Row: {
                    created_at: string
                    date_str: string | null
                    file_url: string
                    id: string
                    published_at: string
                    title: string
                    updated_at: string
                }
                Insert: {
                    created_at?: string
                    date_str?: string | null
                    file_url: string
                    id?: string
                    published_at?: string
                    title: string
                    updated_at?: string
                }
                Update: {
                    created_at?: string
                    date_str?: string | null
                    file_url?: string
                    id?: string
                    published_at?: string
                    title?: string
                    updated_at?: string
                }
                Relationships: []
            }
            profiles: {
                Row: {
                    created_at: string | null
                    email: string | null
                    id: string
                    role: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    email?: string | null
                    id: string
                    role?: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    email?: string | null
                    id?: string
                    role?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            reports: {
                Row: {
                    created_at: string
                    description: string | null
                    file_url: string
                    id: string
                    published_at: string
                    title: string
                    updated_at: string
                    year: string
                }
                Insert: {
                    created_at?: string
                    description?: string | null
                    file_url: string
                    id?: string
                    published_at?: string
                    title: string
                    updated_at?: string
                    year: string
                }
                Update: {
                    created_at?: string
                    description?: string | null
                    file_url?: string
                    id?: string
                    published_at?: string
                    title?: string
                    updated_at?: string
                    year?: string
                }
                Relationships: []
            }
            resources: {
                Row: {
                    category: string
                    created_at: string
                    description: string | null
                    file_url: string
                    id: string
                    title: string
                    updated_at: string
                }
                Insert: {
                    category: string
                    created_at?: string
                    description?: string | null
                    file_url: string
                    id?: string
                    title: string
                    updated_at?: string
                }
                Update: {
                    category?: string
                    created_at?: string
                    description?: string | null
                    file_url?: string
                    id?: string
                    title?: string
                    updated_at?: string
                }
                Relationships: []
            }
            social_feeds: {
                Row: {
                    author_name: string
                    content: string
                    created_at: string
                    id: string
                    likes: number | null
                    platform: string
                    posted_at: string
                    shares: number | null
                }
                Insert: {
                    author_name: string
                    content: string
                    created_at?: string
                    id?: string
                    likes?: number | null
                    platform: string
                    posted_at: string
                    shares?: number | null
                }
                Update: {
                    author_name?: string
                    content?: string
                    created_at?: string
                    id?: string
                    likes?: number | null
                    platform?: string
                    posted_at?: string
                    shares?: number | null
                }
                Relationships: []
            }
            stories: {
                Row: {
                    id: string
                    name: string
                    category: string | null
                    image_url: string
                    story: string | null
                    full_story: string | null
                    date_str: string | null
                    type: string | null
                    video_url: string | null
                    video_platform: string | null
                    additional_images: Json | null
                    created_at: string
                    updated_at: string
                    // Add legacy fields as optional to prevent TS errors in files not yet updated
                    title?: string | null
                    content?: string | null
                    excerpt?: string | null
                    author?: string | null
                    published_at?: string | null
                    read_time_min?: number | null
                }
                Insert: {
                    id?: string
                    name: string
                    category?: string | null
                    image_url: string
                    story?: string | null
                    full_story?: string | null
                    date_str?: string | null
                    type?: string | null
                    video_url?: string | null
                    video_platform?: string | null
                    additional_images?: Json | null
                    created_at?: string
                    updated_at?: string
                    title?: string | null
                    content?: string | null
                    excerpt?: string | null
                    author?: string | null
                    published_at?: string | null
                    read_time_min?: number | null
                }
                Update: {
                    id?: string
                    name?: string
                    category?: string | null
                    image_url?: string
                    story?: string | null
                    full_story?: string | null
                    date_str?: string | null
                    type?: string | null
                    video_url?: string | null
                    video_platform?: string | null
                    additional_images?: Json | null
                    created_at?: string
                    updated_at?: string
                    title?: string | null
                    content?: string | null
                    excerpt?: string | null
                    author?: string | null
                    published_at?: string | null
                    read_time_min?: number | null
                }
                Relationships: []
            }
            team_members: {
                Row: {
                    bio: string
                    created_at: string
                    id: string
                    image_url: string
                    name: string
                    order_index: number
                    position: string
                    social_links: Json | null
                    updated_at: string
                }
                Insert: {
                    bio: string
                    created_at?: string
                    id?: string
                    image_url: string
                    name: string
                    order_index?: number
                    position: string
                    social_links?: Json | null
                    updated_at?: string
                }
                Update: {
                    bio?: string
                    created_at?: string
                    id?: string
                    image_url?: string
                    name?: string
                    order_index?: number
                    position?: string
                    social_links?: Json | null
                    updated_at?: string
                }
                Relationships: []
            }
            user_invites: {
                Row: {
                    created_at: string | null
                    email: string
                    role: string
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    role?: string
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    role?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: Exclude<keyof Database, "__InternalSupabase"> },
    TableName extends PublicTableNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: Exclude<keyof Database, "__InternalSupabase"> },
    TableName extends PublicTableNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: Exclude<keyof Database, "__InternalSupabase"> },
    TableName extends PublicTableNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: Exclude<keyof Database, "__InternalSupabase"> },
    EnumName extends PublicEnumNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: Exclude<keyof Database, "__InternalSupabase"> },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: Exclude<keyof Database, "__InternalSupabase">
    }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
