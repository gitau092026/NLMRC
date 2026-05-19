import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const useSocialFeeds = () => {
    return useQuery({
        queryKey: ["social_feeds"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("social_feeds")
                .select("*")
                .order("created_at", { ascending: true }); // Removed is_active filter for admin

            if (error) throw error;
            return data;
        },
    });
};

export const useUpdateSocialFeed = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...feed }: { id: string;[key: string]: any }) => {
            const { data, error } = await supabase.from("social_feeds").update(feed).eq("id", id).select();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["social_feeds"] });
        },
    });
};
