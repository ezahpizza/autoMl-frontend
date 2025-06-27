import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import EdaHistoryTable from './EdaHistoryTable';
import EdaReportCard from './EdaReportCard';
import { AlertCircle, BarChart3, History } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEdaReports } from '@/hooks/useEdaReports';
import { motion } from 'framer-motion';


const EdaTabs = () => {
    const { data: reportsData, isLoading: reportsLoading, error: reportsError } = useEdaReports();
    const reports = reportsData?.reports || [];

    return (
        <div className="flex justify-center">
            <Tabs defaultValue="reports" className="w-full md:w-[70%]">
                <TabsList className="grid w-full h-[25%] grid-cols-2 bg-white px-6">
                    <TabsTrigger 
                        value="reports" 
                        className="text-md h-[80%] font-fira-code data-[state=active]:bg-rose-pink data-[state=active]:text-white"
                    >
                        <BarChart3 className="h-4 w-4 mr-2" />
                    Reports ({reports.length})
                    </TabsTrigger>
                    <TabsTrigger 
                        value="history"
                        className="text-md h-[80%] font-fira-code data-[state=active]:bg-rose-pink data-[state=active]:text-white"
                    >
                        <History className="h-4 w-4 mr-2" />
                        History
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="reports" className="space-y-6">
                    {reportsLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <Card key={i} className="animate-pulse">
                                <CardContent className="p-6">
                                    <div className="h-4 bg-persian-indigo/20 rounded w-3/4 mb-4"></div>
                                    <div className="space-y-2">
                                        <div className="h-3 bg-persian-indigo/10 rounded w-1/2"></div>
                                        <div className="h-3 bg-persian-indigo/10 rounded w-2/3"></div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    ) : reportsError ? (
                        <Card className="bg-red-50 border-red-200">
                            <CardContent className="text-center py-8">
                                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                                <h3 className="font-biorhyme text-red-700 text-lg mb-2">
                                    Failed to Load Reports
                                </h3>
                                <p className="font-fira-code text-red-600 text-sm">
                                    There was an error loading your EDA reports. Please try refreshing the page.
                                </p>
                            </CardContent>
                        </Card>
                    ) : reports.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <Card className="bg-white border-persian-indigo/20">
                                <CardContent className="text-center py-12">
                                    <BarChart3 className="h-16 w-16 text-persian-indigo/30 mx-auto mb-6" />
                                    <h3 className="font-biorhyme text-xl text-persian-indigo mb-2">
                                        No Reports Yet
                                    </h3>
                                    <p className="font-fira-code text-persian-indigo/60">
                                        Upload your first CSV file to generate an EDA report
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                        {reports.map((report, index) => (
                            <EdaReportCard
                                key={report.filename}
                                report={report}
                                index={index}
                            />
                        ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="history">
                    <EdaHistoryTable />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default EdaTabs;