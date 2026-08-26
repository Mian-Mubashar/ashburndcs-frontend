import React from "react";
import { useNavigate } from "react-router-dom";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";

// Local-SEO city guides for the towns closest to our Sterling, VA training
// facility (22648 Glenn Dr STE 102). Each entry covers who the city is a
// good fit for, plus the Online and Onsite course options available to
// residents there. Keep entries data-driven so new cities are easy to add.
const CITY_BLOGS = [
  {
    slug: "ashburn-va",
    city: "Ashburn, VA",
    distance: "about 10 minutes from Sterling",
    title: "Data Center Technician Training Near Ashburn, VA",
    description:
      "Ashburn is the heart of \"Data Center Alley,\" home to one of the largest concentrations of data center campuses in the world. If you live in Ashburn, you are minutes away from the same facilities that hire the technicians we train. That local demand is exactly why residents of Ashburn make up a big share of our Server Support BootCamp applicants, the jobs are practically in your backyard.",
    online:
      "Ashburn students can join our live classroom sessions online, following the same 8-week curriculum, instructor-led lectures, and course materials as the in-person cohort, without the commute across town.",
    onsite:
      "Our Sterling, VA training facility is a short drive from most Ashburn neighborhoods. Onsite students get hands-on lab time with real server hardware, racking, cabling, and RAID setups that are hard to replicate at home.",
  },
  {
    slug: "herndon-va",
    city: "Herndon, VA",
    distance: "about 15 minutes from Sterling",
    title: "Data Center Technician Training Near Herndon, VA",
    description:
      "Herndon sits along the Dulles Technology Corridor, surrounded by IT firms, government contractors, and network infrastructure companies. For Herndon residents looking to move into a hands-on IT career, data center technician training is a natural next step, and our Sterling facility is a quick trip up Route 28 or the Dulles Toll Road.",
    online:
      "Herndon students can attend every classroom session remotely through our live online option, keeping the same schedule and instructors as students learning in Sterling.",
    onsite:
      "Onsite students from Herndon typically drive in for evening and weekend sessions, giving them full access to the lab equipment used for BIOS configuration, storage drive installs, and remote server management practice.",
  },
  {
    slug: "reston-va",
    city: "Reston, VA",
    distance: "about 20 minutes from Sterling",
    title: "Data Center Technician Training Near Reston, VA",
    description:
      "Reston is a major corporate and tech hub in Northern Virginia, with easy access to the Silver Line and the Dulles corridor's IT employers. Many Reston residents come to us looking for a practical career change into IT infrastructure, without needing a four-year degree first.",
    online:
      "Our online option lets Reston students follow the full 8-week program from home or the office, joining live Wednesday evening and weekend classes over video.",
    onsite:
      "Reston is a straightforward commute out to our Sterling, VA training facility, where onsite students work directly with server racks, switches, and cabling in every lab session.",
  },
  {
    slug: "leesburg-va",
    city: "Leesburg, VA",
    distance: "about 20 minutes from Sterling",
    title: "Data Center Technician Training Near Leesburg, VA",
    description:
      "As the Loudoun County seat and one of the fastest-growing towns in Virginia, Leesburg has seen steady demand for skilled data center and IT support workers as new facilities continue to open across the county. Our program gives Leesburg residents a direct path into that local job market.",
    online:
      "Leesburg students who prefer to skip the drive can join the same classes online, with full access to live instruction and course materials from anywhere.",
    onsite:
      "For hands-on learners, our Sterling facility is an easy trip down Route 7, with lab sessions covering everything from rack mounting to firmware updates on real equipment.",
  },
  {
    slug: "chantilly-va",
    city: "Chantilly, VA",
    distance: "about 20 minutes from Sterling",
    title: "Data Center Technician Training Near Chantilly, VA",
    description:
      "Chantilly's location near Dulles International Airport has made it a base for IT services, logistics, and government contracting companies. Residents here often already work adjacent to the tech industry and are looking for the hands-on credential that gets them into a data center technician role.",
    online:
      "Chantilly students can complete the entire BootCamp online, attending live sessions on the same schedule as our in-person classes in Sterling.",
    onsite:
      "Onsite training is also a short drive up Route 28 from Chantilly, where students get real lab time on server hardware, RAID configuration, and network setup.",
  },
  {
    slug: "great-falls-va",
    city: "Great Falls, VA",
    distance: "about 25 minutes from Sterling",
    title: "Data Center Technician Training Near Great Falls, VA",
    description:
      "Great Falls residents looking to break into IT infrastructure often want a program that respects their time and gets straight to practical skills. Our 8-week format, with evening and weekend classes, is built for exactly that kind of career changer.",
    online:
      "The online option means Great Falls students never have to choose between the commute and the class. Every session is available live over video.",
    onsite:
      "When you are ready for lab time, our Sterling, VA facility is a reasonable drive out via Route 7, with full access to the same equipment used by every onsite student in the program.",
  },
];

