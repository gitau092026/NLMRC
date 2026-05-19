import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const useTeamMembers = () => {
    return useQuery({
        queryKey: ["team_members"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("team_members")
                .select("*")
                .order("order_index", { ascending: true });

            if (error) throw error;
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useCreateTeamMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (member: any) => {
            const { data, error } = await supabase.from("team_members").insert(member).select();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["team_members"] });
        },
    });
};

export const useUpdateTeamMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...member }: { id: string;[key: string]: any }) => {
            const { data, error } = await supabase.from("team_members").update(member).eq("id", id).select();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["team_members"] });
        },
    });
};

export const useDeleteTeamMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("team_members").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["team_members"] });
        },
    });
};
