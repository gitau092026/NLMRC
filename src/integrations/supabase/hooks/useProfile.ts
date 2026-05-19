import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                return null;
            }

            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            if (error) {
                console.error("useProfile: Error fetching profile:", error);
                throw error;
            }

            return data;
        },
    });
};
