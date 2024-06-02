export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            Account: {
                Row: {
                    access_token: string | null
                    expires_at: number | null
                    id: string
                    id_token: string | null
                    provider: string
                    providerAccountId: string
                    refresh_token: string | null
                    scope: string | null
                    session_state: string | null
                    token_type: string | null
                    type: string
                    userId: string
                }
                Insert: {
                    access_token?: string | null
                    expires_at?: number | null
                    id: string
                    id_token?: string | null
                    provider: string
                    providerAccountId: string
                    refresh_token?: string | null
                    scope?: string | null
                    session_state?: string | null
                    token_type?: string | null
                    type: string
                    userId: string
                }
                Update: {
                    access_token?: string | null
                    expires_at?: number | null
                    id?: string
                    id_token?: string | null
                    provider?: string
                    providerAccountId?: string
                    refresh_token?: string | null
                    scope?: string | null
                    session_state?: string | null
                    token_type?: string | null
                    type?: string
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "Account_userId_fkey"
                        columns: ["userId"]
                        isOneToOne: false
                        referencedRelation: "User"
                        referencedColumns: ["id"]
                    },
                ]
            }
            Post: {
                Row: {
                    createdAt: string
                    createdById: string
                    id: number
                    name: string
                    updatedAt: string
                }
                Insert: {
                    createdAt?: string
                    createdById: string
                    id?: number
                    name: string
                    updatedAt: string
                }
                Update: {
                    createdAt?: string
                    createdById?: string
                    id?: number
                    name?: string
                    updatedAt?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "Post_createdById_fkey"
                        columns: ["createdById"]
                        isOneToOne: false
                        referencedRelation: "User"
                        referencedColumns: ["id"]
                    },
                ]
            }
            Session: {
                Row: {
                    expires: string
                    id: string
                    sessionToken: string
                    userId: string
                }
                Insert: {
                    expires: string
                    id: string
                    sessionToken: string
                    userId: string
                }
                Update: {
                    expires?: string
                    id?: string
                    sessionToken?: string
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "Session_userId_fkey"
                        columns: ["userId"]
                        isOneToOne: false
                        referencedRelation: "User"
                        referencedColumns: ["id"]
                    },
                ]
            }
            User: {
                Row: {
                    email: string | null
                    emailVerified: string | null
                    id: string
                    image: string | null
                    name: string | null
                }
                Insert: {
                    email?: string | null
                    emailVerified?: string | null
                    id: string
                    image?: string | null
                    name?: string | null
                }
                Update: {
                    email?: string | null
                    emailVerified?: string | null
                    id?: string
                    image?: string | null
                    name?: string | null
                }
                Relationships: []
            }
            VerificationToken: {
                Row: {
                    expires: string
                    identifier: string
                    token: string
                }
                Insert: {
                    expires: string
                    identifier: string
                    token: string
                }
                Update: {
                    expires?: string
                    identifier?: string
                    token?: string
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
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
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
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
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
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
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
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
