import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import { BLOGS_DATA, BLOG_CATEGORIES, BLOG_TYPES } from "AppData/BlogData";

const REGIONS = [
  "All Regions",
  "Ashburn, VA",
  "Sterling, VA",
  "Loudoun County",
  "Reston & Herndon",
  "Manassas & PWC",
  "Tysons & Fairfax",
  "DC Metro Area",
  "Northern VA",
  "Nationwide Online"
];

export default function Blogs() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "All");
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get("region") || "All Regions");
  const [visibleCount, setVisibleCount] = useState(12);

  // Dynamic SEO metadata
  useEffect(() => {
    document.title = "Data Center Technician Blog & Career Articles | Ashburn DCS";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Explore 50+ in-depth blogs, career guides, and technical tutorials on Data Center Technician Training in Ashburn, Sterling, and Northern Virginia. Server racking, fiber optics, RAID, Linux, and salaries."
      );
    }
  }, []);

  // Sync state to URL params when filters change
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setVisibleCount(12);
    const params = new URLSearchParams(searchParams);
    if (cat === "All") params.delete("category");
    else params.set("category", cat);
    setSearchParams(params);
  };

  const handleTypeChange = (t) => {
    setSelectedType(t);
    setVisibleCount(12);
    const params = new URLSearchParams(searchParams);
    if (t === "All") params.delete("type");
    else params.set("type", t);
    setSearchParams(params);
  };

  const handleRegionChange = (reg) => {
    setSelectedRegion(reg);
    setVisibleCount(12);
    const params = new URLSearchParams(searchParams);
    if (reg === "All Regions") params.delete("region");
    else params.set("region", reg);
    setSearchParams(params);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setVisibleCount(12);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedType("All");
    setSelectedRegion("All Regions");
    setVisibleCount(12);
    setSearchParams({});
  };

  // Filtered dataset
  const filteredPosts = useMemo(() => {
    return BLOGS_DATA.filter((post) => {
      // Type filter
      if (selectedType !== "All" && post.type !== selectedType) {
        return false;
      }
      // Category filter
      if (selectedCategory !== "All" && post.category !== selectedCategory) {
        return false;
      }
      // Region filter
      if (selectedRegion !== "All Regions" && post.cityTag !== selectedRegion) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = post.title.toLowerCase().includes(q);
        const inSummary = post.summary.toLowerCase().includes(q);
        const inCity = post.cityTag.toLowerCase().includes(q);
        const inKeywords = post.keywords.some((k) => k.toLowerCase().includes(q));
        return inTitle || inSummary || inCity || inKeywords;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedType, selectedRegion]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const featuredPost = BLOGS_DATA[0];

  return (
    <AnimationRevealPage>
      <Header />
      <main className="blogs-page">
        {/* Hero Header */}
        <section className="blogs-hero">
          <div className="hero-content">
            <span className="hero-badge">Knowledge Hub & Industry Insights</span>
            <h1>Data Center Technician Articles & Guides</h1>
            <p className="hero-sub">
              Actionable guides, technical tutorials, and career roadmaps written by working infrastructure engineers. Serving Ashburn, Sterling, Loudoun County, Fairfax, and students nationwide.
            </p>

            <div className="stats-strip">
              <div className="stat-pill">
                <strong>50+</strong>
                <span>Technical Guides</span>
              </div>
              <div className="stat-pill">
                <strong>Ashburn & Sterling</strong>
                <span>Data Center Alley Hub</span>
              </div>
              <div className="stat-pill">
                <strong>Online & On-Site</strong>
                <span>Hybrid Training Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Guide Banner (if no active search/filter) */}
        {!searchQuery && selectedCategory === "All" && selectedType === "All" && selectedRegion === "All Regions" && (
          <section className="featured-banner">
            <div className="featured-card">
              <div className="featured-badge-row">
                <span className="badge-featured">⭐ Featured Master Guide</span>
                <span className="badge-city">📍 {featuredPost.cityTag}</span>
                <span className="badge-type">{featuredPost.type}</span>
              </div>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.summary}</p>
              <div className="featured-meta">
                <span>By {featuredPost.author}</span>
                <span>•</span>
                <span>{featuredPost.date}</span>
                <span>•</span>
                <span>⏱️ {featuredPost.readTime}</span>
              </div>
              <button
                type="button"
                className="featured-btn"
                onClick={() => navigate(`/blog/${featuredPost.slug}`)}
              >
                Read Full Guide →
              </button>
            </div>
          </section>
        )}

        {/* Search & Filter Controls */}
        <section className="filters-section">
          {/* Search Bar */}
          <div className="search-wrap">
            <div className="search-input-box">
              <span className="search-icon" aria-hidden="true">🔍</span>
              <input
                type="text"
                placeholder="Search topics (e.g. Ashburn, fiber optics, RAID, salary, Linux, Sterling)..."
                value={searchQuery}
                onChange={handleSearchChange}
                aria-label="Search articles"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Type Switcher Tabs */}
          <div className="type-tabs">
            {BLOG_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                className={`type-tab ${selectedType === t ? "active" : ""}`}
                onClick={() => handleTypeChange(t)}
              >
                {t === "All" ? "All Content" : t === "Blog" ? "Blogs & Insights" : "Technical Articles"}
                <span className="tab-count">
                  {t === "All"
                    ? BLOGS_DATA.length
                    : BLOGS_DATA.filter((p) => p.type === t).length}
                </span>
              </button>
            ))}
          </div>

          {/* Category Pill Filters */}
          <div className="filter-group">
            <label className="filter-label">Topic Category:</label>
            <div className="pill-scroll">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`pill-btn ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Region Quick Filters */}
          <div className="filter-group">
            <label className="filter-label">Northern Virginia & Regional Focus:</label>
            <div className="pill-scroll">
              {REGIONS.map((reg) => (
                <button
                  key={reg}
                  type="button"
                  className={`pill-btn pill-region ${selectedRegion === reg ? "active-region" : ""}`}
                  onClick={() => handleRegionChange(reg)}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter Summary */}
          {(searchQuery || selectedCategory !== "All" || selectedType !== "All" || selectedRegion !== "All Regions") && (
            <div className="active-filter-bar">
              <span>
                Found <strong>{filteredPosts.length}</strong> matching articles
              </span>
              <button type="button" className="reset-link" onClick={clearFilters}>
                Reset All Filters ✕
              </button>
            </div>
          )}
        </section>

        {/* Articles Grid */}
        <section className="articles-grid-wrap">
          {displayedPosts.length === 0 ? (
            <div className="no-results">
              <h3>No articles found</h3>
              <p>Try searching with different keywords or reset your filters.</p>
              <button type="button" className="reset-btn" onClick={clearFilters}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="articles-grid">
              {displayedPosts.map((post) => (
                <article
                  key={post.id}
                  className="article-card"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  <div className="card-top">
                    <span className={`tag-type tag-${post.type.toLowerCase()}`}>
                      {post.type}
                    </span>
                    <span className="tag-city">📍 {post.cityTag}</span>
                    <span className="tag-category">{post.category}</span>
                  </div>

                  <h3 className="card-title">
                    <a
                      href={`/blog/${post.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/blog/${post.slug}`);
                      }}
                    >
                      {post.title}
                    </a>
                  </h3>

                  <p className="card-summary">{post.summary}</p>

                  <div className="card-tags">
                    {post.keywords.slice(0, 3).map((kw, i) => (
                      <span key={i} className="mini-keyword">
                        #{kw}
                      </span>
                    ))}
                  </div>

                  <div className="card-footer">
                    <div className="author-info">
                      <span className="author-name">{post.author}</span>
                      <span className="read-time">⏱️ {post.readTime}</span>
                    </div>
                    <span className="read-link">Read More →</span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredPosts.length && (
            <div className="load-more-wrap">
              <button
                type="button"
                className="load-more-btn"
                onClick={() => setVisibleCount((prev) => prev + 12)}
              >
                Load More Articles ({filteredPosts.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </section>

        {/* BootCamp CTA Section */}
        <section className="bootcamp-cta-section">
          <div className="cta-box">
            <span className="cta-eyebrow">Ready for a Career Upgrade?</span>
            <h2>Join the 8-Week Server Support BootCamp in Sterling, VA</h2>
            <p>
              Transform your tech trajectory with hands-on lab training on enterprise servers, structured fiber cabling, BIOS setup, and IPMI management. No prior IT background required.
            </p>
            <div className="cta-details">
              <span>📍 Training Facility: 22648 Glenn Dr, STE 102, Sterling, VA 20164</span>
              <span>•</span>
              <span>💻 Online & Hybrid Options Available</span>
              <span>•</span>
              <span>📞 Questions? Call (571) 531-3630</span>
            </div>
            <div className="cta-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate("/registration")}
              >
                Register Now
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/course-outline")}
              >
                View 8-Week Course Outline
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .blogs-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 20px 60px;
          color: #1f2937;
        }

        /* Hero */
        .blogs-hero {
          text-align: center;
          padding: 36px 16px 28px;
          background: linear-gradient(180deg, #f8faff 0%, #ffffff 100%);
          border-radius: 20px;
          margin-bottom: 32px;
          border: 1px solid #edf2f7;
        }

        .hero-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #6415ff;
          background: rgba(100, 21, 255, 0.08);
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 14px;
        }

        .blogs-hero h1 {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 900;
          color: #0f172a;
          line-height: 1.2;
          margin: 0 0 12px;
        }

        .hero-sub {
          max-width: 780px;
          margin: 0 auto 24px;
          color: #64748b;
          font-size: 16px;
          line-height: 1.6;
        }

        .stats-strip {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .stat-pill {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 10px 18px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 150px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .stat-pill strong {
          color: #6415ff;
          font-size: 16px;
          font-weight: 800;
        }

        .stat-pill span {
          color: #64748b;
          font-size: 12px;
          font-weight: 500;
        }

        /* Featured Card */
        .featured-banner {
          margin-bottom: 36px;
        }

        .featured-card {
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%);
          color: #ffffff;
          padding: 32px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
        }

        .featured-badge-row {
          display: flex;
          gap: 10px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }

        .badge-featured {
          background: #fbbf24;
          color: #78350f;
          font-size: 11px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 999px;
          text-transform: uppercase;
        }

        .badge-city {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 999px;
        }

        .badge-type {
          background: rgba(99, 102, 241, 0.4);
          color: #ffffff;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 999px;
        }

        .featured-card h2 {
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 800;
          margin: 0 0 10px;
          color: #ffffff;
          line-height: 1.3;
        }

        .featured-card p {
          color: #cbd5e1;
          font-size: 15px;
          line-height: 1.6;
          margin: 0 0 16px;
          max-width: 850px;
        }

        .featured-meta {
          display: flex;
          gap: 10px;
          font-size: 13px;
          color: #94a3b8;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .featured-btn {
          background: #6415ff;
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          padding: 10px 22px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }

        .featured-btn:hover {
          background: #500fd1;
          transform: translateY(-2px);
        }

        /* Filters Section */
        .filters-section {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.03);
        }

        .search-wrap {
          margin-bottom: 20px;
        }

        .search-input-box {
          display: flex;
          align-items: center;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 8px 14px;
          background: #f8fafc;
          transition: border-color 0.2s, background 0.2s;
        }

        .search-input-box:focus-within {
          border-color: #6415ff;
          background: #ffffff;
        }

        .search-icon {
          font-size: 16px;
          margin-right: 10px;
        }

        .search-input-box input {
          width: 100%;
          border: none;
          background: transparent;
          font-size: 15px;
          outline: none;
          color: #1e293b;
        }

        .clear-search-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 16px;
          cursor: pointer;
          padding: 0 6px;
        }

        .type-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }

        .type-tab {
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #475569;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .type-tab.active {
          background: #6415ff;
          color: #ffffff;
          border-color: #6415ff;
        }

        .tab-count {
          background: rgba(0,0,0,0.08);
          font-size: 11px;
          padding: 2px 7px;
          border-radius: 999px;
        }

        .type-tab.active .tab-count {
          background: rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        .filter-group {
          margin-bottom: 14px;
        }

        .filter-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          margin-bottom: 8px;
        }

        .pill-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: thin;
        }

        .pill-btn {
          white-space: nowrap;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #334155;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
        }

        .pill-btn:hover {
          border-color: #6415ff;
          color: #6415ff;
        }

        .pill-btn.active {
          background: #ede9fe;
          border-color: #6415ff;
          color: #6415ff;
          font-weight: 700;
        }

        .pill-region {
          background: #f1f5f9;
        }

        .pill-region.active-region {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
          font-weight: 700;
        }

        .active-filter-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          margin-top: 8px;
          border-top: 1px dashed #e2e8f0;
          font-size: 13px;
          color: #475569;
        }

        .reset-link {
          background: none;
          border: none;
          color: #ef4444;
          font-weight: 600;
          cursor: pointer;
          font-size: 13px;
        }

        /* Articles Grid */
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 24px;
        }

        .article-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 16px rgba(0,0,0,0.03);
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          cursor: pointer;
        }

        .article-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(100, 21, 255, 0.09);
          border-color: #c4b5fd;
        }

        .card-top {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .tag-type {
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .tag-blog {
          background: #e0e7ff;
          color: #3730a3;
        }

        .tag-article {
          background: #fef3c7;
          color: #92400e;
        }

        .tag-city {
          background: #f1f5f9;
          color: #334155;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .tag-category {
          background: #ede9fe;
          color: #6415ff;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .card-title {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.4;
          margin: 0 0 10px;
        }

        .card-title a {
          color: inherit;
          text-decoration: none;
        }

        .card-title a:hover {
          color: #6415ff;
        }

        .card-summary {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
          margin: 0 0 14px;
          flex-grow: 1;
        }

        .card-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .mini-keyword {
          font-size: 11px;
          color: #94a3b8;
          background: #f8fafc;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px solid #f1f5f9;
          font-size: 12px;
        }

        .author-info {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-weight: 600;
          color: #334155;
        }

        .read-time {
          color: #94a3b8;
        }

        .read-link {
          font-weight: 700;
          color: #6415ff;
        }

        /* Load More */
        .load-more-wrap {
          text-align: center;
          margin-top: 40px;
        }

        .load-more-btn {
          background: #ffffff;
          border: 2px solid #6415ff;
          color: #6415ff;
          font-weight: 700;
          font-size: 15px;
          padding: 12px 28px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .load-more-btn:hover {
          background: #6415ff;
          color: #ffffff;
        }

        .no-results {
          text-align: center;
          padding: 60px 20px;
          background: #f8fafc;
          border-radius: 16px;
        }

        .reset-btn {
          margin-top: 14px;
          padding: 8px 18px;
          background: #6415ff;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        /* BootCamp CTA */
        .bootcamp-cta-section {
          margin-top: 60px;
        }

        .cta-box {
          background: linear-gradient(135deg, #430ce5 0%, #6415ff 100%);
          color: #ffffff;
          padding: 40px 32px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 12px 36px rgba(100, 21, 255, 0.25);
        }

        .cta-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 12px;
        }

        .cta-box h2 {
          font-size: clamp(24px, 3.5vw, 36px);
          font-weight: 900;
          margin: 0 0 12px;
          color: #ffffff;
        }

        .cta-box p {
          max-width: 720px;
          margin: 0 auto 18px;
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
        }

        .cta-details {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 24px;
        }

        .cta-actions {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: #ffffff;
          color: #430ce5;
          font-weight: 800;
          font-size: 15px;
          padding: 12px 28px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          padding: 12px 28px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: background 0.15s;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        @media (max-width: 768px) {
          .blogs-hero {
            padding: 24px 12px;
          }
          .filters-section {
            padding: 16px;
          }
          .articles-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AnimationRevealPage>
  );
}

