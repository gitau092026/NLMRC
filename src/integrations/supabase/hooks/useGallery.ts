import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const useGallery = () => {
    return useQuery({
        queryKey: ["gallery_images"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("gallery_images")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data;
        },
    });
};

export const useCreateGalleryImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (image: any) => {
            const { data, error } = await supabase.from("gallery_images").insert(image).select();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gallery_images"] });
        },
    });
};

export const useUpdateGalleryImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...image }: { id: string;[key: string]: any }) => {
            const { data, error } = await supabase.from("gallery_images").update(image).eq("id", id).select();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gallery_images"] });
        },
    });
};

export const uploadGalleryImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

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

export const useDeleteGalleryImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("gallery_images").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gallery_images"] });
        },
    });
};
