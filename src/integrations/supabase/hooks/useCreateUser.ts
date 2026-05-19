import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const useCreateUserWithPassword = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ email, password, role }: { email: string; password: string; role: string }) => {
            const { data, error } = await supabase.rpc('create_user_with_password', {
                email,
                password,
                role_name: role
            });

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};
