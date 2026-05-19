import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const useNewsletters = () => {
    return useQuery({
        queryKey: ["newsletters"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("newsletters")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data;
        },
    });
};

export const useCreateNewsletter = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (item: any) => {
            const { data, error } = await supabase.from("newsletters").insert(item).select();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["newsletters"] });
        },
    });
};

export const useUpdateNewsletter = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...item }: { id: string;[key: string]: any }) => {
            const { data, error } = await supabase.from("newsletters").update(item).eq("id", id).select();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["newsletters"] });
        },
    });
};

export const useDeleteNewsletter = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("newsletters").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["newsletters"] });
        },
    });
};
