document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.querySelector(".burger-menu");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links li a");

  burgerMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    burgerMenu.classList.toggle("toggle");
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("active");
      burgerMenu.classList.remove("toggle");
    });
  });

  const heroImages = [
    "src/images/image1.png",
    "src/images/image2.png",
    "src/images/image3.png",
  ];
  let currentImageIndex = 0;
  const sliderImage = document.getElementById("slider-image");

  if (sliderImage) {
    setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % heroImages.length;
      sliderImage.style.opacity = 0;

      setTimeout(() => {
        sliderImage.src = heroImages[currentImageIndex];
        sliderImage.style.opacity = 1;
      }, 400);
    }, 5000);
  }

  const progressBars = document.querySelectorAll(".progress");

  const progressObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.getAttribute("data-width");
          progressBar.style.width = width;
          observer.unobserve(progressBar);
        }
      });
    },
    { threshold: 0.5 },
  );

  progressBars.forEach((bar) => progressObserver.observe(bar));

  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.classList.remove("hide");
          card.style.display = "block";
        } else {
          card.classList.add("hide");
          card.style.display = "none";
        }
      });
    });
  });

  const testimonialsData = [
    {
      img: "src/images/image4.png",
      quote:
        "Ana's ability to dive into complex datasets with SQL and visualize them in Power BI completely transformed our business logic. A brilliant technical mind.",
      name: "John Doe",
      role: "Senior Data Architect",
    },
    {
      img: "src/images/image5.png",
      quote:
        "Outstanding front-end web development work. The UI components were incredibly responsive, utilizing Tailwind CSS flawlessly.",
      name: "Hackathon Judge",
      role: "Software Engineer",
    },
    {
      img: "src/images/image6.png",
      quote:
        "A brilliant grasp of financial modeling and Python. Highly recommend for any quantitative or accounting tasks involving complex operations.",
      name: "University Professor",
      role: "Finance Department",
    },
    {
      img: "src/images/image7.png",
      quote:
        "Very professional and detail-oriented when handling our accounting and period-end closings using ORIS software. A real asset to the team.",
      name: "Audit Manager",
      role: "Financial Services",
    },
  ];

  const dots = document.querySelectorAll(".dot");
  const testiImg = document.getElementById("testi-img");
  const testiQuote = document.getElementById("testi-quote");
  const testiName = document.getElementById("testi-name");
  const testiRole = document.getElementById("testi-role");

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      dots.forEach((d) => d.classList.remove("active"));
      e.target.classList.add("active");

      const index = e.target.getAttribute("data-index");
      const data = testimonialsData[index];

      testiQuote.style.opacity = 0;
      setTimeout(() => {
        if (data.img) testiImg.src = data.img;
        testiQuote.textContent = data.quote;
        testiName.textContent = data.name;
        testiRole.textContent = data.role;
        testiQuote.style.opacity = 1;
        testiQuote.style.transition = "opacity 0.5s ease";
      }, 300);
    });
  });

  const contactForm = document.getElementById("contact-form");
  const modal = document.getElementById("success-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const submitBtn = document.getElementById("submit-btn");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      website: document.getElementById("website").value,
      message: document.getElementById("message").value,
    };

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        contactForm.reset();
        modal.classList.add("show");
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error. Please try again.");
    } finally {
      submitBtn.textContent = "Contact Me";
      submitBtn.disabled = false;
    }
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
});
