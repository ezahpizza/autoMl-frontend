import { useState } from 'react';
import ModelReportCard from './ModelReportCard';
import CompareModels from './CompareModels';
import { GiArtificialIntelligence } from "react-icons/gi";
import { MdOutlineSwapCalls } from "react-icons/md";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const ModelTabs = () => {
  const [tab, setTab] = useState('models');
  return (
    <div className="flex justify-center">
        <Tabs value={tab} onValueChange={setTab} className="w-full md:w-[60%]">
            <TabsList className="h-auto grid w-full grid-cols-2 bg-white border border-persian-indigo/20">
                <TabsTrigger value="models" className="text-md font-fira-code data-[state=active]:bg-rose-pink data-[state=active]:text-white"> 
                    <GiArtificialIntelligence className="h-4 w-4 mr-2"/>
                    Models</TabsTrigger>
                <TabsTrigger value="compare" className="text-md font-fira-code data-[state=active]:bg-rose-pink data-[state=active]:text-white">
                    <MdOutlineSwapCalls className="h-4 w-4 mr-2"/>
                    Compare</TabsTrigger>
            </TabsList>
            <TabsContent value="models">
                <ModelReportCard />
            </TabsContent>
            <TabsContent value="compare">
                <CompareModels />
            </TabsContent>
        </Tabs>
    </div>

  );
};

export default ModelTabs;
