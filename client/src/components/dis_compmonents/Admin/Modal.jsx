// Modal.jsx
export const Modal = ({ open, item, onApprove, onReject }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-80 rounded-xl shadow-lg p-6 animate-scaleIn">
        <h2 className="text-lg font-semibold text-black mb-2">
          Review Listing
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Approve item:{" "}
          <span className="font-bold text-black">"{item?.name}"</span>?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onApprove}
            className="flex-1 py-2 bg-green-600 text-white rounded-lg"
          >
            Approve
          </button>

          {/* Cancel now acts as Reject (calls onReject) */}
          <button
            onClick={onReject}
            className="flex-1 py-2 border border-gray-400 rounded-lg text-black"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
