import { notFound } from 'next/navigation'
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AnalysisResult {
    Confidence: number
    Name: string
    ParentName: string
    TaxonomyLevel: number
}

async function getImageAnalysis(id: string): Promise<AnalysisResult[]> {
    try {
        const res = await axios.get(`http://127.0.0.1:5000/check?image_name=${id}`)
        return res.data
    } catch (error) {
        console.error("Error fetching image analysis:", error)
        throw new Error("Failed to fetch image analysis")
    }
}

export default async function ImageAnalysisPage({ params }: { params: { id: string } }) {
    let analysisResults: AnalysisResult[]

    try {
        analysisResults = await getImageAnalysis(params.id)
    } catch (error) {
        notFound()
    }

    const topLevelResults = analysisResults.filter(result => result.TaxonomyLevel === 1)

    return (
        <div className="container mx-auto p-4">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Image Analysis Results</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Image ID</AlertTitle>
                            <AlertDescription>{params.id}</AlertDescription>
                        </Alert>

                        {topLevelResults.map((result, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center justify-between">
                                        {result.Name}
                                        <Badge variant="secondary">
                                            {result.Confidence.toFixed(2)}%
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc pl-5 space-y-2">
                                        {analysisResults
                                            .filter(subResult => subResult.ParentName === result.Name)
                                            .map((subResult, subIndex) => (
                                                <li key={subIndex} className="flex items-center justify-between">
                                                    <span>{subResult.Name}</span>
                                                    <Badge variant="outline">
                                                        {subResult.Confidence.toFixed(2)}%
                                                    </Badge>
                                                </li>
                                            ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
