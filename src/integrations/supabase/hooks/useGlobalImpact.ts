import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const useGlobalImpact = () => {
    return useQuery({
        queryKey: ["global_impact"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("global_impact")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data;
        },
    });
};

export const useCreateGlobalImpact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (item: any) => {
            const { data, error } = await supabase.from("global_impact").insert(item).select();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["global_impact"] });
        },
    });
};

export const useUpdateGlobalImpact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...item }: { id: string;[key: string]: any }) => {
            const { data, error } = await supabase.from("global_impact").update(item).eq("id", id).select();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["global_impact"] });
        },
    });
};

export const useDeleteGlobalImpact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("global_impact").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["global_impact"] });
        },
    });
};
