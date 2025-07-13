"use client";

import React, { useState, useEffect } from "react";
import ReportDashboardLayout from "../../../components/ReportDashboardLayout";
import SimpleTable from "../../../components/ui/SimpleTable";
import Link from "next/link";
import { getAllBlogs, deleteBlog } from "../../../services/blog.service";
import useAuthStore from "../../../store/authStore";
import AddBlogModal from "../../../components/AddBlogModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editBlog, setEditBlog] = useState(null);
  const user = useAuthStore((state) => state.user);
  const token = user?.token;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs(token);
        if (response.payload) {
          setBlogs(response.payload);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchBlogs();
    }
  }, [token]);

  const statuses = ["All", "Published", "Draft", "Archived"];

  const refreshBlogs = () => {
    if (token) {
      fetchBlogs();
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs(token);
      if (response.payload) {
        setBlogs(response.payload);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || blog.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEditBlog = (blog) => {
    setEditBlog(blog);
    setShowAddBlogModal(true);
  };

  const handleDeleteBlog = (blog) => {
    setSelectedBlog(blog);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBlog(selectedBlog.id, token);
      refreshBlogs();
      setShowDeleteModal(false);
      setSelectedBlog(null);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <ReportDashboardLayout
      title="Blogs"
      description="Manage your blog posts"
      showActionButtons={true}
      onCreateNew={() => setShowAddBlogModal(true)}
      createButtonText="Add Blog"
    >
      <div className="space-y-6">
        {/* Info Banner */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center">
            <i className="ri-check-line text-green-500 mr-2"></i>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Blog management system is now fully implemented. You can create,
              edit, and manage blog posts directly from this dashboard.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Blogs
              </label>
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="md:w-48">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blogs Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Blogs ({filteredBlogs.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
              </div>
            ) : (
              <SimpleTable
                data={filteredBlogs}
                columns={[
                  {
                    header: "Blog",
                    key: "title",
                    render: (value, row) => (
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {value}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {row.author}
                        </p>
                      </div>
                    ),
                  },
                  {
                    header: "Status",
                    key: "status",
                    render: (value) => (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(value)}`}
                      >
                        {value}
                      </span>
                    ),
                  },
                  {
                    header: "Views",
                    key: "views",
                    render: (value) => (
                      <span className="font-medium text-gray-900 dark:text-white">
                        {value}
                      </span>
                    ),
                  },
                  {
                    header: "Date",
                    key: "date",
                    render: (value) => (
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {value}
                      </span>
                    ),
                  },
                  {
                    header: "Actions",
                    key: "id",
                    render: (value, row) => (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditBlog(row)}
                          className="text-primary-400 hover:text-primary-600 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <Link
                          href={`/blogs/${row.slug}`}
                          target="_blank"
                          className="text-primary-400 hover:text-primary-600 text-sm font-medium"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDeleteBlog(row)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    ),
                  },
                ]}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddBlogModal
        isOpen={showAddBlogModal}
        onClose={() => {
          setShowAddBlogModal(false);
          setEditBlog(null);
        }}
        onSuccess={refreshBlogs}
        editBlog={editBlog}
      />
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedBlog(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${selectedBlog?.title}"? This action cannot be undone.`}
      />
    </ReportDashboardLayout>
  );
};

export default BlogsPage;
