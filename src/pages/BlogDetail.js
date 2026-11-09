import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import { getBlogBySlug, getRelatedBlogs } from "AppData/BlogData";
import { Toast } from "helpers/Alert";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blog = getBlogBySlug(slug);
  const relatedPosts = getRelatedBlogs(slug, 3);
  const [activeFaq, setActiveFaq] = useState(null);

  // Dynamic SEO metadata & Schema.org injection
  useEffect(() => {
    if (!blog) return;

    // Title
    document.title = `${blog.title} | Ashburn DCS`;

    // Meta Description & Keywords
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", blog.summary);

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && blog.keywords) {
      metaKeywords.setAttribute("content", blog.keywords.join(", "));
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // JSON-LD Schema
    const scriptId = "blog-schema-jsonld";
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": `https://ashburndcs.com/blog/${blog.slug}/#article`,
          "isPartOf": {
            "@type": "WebPage",
            "@id": `https://ashburndcs.com/blog/${blog.slug}`
          },
          "headline": blog.title,
          "description": blog.summary,
          "inLanguage": "en-US",
          "mainEntityOfPage": `https://ashburndcs.com/blog/${blog.slug}`,
          "datePublished": "2026-10-24T08:00:00+05:00",
          "dateModified": new Date().toISOString(),
          "author": {
            "@type": "Organization",
            "name": blog.author || "Ashburn Data Center Solutions",
            "url": "https://ashburndcs.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Ashburn Data Center Solutions",
            "url": "https://ashburndcs.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://ashburndcs.com/images/logo.svg"
            }
          },
          "keywords": blog.keywords.join(", ")
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://ashburndcs.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Blogs & Articles",
              "item": "https://ashburndcs.com/blogs"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": blog.title,
              "item": `https://ashburndcs.com/blog/${blog.slug}`
            }
          ]
        }
      ]
    };

    // Add FAQ schema if post has faqs
    if (blog.faqs && blog.faqs.length > 0) {
      schemaData["@graph"].push({
        "@type": "FAQPage",
        "mainEntity": blog.faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      });
    }

    script.textContent = JSON.stringify(schemaData);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [blog]);

  const copyShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      Toast({ message: "Link copied to clipboard!", type: "success" });
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${blog.title} via @AshburnDCS`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  if (!blog) {
    return (
      <AnimationRevealPage>
        <Header />
        <div className="not-found-wrap">
          <h2>Article Not Found</h2>
          <p>The article or blog you are looking for does not exist or may have moved.</p>
          <button
            type="button"
            className="btn-back"
            onClick={() => navigate("/blogs")}
          >
            ← Browse All 50+ Articles & Blogs
          </button>
        </div>
        <Footer />
        <style>{`
          .not-found-wrap {
            max-width: 600px;
            margin: 80px auto;
            text-align: center;
            padding: 40px 20px;
          }
          .not-found-wrap h2 {
            font-size: 28px;
            font-weight: 800;
            color: #111827;
            margin-bottom: 12px;
          }
          .not-found-wrap p {
            color: #6b7280;
            margin-bottom: 24px;
          }
          .btn-back {
            background: #6415ff;
            color: #fff;
            padding: 12px 24px;
            border-radius: 10px;
            border: none;
            font-weight: 700;
            cursor: pointer;
          }
        `}</style>
      </AnimationRevealPage>
    );
  }

  return (
    <AnimationRevealPage>
      <Header />
      <main className="blog-detail-page">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">/</span>
          <Link to="/blogs">Blogs & Articles</Link>
          <span className="sep">/</span>
          <span className="current">{blog.title}</span>
        </nav>

        {/* Article Header */}
        <header className="article-header">
          <div className="badge-row">
            <span className={`type-tag type-${blog.type.toLowerCase()}`}>
              {blog.type}
            </span>
            <span className="cat-tag">{blog.category}</span>
            <span className="city-tag">📍 {blog.cityTag}</span>
          </div>

          <h1>{blog.title}</h1>

          <div className="meta-row">
            <div className="author-box">
              <span className="avatar">AD</span>
              <div>
                <strong>{blog.author}</strong>
                <span>Ashburn Data Center Solutions</span>
              </div>
            </div>
            <div className="date-time">
              <span>📅 {blog.date}</span>
              <span>•</span>
              <span>⏱️ {blog.readTime}</span>
            </div>
          </div>
        </header>

        {/* Article Layout (Main Body + Sticky Sidebar) */}
        <div className="article-layout">
          {/* Main Content Column */}
          <article className="main-content">
            {/* Key Takeaways Box */}
            <div className="key-takeaways">
              <div className="takeaway-header">
                <span className="takeaway-icon">💡</span>
                <h3>Key Takeaways & Executive Summary</h3>
              </div>
              <p>{blog.summary}</p>
              <ul className="takeaway-bullets">
                <li>Primary Focus Area: <strong>{blog.cityTag}</strong> & Surrounding Northern VA Infrastructure</li>
                <li>Topic Discipline: <strong>{blog.category}</strong></li>
                <li>Target Audience: Career Changers, Aspiring Server Technicians & Infrastructure Engineers</li>
              </ul>
            </div>

            {/* Sections */}
            {blog.sections.map((sec, idx) => (
              <section key={idx} id={`section-${idx}`} className="content-section">
                <h2>{sec.heading}</h2>
                <div className="section-body">
                  {sec.body.split("\n").map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              </section>
            ))}

            {/* Regional Relevance Callout */}
            <div className="regional-callout">
              <h4>📍 Regional Career Relevance: Northern Virginia</h4>
              <p>
                Whether you live in <strong>Ashburn</strong>, <strong>Sterling</strong>, <strong>Leesburg</strong>, <strong>Reston</strong>, <strong>Herndon</strong>, <strong>Manassas</strong>, or commute from <strong>Washington D.C. / Maryland</strong>, the skills outlined in this guide represent the exact technical requirements sought by Dulles corridor hyperscalers.
              </p>
              <p>
                Outside Virginia? Ashburn DCS also offers <strong>comprehensive online and hybrid training</strong>, giving students nationwide direct access to enterprise-grade server curricula.
              </p>
            </div>

            {/* FAQs Accordion */}
            {blog.faqs && blog.faqs.length > 0 && (
              <section className="faq-section">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-list">
                  {blog.faqs.map((faq, fIdx) => {
                    const isOpen = activeFaq === fIdx;
                    return (
                      <div key={fIdx} className={`faq-card ${isOpen ? "open" : ""}`}>
                        <button
                          type="button"
                          className="faq-question"
                          onClick={() => setActiveFaq(isOpen ? null : fIdx)}
                          aria-expanded={isOpen}
                        >
                          <span>{faq.q}</span>
                          <span className="faq-arrow">{isOpen ? "▲" : "▼"}</span>
                        </button>
                        {isOpen && <div className="faq-answer">{faq.a}</div>}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Share Strip */}
            <div className="share-strip">
              <span>Share this guide:</span>
              <button type="button" onClick={copyShareLink} className="share-btn">
                🔗 Copy Link
              </button>
              <button type="button" onClick={shareOnLinkedIn} className="share-btn linkedin">
                in Share on LinkedIn
              </button>
              <button type="button" onClick={shareOnTwitter} className="share-btn twitter">
                𝕏 Share on X
              </button>
            </div>

            {/* Inline BootCamp Callout */}
            <div className="inline-bootcamp-card">
              <div className="bootcamp-badge">8-Week Hands-On BootCamp</div>
              <h3>Launch Your Career in Data Center Alley</h3>
              <p>
                Get real lab experience racking servers, terminating optical fiber, and configuring IPMI/Linux under the guidance of working senior technicians at our Sterling, VA facility.
              </p>
              <div className="bootcamp-actions">
                <button
                  type="button"
                  className="btn-apply"
                  onClick={() => navigate("/registration")}
                >
                  Register Now →
                </button>
                <a href="tel:+15715313630" className="btn-call">
                  📞 Call (571) 531-3630
                </a>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="article-sidebar">
            {/* Table of Contents */}
            <div className="sidebar-card">
              <h4>Table of Contents</h4>
              <ul className="toc-list">
                {blog.sections.map((sec, idx) => (
                  <li key={idx}>
                    <a href={`#section-${idx}`}>
                      {idx + 1}. {sec.heading}
                    </a>
                  </li>
                ))}
                {blog.faqs && blog.faqs.length > 0 && (
                  <li>
                    <a href="#faq-section">Frequently Asked Questions</a>
                  </li>
                )}
              </ul>
            </div>

            {/* Training Quick Card */}
            <div className="sidebar-card highlight-card">
              <span className="sidebar-badge">ADCS Training Facility</span>
              <h4>Server Support BootCamp</h4>
              <p className="sidebar-location">
                📍 22648 Glenn Dr, STE 102<br />Sterling, VA 20164
              </p>
              <ul className="sidebar-points">
                <li>✓ 8-Week Master Schedule</li>
                <li>✓ Live Enterprise Hardware Labs</li>
                <li>✓ No Prior IT Experience Needed</li>
                <li>✓ Evening & Weekend Classes</li>
              </ul>
              <button
                type="button"
                className="sidebar-btn"
                onClick={() => navigate("/registration")}
              >
                Apply for Next Cohort
              </button>
              <button
                type="button"
                className="sidebar-outline-btn"
                onClick={() => navigate("/course-outline")}
              >
                View 8-Week Outline
              </button>
            </div>

            {/* Keywords Cloud */}
            <div className="sidebar-card">
              <h4>Topics Covered</h4>
              <div className="keyword-cloud">
                {blog.keywords.map((kw, i) => (
                  <span key={i} className="kw-tag">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="related-section">
            <div className="related-header">
              <h2>Related Guides & Articles</h2>
              <Link to="/blogs" className="view-all-link">
                View All 50+ Articles →
              </Link>
            </div>
            <div className="related-grid">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  className="related-card"
                  onClick={() => navigate(`/blog/${rel.slug}`)}
                >
                  <div className="rel-badge-row">
                    <span className="rel-tag">{rel.category}</span>
                    <span className="rel-city">📍 {rel.cityTag}</span>
                  </div>
                  <h3>
                    <Link to={`/blog/${rel.slug}`}>{rel.title}</Link>
                  </h3>
                  <p>{rel.summary.slice(0, 120)}...</p>
                  <div className="rel-meta">
                    <span>⏱️ {rel.readTime}</span>
                    <span className="read-arrow">Read →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      <style>{`
        .blog-detail-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 20px 80px;
          color: #1e293b;
        }

        /* Breadcrumbs */
        .breadcrumbs {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .breadcrumbs a {
          color: #6415ff;
          text-decoration: none;
          font-weight: 500;
        }

        .breadcrumbs a:hover {
          text-decoration: underline;
        }

        .breadcrumbs .sep {
          color: #cbd5e1;
        }

        .breadcrumbs .current {
          color: #1e293b;
          font-weight: 600;
          max-width: 400px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Article Header */
        .article-header {
          margin-bottom: 36px;
          padding-bottom: 28px;
          border-bottom: 1px solid #e2e8f0;
        }

        .badge-row {
          display: flex;
          gap: 8px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }

        .type-tag {
          font-size: 11px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .type-blog {
          background: #e0e7ff;
          color: #3730a3;
        }

        .type-article {
          background: #fef3c7;
          color: #92400e;
        }

        .cat-tag {
          background: #ede9fe;
          color: #6415ff;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .city-tag {
          background: #f1f5f9;
          color: #334155;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .article-header h1 {
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 900;
          color: #0f172a;
          line-height: 1.25;
          margin: 0 0 20px;
        }

        .meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .author-box {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #6415ff;
          color: #fff;
          font-weight: 800;
          display: grid;
          place-items: center;
          font-size: 14px;
        }

        .author-box strong {
          display: block;
          font-size: 14px;
          color: #0f172a;
        }

        .author-box span {
          font-size: 12px;
          color: #64748b;
        }

        .date-time {
          display: flex;
          gap: 10px;
          font-size: 13px;
          color: #64748b;
        }

        /* Layout */
        .article-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }

        @media (min-width: 992px) {
          .article-layout {
            grid-template-columns: minmax(0, 2fr) 340px;
          }
        }

        /* Main Content */
        .main-content {
          font-size: 16px;
          line-height: 1.8;
          color: #334155;
        }

        .key-takeaways {
          background: #f8fafc;
          border-left: 4px solid #6415ff;
          padding: 24px;
          border-radius: 0 16px 16px 0;
          margin-bottom: 36px;
        }

        .takeaway-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .takeaway-header h3 {
          margin: 0;
          font-size: 17px;
          font-weight: 800;
          color: #0f172a;
        }

        .key-takeaways p {
          margin: 0 0 14px;
          font-size: 15px;
          color: #475569;
        }

        .takeaway-bullets {
          margin: 0;
          padding-left: 20px;
          font-size: 14px;
          color: #475569;
        }

        .takeaway-bullets li {
          margin-bottom: 6px;
        }

        .content-section {
          margin-bottom: 36px;
        }

        .content-section h2 {
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 14px;
          line-height: 1.35;
          padding-top: 10px;
        }

        .section-body p {
          margin-bottom: 16px;
        }

        .regional-callout {
          background: #ede9fe;
          border: 1px solid #c4b5fd;
          border-radius: 14px;
          padding: 22px;
          margin: 36px 0;
        }

        .regional-callout h4 {
          margin: 0 0 10px;
          color: #430ce5;
          font-size: 16px;
          font-weight: 800;
        }

        .regional-callout p {
          margin: 0 0 10px;
          font-size: 14px;
          color: #312e81;
          line-height: 1.6;
        }

        .regional-callout p:last-child {
          margin-bottom: 0;
        }

        /* FAQ */
        .faq-section {
          margin: 40px 0;
        }

        .faq-section h3 {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .faq-card {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          background: #ffffff;
        }

        .faq-question {
          width: 100%;
          text-align: left;
          background: #f8fafc;
          border: none;
          padding: 16px 20px;
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .faq-card.open .faq-question {
          background: #ede9fe;
          color: #6415ff;
        }

        .faq-answer {
          padding: 16px 20px;
          font-size: 14px;
          line-height: 1.6;
          color: #475569;
          background: #ffffff;
          border-top: 1px solid #f1f5f9;
        }

        /* Share */
        .share-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px 0;
          margin: 30px 0;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
          flex-wrap: wrap;
        }

        .share-strip span {
          font-weight: 600;
          font-size: 13px;
          color: #64748b;
        }

        .share-btn {
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
          cursor: pointer;
          transition: all 0.15s;
        }

        .share-btn:hover {
          background: #f1f5f9;
        }

        .share-btn.linkedin {
          background: #0a66c2;
          color: #fff;
          border-color: #0a66c2;
        }

        .share-btn.twitter {
          background: #0f172a;
          color: #fff;
          border-color: #0f172a;
        }

        /* Inline BootCamp Box */
        .inline-bootcamp-card {
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #430ce5 100%);
          color: #ffffff;
          padding: 32px;
          border-radius: 20px;
          margin: 40px 0;
        }

        .bootcamp-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          background: #fbbf24;
          color: #78350f;
          padding: 3px 10px;
          border-radius: 999px;
          margin-bottom: 12px;
        }

        .inline-bootcamp-card h3 {
          margin: 0 0 10px;
          font-size: 24px;
          font-weight: 900;
          color: #ffffff;
        }

        .inline-bootcamp-card p {
          margin: 0 0 20px;
          font-size: 15px;
          color: #e2e8f0;
          line-height: 1.6;
        }

        .bootcamp-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-apply {
          background: #6415ff;
          color: #ffffff;
          font-weight: 700;
          padding: 10px 22px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
        }

        .btn-call {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 10px;
          text-decoration: none;
          display: inline-block;
        }

        /* Sidebar */
        .article-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sidebar-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.03);
        }

        .sidebar-card h4 {
          margin: 0 0 14px;
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .toc-list li {
          margin-bottom: 10px;
        }

        .toc-list a {
          color: #64748b;
          text-decoration: none;
          font-size: 13px;
          line-height: 1.4;
          display: block;
          transition: color 0.15s;
        }

        .toc-list a:hover {
          color: #6415ff;
          font-weight: 600;
        }

        .highlight-card {
          background: #f8fafc;
          border: 2px solid #6415ff;
        }

        .sidebar-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          background: #ede9fe;
          color: #6415ff;
          padding: 3px 8px;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        .sidebar-location {
          font-size: 13px;
          color: #64748b;
          margin: 0 0 14px;
          line-height: 1.5;
        }

        .sidebar-points {
          list-style: none;
          padding: 0;
          margin: 0 0 18px;
          font-size: 13px;
          color: #334155;
        }

        .sidebar-points li {
          margin-bottom: 6px;
        }

        .sidebar-btn {
          width: 100%;
          background: #6415ff;
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          padding: 10px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          margin-bottom: 8px;
        }

        .sidebar-outline-btn {
          width: 100%;
          background: transparent;
          color: #430ce5;
          font-weight: 600;
          font-size: 13px;
          padding: 8px;
          border: 1px solid #c4b5fd;
          border-radius: 10px;
          cursor: pointer;
        }

        .keyword-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .kw-tag {
          font-size: 11px;
          background: #f1f5f9;
          color: #475569;
          padding: 3px 8px;
          border-radius: 4px;
        }

        /* Related Section */
        .related-section {
          margin-top: 60px;
          padding-top: 40px;
          border-top: 2px solid #f1f5f9;
        }

        .related-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .related-header h2 {
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .view-all-link {
          color: #6415ff;
          font-weight: 700;
          text-decoration: none;
          font-size: 14px;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .related-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .related-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(100, 21, 255, 0.08);
          border-color: #c4b5fd;
        }

        .rel-badge-row {
          display: flex;
          gap: 6px;
          margin-bottom: 10px;
        }

        .rel-tag {
          font-size: 10px;
          font-weight: 700;
          color: #6415ff;
          background: #ede9fe;
          padding: 2px 7px;
          border-radius: 4px;
        }

        .rel-city {
          font-size: 10px;
          color: #475569;
          background: #f1f5f9;
          padding: 2px 7px;
          border-radius: 4px;
        }

        .related-card h3 {
          font-size: 16px;
          font-weight: 700;
          line-height: 1.4;
          margin: 0 0 8px;
        }

        .related-card h3 a {
          color: #0f172a;
          text-decoration: none;
        }

        .related-card p {
          font-size: 13px;
          color: #64748b;
          line-height: 1.5;
          margin: 0 0 14px;
          flex-grow: 1;
        }

        .rel-meta {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #94a3b8;
          border-top: 1px solid #f8fafc;
          padding-top: 10px;
        }

        .read-arrow {
          font-weight: 700;
          color: #6415ff;
        }
      `}</style>
    </AnimationRevealPage>
  );
}

