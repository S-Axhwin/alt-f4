// app/history/history-content.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';
// ... (keep your existing imports)

const HistoryContent = ({ initialData }: any) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Filter the data based on search, date, and status
    const filteredItems = useMemo(() => {
        return initialData.filter((item: any) => {
            const matchesSearch = item.fileName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
            const matchesDate = !selectedDate

            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [initialData, searchQuery, statusFilter, selectedDate]);

    // ... (keep your existing StatusBadge component)

    return (
        <div className="container py-8">
            {/* ... (keep your existing header and search/filter controls) */}

            {/* History Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item: any) => (
                    <Card key={item.id} className="overflow-hidden">
                        <div className="aspect-video relative">
                            <img
                                src={item.detections.length == 0 ? `https://image-reco.s3.ap-southeast-2.amazonaws.com/${item.imageUrl}` : "https://cdn.pixabay.com/photo/2016/10/09/17/28/censored-1726364_1280.jpg"}
                                alt={`History item ${item.id}`}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-semibold">{item.fileName}</CardTitle>
                                {/* <StatusBadge status={item.status} /> */}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Analyzed on:</span>
                                    {/* <span>{new Date(item.timestamp).toLocaleString()}</span> */}
                                </div>
                                {item.detections.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {item.detections.map((detection: any, idx: any) => (
                                            <Badge key={idx} variant="outline">
                                                {detection}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Confidence:</span>
                                    <span>{item.confidence}%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
                <Card className="p-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <Filter className="w-12 h-12 text-muted-foreground" />
                        <h3 className="text-lg font-semibold">No Results Found</h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default HistoryContent;
