export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          color: string | null;
          id: number;
          name: string;
        };
        Insert: {
          color?: string | null;
          id?: never;
          name: string;
        };
        Update: {
          color?: string | null;
          id?: never;
          name?: string;
        };
        Relationships: [];
      };
      reports: {
        Row: {
          created_at: string | null;
          data: Json;
          description: string | null;
          id: number;
          name: string;
          report_date: string;
          report_type: string;
        };
        Insert: {
          created_at?: string | null;
          data: Json;
          description?: string | null;
          id?: never;
          name: string;
          report_date: string;
          report_type: string;
        };
        Update: {
          created_at?: string | null;
          data?: Json;
          description?: string | null;
          id?: never;
          name?: string;
          report_date?: string;
          report_type?: string;
        };
        Relationships: [];
      };
      transactions: {
        Row: {
          amount: number;
          category_id: number | null;
          date: string;
          description: string | null;
          id: number;
          type: string;
        };
        Insert: {
          amount: number;
          category_id?: number | null;
          date: string;
          description?: string | null;
          id?: never;
          type: string;
        };
        Update: {
          amount?: number;
          category_id?: number | null;
          date?: string;
          description?: string | null;
          id?: never;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_category";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      add_category:
        | {
            Args: {
              name_input: string;
            };
            Returns: {
              color: string | null;
              id: number;
              name: string;
            }[];
          }
        | {
            Args: {
              name_input: string;
              color_input: string;
            };
            Returns: {
              color: string | null;
              id: number;
              name: string;
            }[];
          };
      add_transaction: {
        Args: {
          amount_input: number;
          category_id_input: number;
          date_input: string;
          description_input: string;
          type_input: string;
        };
        Returns: Database["public"]["CompositeTypes"]["transaction_details"][];
      };
      delete_category: {
        Args: {
          id_input: number;
        };
        Returns: boolean;
      };
      delete_transaction: {
        Args: {
          id_input: number;
        };
        Returns: {
          amount: number;
          category_id: number | null;
          date: string;
          description: string | null;
          id: number;
          type: string;
        };
      };
      get_expense_transactions: {
        Args: {
          start_date: string;
          end_date: string;
        };
        Returns: Database["public"]["CompositeTypes"]["transaction_details"][];
      };
      get_income_transactions: {
        Args: {
          start_date: string;
          end_date: string;
        };
        Returns: Database["public"]["CompositeTypes"]["transaction_details"][];
      };
      get_transaction_totals_by_month: {
        Args: {
          start_date: string;
          end_date: string;
        };
        Returns: {
          total_income: number;
          total_expense: number;
          balance: number;
        }[];
      };
      update_category:
        | {
            Args: {
              id_input: number;
              name_input: string;
            };
            Returns: {
              color: string | null;
              id: number;
              name: string;
            }[];
          }
        | {
            Args: {
              id_input: number;
              name_input: string;
              color_input: string;
            };
            Returns: {
              color: string | null;
              id: number;
              name: string;
            }[];
          };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      transaction_details: {
        id: number | null;
        date: string | null;
        description: string | null;
        amount: number | null;
        type: string | null;
        category_name: string | null;
        category_color: string | null;
      };
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
