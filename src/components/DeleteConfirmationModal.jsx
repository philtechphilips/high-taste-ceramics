"use client";

import React from "react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  itemName = "",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <i className="ri-error-warning-line text-red-500 text-xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {message}
            </p>
            {itemName && (
              <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                "{itemName}"
              </p>
            )}
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <i className="ri-alert-line text-yellow-500 mt-0.5"></i>
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Warning
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                This action cannot be undone. The item will be permanently
                deleted.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={onConfirm}
            loading={loading}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
