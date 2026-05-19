import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const useImpactReport = () => {
    return useQuery({
        queryKey: ["impact_report_image"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("impact_report_image" as any)
                .select("*")
                .order("created_at", { ascending: false })
                .limit(1)
                .single();

            if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "The result contains 0 rows" which is fine initially
            return data as any;
        },
    });
};

export const useUpdateImpactReport = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (imageUrl: string) => {
            // First check if a record exists
            const { data: existing, error: fetchError } = await supabase
                .from("impact_report_image" as any)
                .select("id")
                .limit(1)
                .maybeSingle();

            if (fetchError) throw fetchError;
            const existingRecord = existing as any;

            if (fetchError) throw fetchError;

            if (existing) {
                // Update
                const { data, error } = await supabase
                    .from("impact_report_image" as any)
                    .update({ image_url: imageUrl, updated_at: new Date().toISOString() })
                    .eq("id", existingRecord.id)
                    .select()
                    .single();
                if (error) throw error;
                return data;
            } else {
                // Insert
                const { data, error } = await supabase
                    .from("impact_report_image" as any)
                    .insert({ image_url: imageUrl })
                    .select()
                    .single();
                if (error) throw error;
                return data;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["impact_report_image"] });
        },
    });
};

export const uploadImpactReportImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `impact_report_${Date.now()}.${fileExt}`;
    const filePath = `impact_reports/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, { upsert: true });

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

    return data.publicUrl;
};

export const useDeleteImpactReport = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from("impact_report_image" as any)
                .delete()
                .eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["impact_report_image"] });
        },
    });
};
