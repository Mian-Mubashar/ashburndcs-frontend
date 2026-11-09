import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BLOGS_DATA } from "AppData/BlogData";

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 70px;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 760px;
  margin: 0 auto 44px;

  .eyebrow {
    display: inline-block;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #6415ff;
    background: rgba(100, 21, 255, 0.08);
    padding: 6px 14px;
    border-radius: 999px;
    margin-bottom: 12px;
  }

  h2 {
    font-size: clamp(26px, 3.5vw, 38px);
    font-weight: 900;
    color: #0f172a;
    line-height: 1.25;
    margin: 0 0 12px;
  }

  p {
    color: #64748b;
    font-size: 16px;
    line-height: 1.6;
    margin: 0;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 26px;
  margin-bottom: 40px;
`;

const Card = styled.article`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 36px rgba(100, 21, 255, 0.1);
    border-color: #c4b5fd;
  }

  .badge-row {
    display: flex;
    gap: 8px;
    margin-bottom: 14px;
    flex-wrap: wrap;
  }

  .type-badge {
    font-size: 11px;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 6px;
    text-transform: uppercase;
    background: #ede9fe;
    color: #6415ff;
  }

  .city-badge {
    font-size: 11px;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 6px;
    background: #f1f5f9;
    color: #334155;
  }

  h3 {
    font-size: 19px;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.35;
    margin: 0 0 12px;
  }

  p {
    font-size: 14px;
    color: #64748b;
    line-height: 1.6;
    margin: 0 0 18px;
    flex-grow: 1;
  }

  .footer-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 14px;
    border-top: 1px solid #f1f5f9;
    font-size: 12px;

    .meta {
      color: #94a3b8;
    }

    .link {
      color: #6415ff;
      font-weight: 700;
    }
  }
`;

const BottomAction = styled.div`
  text-align: center;

  .btn-all-blogs {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #0f172a;
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
    padding: 14px 32px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;

    &:hover {
      background: #6415ff;
      transform: translateY(-2px);
    }
  }
`;

export default function HomeBlogsSection() {
  const navigate = useNavigate();

  // Pick top 3 featured guides for homepage
  const featured = [BLOGS_DATA[0], BLOGS_DATA[1], BLOGS_DATA[3]];

  return (
    <Section>
      <SectionHeader>
        <span className="eyebrow">Industry Knowledge Hub</span>
        <h2>Latest Insights from Data Center Alley</h2>
        <p>
          Authoritative technical breakdowns, career advice, and salary reports written by senior infrastructure engineers in Sterling and Ashburn, VA.
        </p>
      </SectionHeader>

      <CardsGrid>
        {featured.map((post) => (
          <Card
            key={post.id}
            onClick={() => navigate(`/blog/${post.slug}`)}
          >
            <div className="badge-row">
              <span className="type-badge">{post.type}</span>
              <span className="city-badge">📍 {post.cityTag}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.summary.slice(0, 140)}...</p>
            <div className="footer-row">
              <span className="meta">⏱️ {post.readTime}</span>
              <span className="link">Read Guide →</span>
            </div>
          </Card>
        ))}
      </CardsGrid>

      <BottomAction>
        <button
          type="button"
          className="btn-all-blogs"
          onClick={() => navigate("/blogs")}
        >
          Explore All 50+ Articles & Career Guides →
        </button>
      </BottomAction>
    </Section>
  );
}

