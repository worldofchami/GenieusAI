export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chats: {
        Row: {
          chat: Json[] | null
          email: string
        }
        Insert: {
          chat?: Json[] | null
          email: string
        }
        Update: {
          chat?: Json[] | null
          email?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string | null
          email: string
          id: number
          message_time: string | null
          role: string
        }
        Insert: {
          content?: string | null
          email: string
          id?: number
          message_time?: string | null
          role: string
        }
        Update: {
          content?: string | null
          email?: string
          id?: number
          message_time?: string | null
          role?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string
          username: string
        }
        Insert: {
          email: string
          username: string
        }
        Update: {
          email?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_username_global: {
        Args: {
          old_username: string
          new_username: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
