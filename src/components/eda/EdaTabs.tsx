import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import EdaHistoryTable from './EdaHistoryTable';
import EdaReportCard from './EdaReportCard';
import { BarChart3, History } from 'lucide-react';
import { useEdaReports } from '@/hooks/useEdaReports';


const EdaTabs = () => {
    const { data: reportsData, isLoading: reportsLoading, error: reportsError } = useEdaReports();
    const reports = reportsData?.reports || [];

    return (
        <div className="flex justify-center">
            <Tabs defaultValue="reports" className="w-full md:w-[60%]">
                <TabsList className="h-auto grid w-full grid-cols-2 bg-almond-white border border-persian-indigo/20">
                    <TabsTrigger 
                        value="reports" 
                        className="text-md font-fira-code data-[state=active]:bg-pumpkin-orange data-[state=active]:text-white"
                    >
                        <BarChart3 className="h-4 w-4 mr-2" />
                    Reports ({reports.length})
                    </TabsTrigger>
                    <TabsTrigger 
                        value="history"
                        className="text-md font-fira-code data-[state=active]:bg-pumpkin-orange data-[state=active]:text-white"
                    >
                        <History className="h-4 w-4 mr-2" />
                        History
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="reports" className="space-y-6">
                    <EdaReportCard />
                </TabsContent>

                <TabsContent value="history">
                    <EdaHistoryTable />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default EdaTabs;