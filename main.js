$(document).ready(function ($) {
  "use strict";

  var book_table = new Swiper(".book-table-img-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 2000,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 3,
      stretch: 2,
      depth: 100,
      modifier: 5,
      slideShadows: false,
    },
    loopAdditionSlides: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var team_slider = new Swiper(".team-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 2000,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.2,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });

  jQuery(".filters").on("click", function () {
    jQuery("#menu-dish").removeClass("bydefault_show");
  });
  $(function () {
    var filterList = {
      init: function () {
        $("#menu-dish").mixItUp({
          selectors: {
            target: ".dish-box-wp",
            filter: ".filter",
          },
          animation: {
            effects: "fade",
            easing: "ease-in-out",
          },
          load: {
            filter: ".all, .breakfast, .lunch, .dinner",
          },
        });
      },
    };
    filterList.init();
  });

  jQuery(".menu-toggle").click(function () {
    jQuery(".main-navigation").toggleClass("toggled");
  });

  jQuery(".header-menu ul li a").click(function () {
    jQuery(".main-navigation").removeClass("toggled");
  });

  gsap.registerPlugin(ScrollTrigger);

  var elementFirst = document.querySelector(".site-header");
  ScrollTrigger.create({
    trigger: "body",
    start: "30px top",
    end: "bottom bottom",

    onEnter: () => myFunction(),
    onLeaveBack: () => myFunction(),
  });

  function myFunction() {
    elementFirst.classList.toggle("sticky_head");
  }

  var scene = $(".js-parallax-scene").get(0);
  var parallaxInstance = new Parallax(scene);
});

jQuery(window).on("load", function () {
  $("body").removeClass("body-fixed");

  //activating tab of filter
  let targets = document.querySelectorAll(".filter");
  let activeTab = 0;
  let old = 0;
  let dur = 0.4;
  let animation;

  for (let i = 0; i < targets.length; i++) {
    targets[i].index = i;
    targets[i].addEventListener("click", moveBar);
  }

  // initial position on first === All
  gsap.set(".filter-active", {
    x: targets[0].offsetLeft,
    width: targets[0].offsetWidth,
  });

  function moveBar() {
    if (this.index != activeTab) {
      if (animation && animation.isActive()) {
        animation.progress(1);
      }
      animation = gsap.timeline({
        defaults: {
          duration: 0.4,
        },
      });
      old = activeTab;
      activeTab = this.index;
      animation.to(".filter-active", {
        x: targets[activeTab].offsetLeft,
        width: targets[activeTab].offsetWidth,
      });

      animation.to(
        targets[old],
        {
          color: "#0d0d25",
          ease: "none",
        },
        0
      );
      animation.to(
        targets[activeTab],
        {
          color: "#fff",
          ease: "none",
        },
        0
      );
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const chatbotIcon = document.getElementById("chatbot-icon");
  const chatbot = document.getElementById("chatbot");
  const chatbotSend = document.getElementById("chatbot-send");
  const chatbotInput = document.getElementById("chatbot-input");

  // Toggle chat window visibility on icon click
  chatbotIcon.addEventListener("click", function () {
    chatbot.style.display =
      chatbot.style.display === "none" || chatbot.style.display === ""
        ? "flex"
        : "none";
  });

  chatbotSend.addEventListener("click", sendMessage);

  chatbotInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  function sendMessage() {
    const userInput = chatbotInput.value;
    if (userInput) {
      addMessage("user", userInput);
      handleUserInput(userInput);
      chatbotInput.value = "";
    }
  }

  function addMessage(sender, text) {
    const messageContainer = document.createElement("div");
    messageContainer.className =
      sender === "user" ? "user-message" : "bot-message";
    messageContainer.textContent = text;
    document.getElementById("chatbot-messages").appendChild(messageContainer);
  }

  function handleUserInput(input) {
    let response = "";
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("hi")) {
      response = "Hello, how can I help you?";
    } else if (lowerInput.includes("menu")) {
      response =
        "Of course! We have a variety of dishes. Are you looking for appetizers, main courses, or desserts?";
    } else if (lowerInput.includes("reservation")) {
      response = "Great! Please provide the date, time, and number of guests.";
    } else if (lowerInput.includes("opening hours")) {
      response =
        "We are open from 9:00 AM to 10:00 PM, Monday to Thursday, and from 11:00 AM to 10:00 PM on Friday to Sunday.";
    } else if (lowerInput.includes("location")) {
      response = "We are located at 123 Food Street, Culinary City.";
    } else if (lowerInput.includes("contact")) {
      response =
        "You can contact us at +91-8866998866 or email us at contact@restaurant.com.";
    } else if (lowerInput.includes("special events")) {
      response =
        "We host special events every Friday evening. Join us for live music and exclusive dishes!";
    } else if (lowerInput.includes("feedback")) {
      response =
        "We would love to hear your feedback! Please let us know how we can improve.";
    } else {
      response =
        "I'm sorry, I didn't understand that. Can you please rephrase?";
    }
    addMessage("bot", response);
  }
});
