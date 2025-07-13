"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MainLayout from "../../../components/MainLayout";
import { getBlogBySlug } from "../../../services/blog.service";

const BlogDetail = () => {
  const params = useParams();
  const { slug } = params;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const response = await getBlogBySlug(slug);
        setBlog(response.payload);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="w-full flex justify-center items-center py-40">
          <div className="text-[#242222] text-lg">Loading blog post...</div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="w-full flex flex-col items-center justify-center py-40">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <Link
            href="/blogs"
            className="text-[#242222] hover:text-[#666] transition-colors duration-300"
          >
            ← Back to Blogs
          </Link>
        </div>
      </MainLayout>
    );
  }

  if (!blog) {
    return (
      <MainLayout>
        <div className="w-full flex flex-col items-center justify-center py-40">
          <div className="text-[#242222] text-lg mb-4">Blog post not found</div>
          <Link
            href="/blogs"
            className="text-[#242222] hover:text-[#666] transition-colors duration-300"
          >
            ← Back to Blogs
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="w-full py-20 pt-40 flex flex-col items-center justify-center bg-[#EFEBE2] md:px-10 px-5">
        <div className="w-full max-w-4xl">
          <Link
            href="/blogs"
            className="text-[#242222] hover:text-[#666] transition-colors duration-300 mb-8 inline-block"
          >
            ← Back to Blogs
          </Link>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {blog.featured_image && (
              <div className="relative h-96 md:h-[500px] w-full">
                <Image
                  src={blog.featured_image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-8 md:p-12">
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-[Publicko] font-[300] text-[#242222] mb-4">
                  {blog.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-[#666] mb-6">
                  <span>By {blog.author || "Unknown Author"}</span>
                  {blog.published_at && (
                    <span>• {formatDate(blog.published_at)}</span>
                  )}
                  {blog.views > 0 && <span>• {blog.views} views</span>}
                </div>

                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#EFEBE2] text-[#242222] text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {blog.excerpt && (
                <div className="mb-8">
                  <p className="text-lg text-[#666] italic leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              )}

              <div className="prose prose-lg max-w-none">
                <div
                  className="text-[#242222] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </div>
          </article>
        </div>
      </section>
    </MainLayout>
  );
};

export default BlogDetail;
