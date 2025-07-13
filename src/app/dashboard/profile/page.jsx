"use client";

import React, { useState } from "react";
import ReportDashboardLayout from "../../../components/ReportDashboardLayout";
import useAuthStore from "../../../store/authStore";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { toast } from "react-hot-toast";
import { changePassword } from "../../../services/auth.service";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Generate initials from first and last name
  const getInitials = (firstName, lastName) => {
    const first = firstName ? firstName.charAt(0).toUpperCase() : "";
    const last = lastName ? lastName.charAt(0).toUpperCase() : "";
    return first + last;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    console.log("handlePasswordChange called:", { name, value });

    setPasswordData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };
      console.log("New passwordData:", newData);
      return newData;
    });
  };

  const handleSaveProfile = async () => {
    try {
      // Here you would typically make an API call to update the profile
      // For now, we'll just show a success message
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleChangePassword = async () => {
    console.log("handleChangePassword called, passwordData:", passwordData);

    // Safety check for passwordData
    if (!passwordData) {
      console.error("passwordData is undefined");
      toast.error("An error occurred. Please try again.");
      return;
    }

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      console.log("Calling changePassword with:", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      const response = await changePassword(
        passwordData.currentPassword,
        passwordData.newPassword,
      );

      console.log("Change password response:", response);

      if (response.status === "success") {
        // toast.success("Password changed successfully!");
        // setPasswordData({
        //   currentPassword: "",
        //   newPassword: "",
        //   confirmPassword: "",
        // });
        // setIsChangingPassword(false);
      } else {
        toast.error(response.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Change password error:", error);
      //   if (error.response?.data?.message) {
      //     toast.error(error.response.data.message);
      //   } else {
      //     toast.error("Failed to change password");
      //   }
    }
  };

  return (
    <ReportDashboardLayout
      title="Profile"
      description="Manage your account settings and profile information"
    >
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {getInitials(user?.firstName, user?.lastName)}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Member since{" "}
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              size="sm"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                First Name
              </label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Last Name
              </label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter last name"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter email address"
              />
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end space-x-3">
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} size="sm">
                Save Changes
              </Button>
            </div>
          )}
        </div>

        {/* Change Password */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Change Password
            </h3>
            <Button
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              variant="outline"
              size="sm"
            >
              {isChangingPassword ? "Cancel" : "Change Password"}
            </Button>
          </div>

          {isChangingPassword && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Password
                </label>
                <Input
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <Input
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  onClick={() => setIsChangingPassword(false)}
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    console.log("Change Password button clicked");
                    handleChangePassword();
                  }}
                  size="sm"
                >
                  Change Password
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ReportDashboardLayout>
  );
};

export default Profile;
