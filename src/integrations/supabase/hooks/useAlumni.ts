import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const useAlumni = () => {
    return useQuery({
        queryKey: ["alumni"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("alumni")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data;
        },
    });
};

export const useAlum = (id: string) => {
    return useQuery({
        queryKey: ["alumni", id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("alumni")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;
            return data;
        },
        enabled: !!id,
    });
};

export const useCreateAlum = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (alum: any) => {
            const { data, error } = await supabase.from("alumni").insert(alum).select();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["alumni"] });
        },
    });
};

export const useUpdateAlum = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...alum }: { id: string;[key: string]: any }) => {
            const { data, error } = await supabase.from("alumni").update(alum).eq("id", id).select();
            if (error) throw error;
            return data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["alumni"] });
            queryClient.invalidateQueries({ queryKey: ["alumni", variables.id] });
        },
    });
};

export const useDeleteAlum = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("alumni").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["alumni"] });
        },
    });
};
