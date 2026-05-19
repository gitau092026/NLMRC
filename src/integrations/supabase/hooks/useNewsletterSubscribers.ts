import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const useNewsletterSubscribers = () => {
    return useQuery({
        queryKey: ["newsletter_subscribers"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("newsletter_subscribers")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data;
        },
    });
};

export const useCreateSubscriber = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (email: string) => {
            const { data, error } = await supabase
                .from("newsletter_subscribers")
                .insert([{ email }])
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["newsletter_subscribers"] });
        },
    });
};

export const useUpdateSubscriber = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, email }: { id: string; email: string }) => {
            const { data, error } = await supabase
                .from("newsletter_subscribers")
                .update({ email })
                .eq("id", id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["newsletter_subscribers"] });
        },
    });
};

export const useDeleteSubscriber = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from("newsletter_subscribers")
                .delete()
                .eq("id", id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["newsletter_subscribers"] });
        },
    });
};
