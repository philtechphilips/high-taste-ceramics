"use client";

import React, { useState } from "react";
import ReportDashboardLayout from "../../../components/ReportDashboardLayout";
import SimpleTable from "../../../components/ui/SimpleTable";
import Link from "next/link";

const blogs = [
  {
    id: 1,
    title: "How to Choose the Perfect Ceramic Tiles for Your Kitchen",
    author: "Sarah Johnson",
    category: "Design Tips",
    status: "Published",
    date: "Today, 10:30 AM",
    views: 1247,
    image: "/images/Avatar.png",
  },
  {
    id: 2,
    title: "The Art of Terrazzo: A Complete Guide to Flooring",
    author: "Mike Chen",
    category: "Flooring",
    status: "Draft",
    date: "Yesterday, 3:42 PM",
    views: 0,
    image: "/images/Avatar.png",
  },
  {
    id: 3,
    title: "Bathroom Renovation: Ceramic vs Porcelain Tiles",
    author: "Emma Davis",
    category: "Bathroom",
    status: "Published",
    date: "Jul 25, 2023",
    views: 892,
    image: "/images/Avatar.png",
  },
  {
    id: 4,
    title: "Sustainable Ceramics: Eco-Friendly Home Decor",
    author: "David Wilson",
    category: "Sustainability",
    status: "Scheduled",
    date: "Jul 23, 2023",
    views: 0,
    image: "/images/Avatar.png",
  },
  {
    id: 5,
    title: "Kitchen Backsplash Ideas with Ceramic Tiles",
    author: "Lisa Brown",
    category: "Kitchen",
    status: "Published",
    date: "Jul 22, 2023",
    views: 1567,
    image: "/images/Avatar.png",
  },
];

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const statuses = ["All", "Published", "Draft", "Scheduled"];
  const categories = [
    "All",
    "Design Tips",
    "Flooring",
    "Bathroom",
    "Sustainability",
    "Kitchen",
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || blog.status === selectedStatus;
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ReportDashboardLayout
      title="Blogs"
      description="Manage your blog content"
      showActionButtons={true}
      onCreateNew={() => console.log("Create new blog")}
      createButtonText="New Blog Post"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Blogs
              </label>
              <input
                type="text"
                placeholder="Search by title..."
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
            <div className="md:w-48">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {blog.category}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(blog.status)}`}
                  >
                    {blog.status}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {blog.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>By {blog.author}</span>
                  <span>{blog.views} views</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {blog.date}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/dashboard/blogs/edit/${blog.id}`}
                      className="text-primary-400 hover:text-primary-600 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Blogs Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              All Blog Posts ({filteredBlogs.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <SimpleTable
              data={filteredBlogs}
              columns={[
                {
                  header: "Blog Post",
                  key: "title",
                  render: (value, row) => (
                    <div className="flex items-center space-x-3">
                      <img
                        src={row.image}
                        alt={value}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                          {value}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          By {row.author}
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  header: "Category",
                  key: "category",
                  render: (value) => (
                    <span className="text-gray-900 dark:text-white">
                      {value}
                    </span>
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
                    <span className="text-gray-500 dark:text-gray-400">
                      {value}
                    </span>
                  ),
                },
                {
                  header: "Actions",
                  key: "id",
                  render: (value) => (
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/dashboard/blogs/edit/${value}`}
                        className="text-primary-400 hover:text-primary-600 text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                        Delete
                      </button>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>

        {/* Blog Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Posts
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {blogs.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <i className="ri-article-line text-blue-600 dark:text-blue-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Published
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {blogs.filter((b) => b.status === "Published").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-green-600 dark:text-green-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Drafts
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {blogs.filter((b) => b.status === "Draft").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <i className="ri-edit-line text-yellow-600 dark:text-yellow-400 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-background-50 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Views
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {blogs.reduce((sum, blog) => sum + blog.views, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <i className="ri-eye-line text-purple-600 dark:text-purple-400 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReportDashboardLayout>
  );
};

export default BlogsPage;
