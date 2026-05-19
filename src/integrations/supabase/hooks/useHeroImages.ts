import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const useHeroImages = () => {
    return useQuery({
        queryKey: ["hero_images"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("hero_images")
                .select("*")
                .order("order_index", { ascending: true })
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data;
        },
    });
};

export const useCreateHeroImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (image: any) => {
            const { data, error } = await supabase.from("hero_images").insert(image).select();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["hero_images"] });
        },
    });
};

export const useUpdateHeroImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...image }: { id: string;[key: string]: any }) => {
            const { data, error } = await supabase.from("hero_images").update(image).eq("id", id).select();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["hero_images"] });
        },
    });
};

export const uploadHeroImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `hero/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

    return data.publicUrl;
};

export const useDeleteHeroImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("hero_images").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["hero_images"] });
        },
    });
};
