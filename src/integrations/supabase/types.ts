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
      art_pieces: {
        Row: {
          after_image_url: string | null
          auction_end_date: string | null
          before_image_url: string | null
          created_at: string
          description: string | null
          drop_date: string | null
          episode_id: string | null
          giveaway_end_date: string | null
          id: string
          is_featured: boolean | null
          materials: string[] | null
          price: number | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          after_image_url?: string | null
          auction_end_date?: string | null
          before_image_url?: string | null
          created_at?: string
          description?: string | null
          drop_date?: string | null
          episode_id?: string | null
          giveaway_end_date?: string | null
          id?: string
          is_featured?: boolean | null
          materials?: string[] | null
          price?: number | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          after_image_url?: string | null
          auction_end_date?: string | null
          before_image_url?: string | null
          created_at?: string
          description?: string | null
          drop_date?: string | null
          episode_id?: string | null
          giveaway_end_date?: string | null
          id?: string
          is_featured?: boolean | null
          materials?: string[] | null
          price?: number | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "art_pieces_episode_id_fkey"
            columns: ["episode_id"]
            isOneToOne: false
            referencedRelation: "episodes"
            referencedColumns: ["id"]
          },
        ]
      }
      community_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          image_url: string | null
          is_approved: boolean | null
          location: string
          name: string
          note: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          image_url?: string | null
          is_approved?: boolean | null
          location: string
          name: string
          note?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          image_url?: string | null
          is_approved?: boolean | null
          location?: string
          name?: string
          note?: string | null
        }
        Relationships: []
      }
      community_suggestions: {
        Row: {
          created_at: string
          id: string
          name: string
          suggestion: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          suggestion: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          suggestion?: string
        }
        Relationships: []
      }
      content_calendar: {
        Row: {
          created_at: string
          description: string | null
          event_type: string
          id: string
          is_published: boolean | null
          linked_art_piece_id: string | null
          linked_episode_id: string | null
          scheduled_at: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_type: string
          id?: string
          is_published?: boolean | null
          linked_art_piece_id?: string | null
          linked_episode_id?: string | null
          scheduled_at: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_type?: string
          id?: string
          is_published?: boolean | null
          linked_art_piece_id?: string | null
          linked_episode_id?: string | null
          scheduled_at?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_calendar_linked_art_piece_id_fkey"
            columns: ["linked_art_piece_id"]
            isOneToOne: false
            referencedRelation: "art_pieces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_calendar_linked_episode_id_fkey"
            columns: ["linked_episode_id"]
            isOneToOne: false
            referencedRelation: "episodes"
            referencedColumns: ["id"]
          },
        ]
      }
      drop_entries: {
        Row: {
          art_piece_id: string
          created_at: string
          email: string
          entry_type: string
          first_name: string
          id: string
        }
        Insert: {
          art_piece_id: string
          created_at?: string
          email: string
          entry_type: string
          first_name: string
          id?: string
        }
        Update: {
          art_piece_id?: string
          created_at?: string
          email?: string
          entry_type?: string
          first_name?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "drop_entries_art_piece_id_fkey"
            columns: ["art_piece_id"]
            isOneToOne: false
            referencedRelation: "art_pieces"
            referencedColumns: ["id"]
          },
        ]
      }
      episodes: {
        Row: {
          after_image_url: string | null
          before_image_url: string | null
          category: string
          created_at: string
          description: string | null
          episode_number: number | null
          id: string
          is_featured: boolean | null
          published_at: string | null
          purchase_price: string | null
          slug: string
          thrift_store_location: string | null
          thumbnail_url: string | null
          title: string
          transformation_summary: string | null
          updated_at: string
          views: number | null
          youtube_id: string | null
        }
        Insert: {
          after_image_url?: string | null
          before_image_url?: string | null
          category?: string
          created_at?: string
          description?: string | null
          episode_number?: number | null
          id?: string
          is_featured?: boolean | null
          published_at?: string | null
          purchase_price?: string | null
          slug: string
          thrift_store_location?: string | null
          thumbnail_url?: string | null
          title: string
          transformation_summary?: string | null
          updated_at?: string
          views?: number | null
          youtube_id?: string | null
        }
        Update: {
          after_image_url?: string | null
          before_image_url?: string | null
          category?: string
          created_at?: string
          description?: string | null
          episode_number?: number | null
          id?: string
          is_featured?: boolean | null
          published_at?: string | null
          purchase_price?: string | null
          slug?: string
          thrift_store_location?: string | null
          thumbnail_url?: string | null
          title?: string
          transformation_summary?: string | null
          updated_at?: string
          views?: number | null
          youtube_id?: string | null
        }
        Relationships: []
      }
      short_clips: {
        Row: {
          caption: string | null
          category: string
          created_at: string
          episode_id: string | null
          id: string
          thumbnail_url: string | null
          youtube_id: string
        }
        Insert: {
          caption?: string | null
          category?: string
          created_at?: string
          episode_id?: string | null
          id?: string
          thumbnail_url?: string | null
          youtube_id: string
        }
        Update: {
          caption?: string | null
          category?: string
          created_at?: string
          episode_id?: string | null
          id?: string
          thumbnail_url?: string | null
          youtube_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "short_clips_episode_id_fkey"
            columns: ["episode_id"]
            isOneToOne: false
            referencedRelation: "episodes"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          image_url: string | null
          is_approved: boolean
          location: string
          name: string
          notes: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          image_url?: string | null
          is_approved?: boolean
          location: string
          name: string
          notes?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          image_url?: string | null
          is_approved?: boolean
          location?: string
          name?: string
          notes?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      thrift_finds: {
        Row: {
          caption: string
          created_at: string
          id: string
          image_url: string
          is_active: boolean | null
          location: string | null
          price: string | null
          votes_leave: number | null
          votes_transform: number | null
        }
        Insert: {
          caption: string
          created_at?: string
          id?: string
          image_url: string
          is_active?: boolean | null
          location?: string | null
          price?: string | null
          votes_leave?: number | null
          votes_transform?: number | null
        }
        Update: {
          caption?: string
          created_at?: string
          id?: string
          image_url?: string
          is_active?: boolean | null
          location?: string | null
          price?: string | null
          votes_leave?: number | null
          votes_transform?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_active: boolean
          item_name: string
          votes: number
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          is_active?: boolean
          item_name: string
          votes?: number
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_active?: boolean
          item_name?: string
          votes?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
