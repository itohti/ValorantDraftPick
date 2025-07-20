import Button from '../ui/Button';

export default function ConfirmationModal({
  isOpen,
  title = 'Please confirm',
  message = 'Are you sure?',
  confirmLabel = 'Yes',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-80">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <Button
            label={cancelLabel}
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-500"
          />
          <Button
            label={confirmLabel}
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          />
        </div>
      </div>
    </div>
  );
}