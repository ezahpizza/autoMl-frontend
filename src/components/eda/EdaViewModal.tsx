
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
      <DialogContent className="max-w-7xl max-h-[90vh] bg-almond-white">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="font-biorhyme text-persian-indigo text-xl">
            EDA Report: {datasetName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 min-h-[600px]">
          <iframe
            src={viewUrl}
            className="w-full h-full border-0 rounded-lg"
            title={`EDA Report for ${datasetName}`}
            style={{ minHeight: '600px' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EdaViewModal;
