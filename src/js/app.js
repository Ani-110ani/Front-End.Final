document.addEventListener("DOMContentLoaded", () => {
  
  const burgerMenu = document.querySelector(".burger-menu");
  const navLinks = document.querySelector(".nav-links");

  burgerMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  const progressBars = document.querySelectorAll(".progress");
  
  const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.getAttribute("data-width");
        progressBar.style.width = width;
        observer.unobserve(progressBar);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => progressObserver.observe(bar));

  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");
      
      projectCards.forEach(card => {
        if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });
  
  const testimonialsData = [
    {
      img: "src/images/image4.png",
      quote: '"Excellent analytical skills. The Power BI dashboards transformed our complex banking datasets into clear, actionable insights."',
      name: "TBC Campus Mentor",
      role: "Data Analyst"
    },
    {
      img: "src/images/image5.png",
      quote: '"Outstanding front-end web development work. The UI components were incredibly responsive and clean."',
      name: "Hackathon Judge",
      role: "Software Engineer"
    },
    {
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
      quote: '"A brilliant grasp of financial modeling and Python. Highly recommend for any quantitative tasks."',
      name: "University Professor",
      role: "Finance Department"
    },
    {
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      quote: '"Very professional and detail-oriented when handling our accounting and period-end closings."',
      name: "Audit Manager",
      role: "Financial Services"
    }
  ];

  const dots = document.querySelectorAll(".dot");
  const testiImg = document.getElementById("testi-img");
  const testiQuote = document.getElementById("testi-quote");
  const testiName = document.getElementById("testi-name");
  const testiRole = document.getElementById("testi-role");

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      dots.forEach(d => d.classList.remove("active"));
      e.target.classList.add("active");

      const index = e.target.getAttribute("data-index");
      const data = testimonialsData[index];

      testiQuote.style.opacity = 0;
      setTimeout(() => {
        if(data.img) testiImg.src = data.img; 
        testiQuote.textContent = data.quote;
        testiName.textContent = data.name;
        testiRole.textContent = data.role;
        testiQuote.style.opacity = 1;
        testiQuote.style.transition = "opacity 0.5s ease";
      }, 300);
    });
  });