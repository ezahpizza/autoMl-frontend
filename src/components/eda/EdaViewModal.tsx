
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { edaApi } from '@/lib/edaApi';

interface EdaViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  filename: string;
  datasetName: string;
}

const EdaViewModal = ({ isOpen, onClose, filename, datasetName }: EdaViewModalProps) => {
  const viewUrl = edaApi.getViewUrl(filename);

  return (
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-7xl max-h-[90vh] p-4 bg-almond-white overflow-hidden">
    <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
      <DialogTitle className="font-biorhyme text-persian-indigo text-xl">
          Report for {datasetName}
      </DialogTitle>
    </DialogHeader>

    <div className="w-full h-[75vh] rounded-lg overflow-hidden">
      <iframe
        src={viewUrl}
        title={`EDA Report for ${datasetName}`}
        className="w-full h-full border-0"
        sandbox=""
      />
    </div>
  </DialogContent>
</Dialog>
  );
};

export default EdaViewModal;