export default function Blog() {
  const navigate = useNavigate();

  return (
    <AnimationRevealPage>
      <Header />
      <main className="blog-page">
        <div className="blog-header">
          <h1>ADCS Training Blog</h1>
          <p>
            Local guides to data center technician training for cities near our Sterling, VA
            campus, including your Online and Onsite course options.
          </p>
        </div>

        <div className="blog-list">
          {CITY_BLOGS.map((post) => (
            <article className="blog-card" key={post.slug} id={post.slug}>
              <span className="blog-tag">{post.city}</span>
              <h2>{post.title}</h2>
              <p className="blog-distance">{post.distance} to our training facility</p>
              <p className="blog-description">{post.description}</p>

              <div className="blog-courses">
                <div className="blog-course online">
                  <h3>Online Courses</h3>
                  <p>{post.online}</p>
                </div>
                <div className="blog-course onsite">
                  <h3>Onsite Courses</h3>
                  <p>{post.onsite}</p>
                </div>
              </div>

              <button type="button" className="blog-cta" onClick={() => navigate("/course-outline")}>
                View Course Outline & Schedule
              </button>
            </article>
          ))}
        </div>
      </main>

      <Footer />

      <style>{`
        .blog-page {
          max-width: 950px;
          margin: 0 auto;
          padding: 48px 20px 60px;
        }

        .blog-header h1 {
          font-size: 32px;
          font-weight: 900;
          color: #111827;
          margin: 0 0 6px;
        }

        .blog-header p {
          color: #6b7280;
          font-size: 15px;
          margin: 0 0 40px;
          max-width: 620px;
        }

        .blog-list {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .blog-card {
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 28px 28px 26px;
          background: #fff;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }

        .blog-tag {
          display: inline-block;
          background: #ede9fe;
          color: #6415ff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 999px;
          margin-bottom: 10px;
        }

        .blog-card h2 {
          font-size: 22px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 4px;
          line-height: 1.3;
        }

        .blog-distance {
          font-size: 13px;
          color: #9ca3af;
          margin: 0 0 14px;
          font-style: italic;
        }

        .blog-description {
          color: #374151;
          font-size: 15px;
          line-height: 1.7;
          margin: 0 0 20px;
        }

        .blog-courses {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        .blog-course {
          border-radius: 10px;
          padding: 16px 18px;
        }

        .blog-course.online {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
        }

        .blog-course.onsite {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
        }

        .blog-course h3 {
          font-size: 14px;
          font-weight: 800;
          margin: 0 0 6px;
          color: #111827;
        }

        .blog-course p {
          font-size: 13.5px;
          line-height: 1.6;
          color: #4b5563;
          margin: 0;
        }

        .blog-cta {
          border: none;
          background: #6415ff;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          padding: 10px 18px;
          border-radius: 8px;
          cursor: pointer;
        }

        .blog-cta:hover {
          background: #5310d9;
        }

        @media (max-width: 640px) {
          .blog-courses {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AnimationRevealPage>
  );
}
