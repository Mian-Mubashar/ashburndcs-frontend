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
            "@id": `https://ashburndcs.com/blog/${blog.slug}`,
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
            "url": "https://ashburndcs.com",
          },
          "publisher": {
            "@type": "Organization",
            "name": "Ashburn Data Center Solutions",
            "url": "https://ashburndcs.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://ashburndcs.com/images/logo.svg",
            },
          },
          "keywords": blog.keywords.join(", "),
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://ashburndcs.com/",
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Resources & Guides",
              "item": "https://ashburndcs.com/blogs",
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": blog.title,
              "item": `https://ashburndcs.com/blog/${blog.slug}`,
            },
          ],
        },
      ],
    };

    if (blog.faqs && blog.faqs.length > 0) {
      schemaData["@graph"].push({
        "@type": "FAQPage",
        "mainEntity": blog.faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a,
          },
        })),
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
          <p>The resource you are looking for does not exist or may have moved.</p>
          <button
            type="button"
            className="btn-back"
            onClick={() => navigate("/blogs")}
          >
            ← Browse All Resources & Guides
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
            color: #0f172a;
            margin-bottom: 12px;
          }
          .not-found-wrap p {
            color: #64748b;
            margin-bottom: 24px;
          }
          .btn-back {
            background: #0284c7;
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
      <div className="detail-page-wrapper">
        {/* Clean Website Header (Matching the rest of the site) */}
        <header className="detail-site-header">
          <div className="header-inner">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <Link to="/blogs">Blogs & Articles</Link>
              <span className="sep">/</span>
              <span className="current">{blog.category}</span>
            </nav>

            <div className="badge-row">
              <span className="eyebrow">{blog.category}</span>
              <span className="city-pill">📍 {blog.cityTag}</span>
              <span className="type-pill">{blog.type}</span>
            </div>

            <h1 className="article-title">{blog.title}</h1>

            <div className="article-meta-line">
              <span className="author">By {blog.author}</span>
              <span className="dot">•</span>
              <span className="date">{blog.date}</span>
              <span className="dot">•</span>
              <span className="time">⏱️ {blog.readTime}</span>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="detail-body-container">
          <div className="detail-layout">
            {/* Main Content Column */}
            <article className="article-body">
              {/* Key Takeaways Card */}
              <div className="takeaways-box">
                <div className="takeaways-head">
                  <span className="ico">💡</span>
                  <h3>Key Takeaways & Summary</h3>
                </div>
                <p>{blog.summary}</p>
                <div className="takeaways-meta-pills">
                  <span>📍 Regional Focus: <strong>{blog.cityTag}</strong></span>
                  <span>📂 Category: <strong>{blog.category}</strong></span>
                  <span>⚡ Training Format: <strong>Hands-On Lab & Online</strong></span>
                </div>
              </div>

              {/* Dynamic Content Sections */}
              {blog.sections.map((sec, idx) => (
                <section key={idx} id={`section-${idx}`} className="content-block">
                  <h2>{sec.heading}</h2>
                  <div className="text-content">
                    {sec.body.split("\n").map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                </section>
              ))}

              {/* Regional Relevance Callout */}
              <div className="callout-nova">
                <h4>📍 Ashburn & Northern Virginia Relevance</h4>
                <p>
                  As the <strong>Data Center Capital of the World</strong>, Loudoun County, Fairfax, and Prince William County require thousands of hands-on technicians every year. The technical skills covered in this article reflect the operational standards enforced in local enterprise server halls.
                </p>
                <p>
                  Living outside Northern Virginia? Ashburn DCS also offers <strong>interactive live online training</strong>, bringing our complete server curriculum to students nationwide.
                </p>
              </div>

              {/* FAQs Section */}
              {blog.faqs && blog.faqs.length > 0 && (
                <section className="faqs-block">
                  <h3>Frequently Asked Questions</h3>
                  <div className="faq-items">
                    {blog.faqs.map((faq, fIdx) => {
                      const isOpen = activeFaq === fIdx;
                      return (
                        <div key={fIdx} className={`faq-row ${isOpen ? "open" : ""}`}>
                          <button
                            type="button"
                            className="faq-q-btn"
                            onClick={() => setActiveFaq(isOpen ? null : fIdx)}
                          >
                            <span>{faq.q}</span>
                            <span className="faq-toggle">{isOpen ? "▲" : "▼"}</span>
                          </button>
                          {isOpen && <div className="faq-a-content">{faq.a}</div>}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Share Bar */}
              <div className="share-bar">
                <span className="share-label">Share this resource:</span>
                <button type="button" onClick={copyShareLink} className="btn-share">
                  🔗 Copy Link
                </button>
                <button type="button" onClick={shareOnLinkedIn} className="btn-share in">
                  LinkedIn
                </button>
                <button type="button" onClick={shareOnTwitter} className="btn-share tw">
                  𝕏 Post
                </button>
              </div>

              {/* Bottom BootCamp Registration Box */}
              <div className="bootcamp-callout">
                <span className="callout-pill">Hands-On Server Training</span>
                <h3>Join the 8-Week Server Support BootCamp</h3>
                <p>
                  Master hardware teardowns, structured optical fiber, RAID setups, and Linux command-line diagnostics on real enterprise servers at our Sterling, VA lab.
                </p>
                <div className="callout-btns">
                  <button
                    type="button"
                    className="btn-apply-now"
                    onClick={() => navigate("/registration")}
                  >
                    Register Now →
                  </button>
                  <a href="tel:+15715313630" className="btn-phone">
                    📞 (571) 531-3630
                  </a>
                </div>
              </div>
            </article>

            {/* Sticky Sidebar */}
            <aside className="article-aside">
              {/* Table of Contents */}
              <div className="aside-card">
                <h4>Table of Contents</h4>
                <ul className="aside-toc">
                  {blog.sections.map((sec, idx) => (
                    <li key={idx}>
                      <a href={`#section-${idx}`}>
                        {idx + 1}. {sec.heading}
                      </a>
                    </li>
                  ))}
                  {blog.faqs && blog.faqs.length > 0 && (
                    <li>
                      <a href="#faqs-block">Frequently Asked Questions</a>
                    </li>
                  )}
                </ul>
              </div>

              {/* Facility Quick Card */}
              <div className="aside-card highlight-card">
                <span className="highlight-pill">ADCS Sterling Lab</span>
                <h4>Data Center Training</h4>
                <p className="highlight-address">
                  📍 22648 Glenn Dr, STE 102<br />Sterling, VA 20164
                </p>
                <ul className="highlight-specs">
                  <li>✓ 8-Week Master Schedule</li>
                  <li>✓ Hands-On Enterprise Hardware</li>
                  <li>✓ Evening & Weekend Classes</li>
                  <li>✓ Online & On-Site Formats</li>
                </ul>
                <button
                  type="button"
                  className="btn-aside-action"
                  onClick={() => navigate("/registration")}
                >
                  Enroll for Next Cohort
                </button>
                <button
                  type="button"
                  className="btn-aside-outline"
                  onClick={() => navigate("/course-outline")}
                >
                  View Course Outline
                </button>
              </div>

              {/* Keywords */}
              <div className="aside-card">
                <h4>Related Topics</h4>
                <div className="topics-wrap">
                  {blog.keywords.map((kw, i) => (
                    <span key={i} className="topic-tag">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Related Articles (Matching Reference 3-Card Style) */}
          {relatedPosts.length > 0 && (
            <section className="related-resources-section">
              <div className="related-top-bar">
                <h2>Related Resources</h2>
                <Link to="/blogs" className="link-all">
                  Browse All Resources →
                </Link>
              </div>
              <div className="related-cards-grid">
                {relatedPosts.map((rel) => (
                  <article
                    key={rel.id}
                    className="related-item-card"
                    onClick={() => navigate(`/blog/${rel.slug}`)}
                  >
                    <div className="related-top-blue">
                      <span className="rel-city-pill">📍 {rel.cityTag}</span>
                    </div>
                    <div className="related-item-body">
                      <div className="related-eyebrow">
                        <span>{rel.category}</span>
                        <span>·</span>
                        <span>{rel.readTime}</span>
                      </div>
                      <h3>
                        <Link to={`/blog/${rel.slug}`}>{rel.title}</Link>
                      </h3>
                      <p>{rel.summary.slice(0, 120)}...</p>
                      <div className="related-date-line">
                        <span>{rel.date}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      <Footer />

      <style>{`
        .detail-page-wrapper {
          background: #ffffff;
          min-height: 100vh;
        }

        /* Clean Site Header */
        .detail-site-header {
          max-width: 1200px;
          margin: 0 auto;
          padding: 36px 20px 24px;
          border-bottom: 1px solid #f1f5f9;
        }

        .header-inner {
          max-width: 950px;
        }

        .breadcrumbs {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 18px;
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

        .breadcrumbs .sep {
          color: #cbd5e1;
        }

        .breadcrumbs .current {
          color: #1e293b;
          font-weight: 600;
        }

        .badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }

        .eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #243e63;
          background: rgba(36, 62, 99, 0.08);
          padding: 5px 12px;
          border-radius: 999px;
        }

        .city-pill {
          font-size: 11px;
          font-weight: 600;
          color: #475569;
          background: #f1f5f9;
          padding: 5px 10px;
          border-radius: 6px;
        }

        .type-pill {
          font-size: 11px;
          font-weight: 700;
          color: #6415ff;
          background: #ede9fe;
          padding: 5px 10px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .article-title {
          font-size: clamp(26px, 3.8vw, 40px);
          font-weight: 900;
          color: #0f1c2e;
          line-height: 1.22;
          margin: 0 0 16px;
          letter-spacing: -0.01em;
        }

        .article-meta-line {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #64748b;
          flex-wrap: wrap;
        }

        .author {
          font-weight: 600;
          color: #334155;
        }

        .dot {
          color: #cbd5e1;
        }

        /* Body Container */
        .detail-body-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 36px 20px 80px;
        }

        .detail-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }

        @media (min-width: 992px) {
          .detail-layout {
            grid-template-columns: minmax(0, 1fr) 340px;
          }
        }

        /* Article Body */
        .article-body {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 36px 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          font-size: 16px;
          line-height: 1.8;
          color: #334155;
        }

        @media (max-width: 640px) {
          .article-body {
            padding: 24px 18px;
          }
        }

        .takeaways-box {
          background: #f0fdf4;
          border-left: 4px solid #16a34a;
          padding: 24px;
          border-radius: 0 14px 14px 0;
          margin-bottom: 36px;
        }

        .takeaways-head {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .takeaways-head h3 {
          margin: 0;
          font-size: 17px;
          font-weight: 800;
          color: #14532d;
        }

        .takeaways-box p {
          margin: 0 0 14px;
          font-size: 15px;
          color: #166534;
        }

        .takeaways-meta-pills {
          display: flex;
          gap: 14px;
          font-size: 13px;
          color: #15803d;
          flex-wrap: wrap;
        }

        .content-block {
          margin-bottom: 36px;
        }

        .content-block h2 {
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.35;
          margin: 0 0 14px;
        }

        .text-content p {
          margin-bottom: 16px;
        }

        .callout-nova {
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 14px;
          padding: 22px;
          margin: 36px 0;
        }

        .callout-nova h4 {
          margin: 0 0 8px;
          color: #1e40af;
          font-size: 16px;
          font-weight: 800;
        }

        .callout-nova p {
          margin: 0 0 10px;
          font-size: 14px;
          color: #1e3a8a;
          line-height: 1.6;
        }

        .callout-nova p:last-child {
          margin-bottom: 0;
        }

        /* FAQ */
        .faqs-block {
          margin: 40px 0;
        }

        .faqs-block h3 {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
        }

        .faq-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .faq-row {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        }

        .faq-q-btn {
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

        .faq-row.open .faq-q-btn {
          background: #e0f2fe;
          color: #0369a1;
        }

        .faq-a-content {
          padding: 16px 20px;
          font-size: 14px;
          line-height: 1.6;
          color: #475569;
          background: #ffffff;
          border-top: 1px solid #f1f5f9;
        }

        /* Share Bar */
        .share-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px 0;
          margin: 32px 0;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
          flex-wrap: wrap;
        }

        .share-label {
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
        }

        .btn-share {
          padding: 7px 14px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
          cursor: pointer;
        }

        .btn-share.in {
          background: #0a66c2;
          color: #fff;
          border-color: #0a66c2;
        }

        .btn-share.tw {
          background: #0f172a;
          color: #fff;
          border-color: #0f172a;
        }

        /* BootCamp Box */
        .bootcamp-callout {
          background: linear-gradient(135deg, #0f1c2e 0%, #1e1b4b 60%, #430ce5 100%);
          color: #ffffff;
          padding: 32px;
          border-radius: 18px;
          margin-top: 36px;
        }

        .callout-pill {
          display: inline-block;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          color: #fbbf24;
          background: rgba(251, 191, 36, 0.15);
          padding: 3px 10px;
          border-radius: 999px;
          margin-bottom: 12px;
        }

        .bootcamp-callout h3 {
          margin: 0 0 10px;
          font-size: 22px;
          font-weight: 900;
          color: #ffffff;
        }

        .bootcamp-callout p {
          margin: 0 0 20px;
          font-size: 15px;
          color: #cbd5e1;
          line-height: 1.6;
        }

        .callout-btns {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-apply-now {
          background: #6415ff;
          color: #ffffff;
          font-weight: 700;
          padding: 10px 22px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
        }

        .btn-phone {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 10px;
          text-decoration: none;
        }

        /* Aside */
        .article-aside {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .aside-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
        }

        .aside-card h4 {
          margin: 0 0 14px;
          font-size: 14px;
          font-weight: 800;
          color: #0f172a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .aside-toc {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .aside-toc li {
          margin-bottom: 10px;
        }

        .aside-toc a {
          color: #64748b;
          text-decoration: none;
          font-size: 13px;
          line-height: 1.4;
          display: block;
        }

        .aside-toc a:hover {
          color: #6415ff;
          font-weight: 600;
        }

        .highlight-card {
          border: 2px solid #6415ff;
          background: #fdfcff;
        }

        .highlight-pill {
          display: inline-block;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          background: #6415ff;
          color: #ffffff;
          padding: 3px 8px;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .highlight-address {
          font-size: 13px;
          color: #64748b;
          margin: 0 0 14px;
          line-height: 1.5;
        }

        .highlight-specs {
          list-style: none;
          padding: 0;
          margin: 0 0 18px;
          font-size: 13px;
          color: #334155;
        }

        .highlight-specs li {
          margin-bottom: 6px;
        }

        .btn-aside-action {
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

        .btn-aside-outline {
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

        .topics-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .topic-tag {
          font-size: 11px;
          background: #f1f5f9;
          color: #475569;
          padding: 3px 8px;
          border-radius: 4px;
        }

        /* Related Section */
        .related-resources-section {
          margin-top: 60px;
          padding-top: 40px;
          border-top: 2px solid #e2e8f0;
        }

        .related-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .related-top-bar h2 {
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .link-all {
          color: #6415ff;
          font-weight: 700;
          text-decoration: none;
          font-size: 14px;
        }

        .related-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }

        @media (max-width: 900px) {
          .related-cards-grid {
            grid-template-columns: 1fr;
          }
        }

        .related-item-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }

        .related-item-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(2, 132, 199, 0.12);
          border-color: #7dd3fc;
        }

        .related-top-blue {
          height: 160px;
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          position: relative;
        }

        .rel-city-pill {
          position: absolute;
          bottom: 10px;
          left: 12px;
          background: rgba(15, 23, 42, 0.7);
          color: #ffffff;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .related-item-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .related-eyebrow {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          color: #ea580c;
          margin-bottom: 8px;
          display: flex;
          gap: 6px;
        }

        .related-item-card h3 {
          font-size: 16px;
          font-weight: 800;
          line-height: 1.35;
          margin: 0 0 10px;
        }

        .related-item-card h3 a {
          color: #0f172a;
          text-decoration: none;
        }

        .related-item-card p {
          font-size: 13px;
          color: #64748b;
          line-height: 1.5;
          margin: 0 0 16px;
          flex-grow: 1;
        }

        .related-date-line {
          font-size: 12px;
          color: #94a3b8;
          border-top: 1px solid #f8fafc;
          padding-top: 10px;
        }
      `}</style>
    </AnimationRevealPage>
  );
}
