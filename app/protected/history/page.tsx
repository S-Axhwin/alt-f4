// app/history/page.tsx
import { createClient as createServerComponentClient } from '@/utils/supabase/server';
import HistoryContent from './history-content';

export const dynamic = 'force-dynamic';

async function getHistoryData() {
    const supabase = await createServerComponentClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return { error: 'Not authenticated', data: [] };
    }

    const { data, error } = await supabase
        .from('images')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching history:', error);
        return { error: error.message, data: [] };
    }

    // Transform the data to match the client component's expected format
    const transformedData = data.map(item => {
        // Get the highest confidence detection
        const detections = item.result?.map((r: any) => ({
            name: r.Name,
            confidence: r.Confidence,
            parentName: r.ParentName,
            level: r.TaxonomyLevel
        })) || [];

        // Get unique detection names for display (only level 1 items)
        const uniqueDetections = Array.from(new Set(
            detections
                .filter((d: any) => d.level === 1)
                .map((d: any) => d.name)
        ));

        // Get the highest confidence score
        const maxConfidence = Math.max(
            ...detections.map((d: any) => d.confidence),
            0
        );

        return {
            id: item.id,
            imageUrl: item.url,
            timestamp: item.created_at,
            status: item.status || 'pending',
            detections: uniqueDetections,
            confidence: parseFloat(maxConfidence.toFixed(1)),
            fileName: item.url?.split('/').pop() || `Image ${item.id}`
        };
    });

    return { error: null, data: transformedData };
}

export default async function HistoryPage() {
    const { data, error } = await getHistoryData();

    if (error) {
        return (
            <div className="container py-8">
                <div className="text-center text-red-500">
                    Error loading history: {error}
                </div>
            </div>
        );
    }

    return <HistoryContent initialData={data} />;
}
