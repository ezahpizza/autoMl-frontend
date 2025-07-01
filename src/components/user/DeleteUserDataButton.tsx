import { useCleanupUser } from '@/hooks/manageUser';
import { useState } from 'react';

const DeleteUserDataButton = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const cleanupUser = useCleanupUser();

  return (
    <>
      <button
        className="bg-red/60 text-white px-4 py-2 rounded hover:bg-red font-bold"
        onClick={() => setConfirmOpen(true)}
        disabled={cleanupUser.isPending}
      >
        Delete All Data
      </button>
      {confirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 border-2 border-dashed border-red-400 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-2 text-red-700">Confirm Deletion</h2>
            <p className="mb-4 text-gray-700">Are you sure you want to delete <b>all</b> your data? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded"
                onClick={() => setConfirmOpen(false)}
                disabled={cleanupUser.isPending}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red/60 text-white hover:bg-red font-bold"
                onClick={async () => {
                  await cleanupUser.mutateAsync();
                  setConfirmOpen(false);
                }}
                disabled={cleanupUser.isPending}
              >
                Yes, Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUserDataButton;
