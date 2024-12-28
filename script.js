 // escrita do texto dinamico
 var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  window.onload = function () {
    var elements = document.getElementsByClassName("txt-rotate");
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute("data-rotate");
      var period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };

  // grupo morena rosa
  let lastHoveredBox = null;
  const boxes = document.querySelectorAll(".caixote"); // Ou qualquer classe/ID que você esteja utilizando para os elementos
  const container = document.querySelector(".container"); // O contêiner onde a imagem de fundo será alterada
  boxes.forEach((box) => {
    box.addEventListener("mouseover", () => {
      if (lastHoveredBox !== box) {
        // Obtém a URL da imagem do atributo 'data-image'
        const imageUrl = box.getAttribute("data-image");
        container.style.backgroundImage = `url('${imageUrl}')`;
        // Atualiza a última box que foi hoverada
        lastHoveredBox = box;
      }
    });
  });
  const containerMobile = document.querySelector(".container-mobile");
  // Seleciona todos os elementos internos que mudam a imagem ao passar o mouse
  const caixotes = document.querySelectorAll(".caixote-mobile");
  // Adiciona o evento de "mouseover" para cada caixote
  caixotes.forEach((caixote) => {
    caixote.addEventListener("mouseover", () => {
      const newImageUrl = caixote.getAttribute("data-image");
      containerMobile.style.backgroundImage = `url('${newImageUrl}')`;
    });
    // Opcional: Restaura a imagem original quando o mouse sai
    caixote.addEventListener("mouseleave", () => {
      containerMobile.style.backgroundImage = `url('https://grupomorenarosa.com.br/wp-content/uploads/2024/07/default.jpg')`;
    });
  });

  // personalização dos links do menu
  const links = document.querySelectorAll(".link-nav");

  // Seleciona todas as seções que os links apontam
  const sections = document.querySelectorAll("div[id]");

  // Função para lidar com o clique nos links
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Impede o comportamento padrão de navegação

      // Remove a classe active de todos os links
      links.forEach((l) => l.classList.remove("active"));

      // Adiciona a classe active ao link clicado
      this.classList.add("active");

      // Obtém o ID da seção a partir do link
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      // Ajusta a rolagem para a seção com scroll suave
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start", // Garante que o topo da seção fique visível
      });
    });
  });

  // Função para atualizar a classe active com base na seção visível
  function updateActiveLink() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 60; // Subtrai o valor para considerar o menu fixo
      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSection = section.getAttribute("id");
      }
    });

    // Atualiza os links para refletir a seção atual
    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === currentSection) {
        link.classList.add("active");
      }
    });
  }

  // Adiciona um evento de scroll para chamar a função de atualização de link ativo
  window.addEventListener("scroll", updateActiveLink);

  // Chama a função no carregamento para definir o link correto inicialmente
  updateActiveLink();

  const toggleButtons = document.querySelectorAll(".toggleMode"); // Seleciona todos os botões
  const toggleIcons = document.querySelectorAll(".toggleIcon");   // Seleciona todos os ícones
  
  // Função para alternar o modo escuro/claro
  function toggleDarkMode() {
    document.body.classList.toggle("darkmode"); // Alterna a classe no body
    updateButtonIcons(); // Atualiza os ícones
  }
  
  // Função para atualizar a imagem do botão
  function updateButtonIcons() {
    toggleIcons.forEach((icon) => {
      if (document.body.classList.contains("darkmode")) {
        icon.src = "sol.png";
        icon.alt = "Light Mode";
      } else {
        icon.src = "lua.png";
        icon.alt = "Dark Mode";
      }
    });
  }
  
  // Adiciona evento de clique a todos os botões
  toggleButtons.forEach((button) => {
    button.addEventListener("click", toggleDarkMode);
  });
  
// Evento de clique para alternar o modo e atualizar a imagem
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("darkmode");
  updateButtonIcon(); // Atualiza a imagem do botão após a mudança
});

// Define a imagem correta ao carregar a página
updateButtonIcon();

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const containers = document.querySelectorAll(".cards-container");
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeModal = document.querySelector(".close");

  // Tabs functionality
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      containers.forEach((c) => c.classList.remove("active"));

      tab.classList.add("active");
      const target = tab.getAttribute("data-target");
      document.getElementById(target).classList.add("active");
    });
  });

  // Open modal on card click
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const imageUrl = card.getAttribute("data-image");
      if (imageUrl) {
        modalImage.src = imageUrl;
        modal.style.display = "block";
      }
    });
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal on outside click
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

function showMenu() {
  let menuMobile = document.querySelector(".mobile-menu")

  if (menuMobile.classList.contains('open')) {
      menuMobile.classList.remove('open')
      document.querySelector('.icon').src = "menu-regular-36.png"
  } else {
      menuMobile.classList.add('open')
      document.querySelector('.icon').src = "x-regular-36.png"

  }
}



