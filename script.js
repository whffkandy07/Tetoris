document.addEventListener("DOMContentLoaded", function () {
	const pages = [
	  { name: "HOME", id: "index" },
	  { name: "ABOUT", id: "about" },
	  { name: "PORTFOLIO", id: "portfolio" },
	  { name: "RESUME", id: "resume" },
	  { name: "CONTACT", id: "contact" }
	];
  
	let navHTML = `
	  <nav>
		<h1><span>내 홈페이지</span></h1>
	  </nav>
	  <div class="navbar-menu-fixed">
		<ul>
	`;
  
	pages.forEach((page, index) => {
	  if (index > 0) navHTML += `<li class="divider">|</li>`;
	  navHTML += `<li><a href="#" data-page="${page.id}">${page.name}</a></li>`;
	});
  
	navHTML += `
		</ul>
	  </div>
	`;
  
	document.body.insertAdjacentHTML("afterbegin", navHTML);
  
	const links = document.querySelectorAll('a[data-page]');
  
	// 클릭 이벤트 연결
	links.forEach(link => {
	  link.addEventListener('click', e => {
		e.preventDefault();
		const page = e.target.dataset.page;
  
		// active 클래스 처리
		links.forEach(a => a.classList.remove("active"));
		e.target.classList.add("active");
  
		loadPage(page);
	  });
	});
  
	// 기본 페이지 로드 + active 표시
	document.querySelector('a[data-page="index"]')?.classList.add("active");
	loadPage("index");
  });
  
  function loadPage(page) {
	fetch(`pages/${page}.html`)
	  .then(res => res.text())
	  .then(html => {
		document.querySelector(".content").innerHTML = html;
		window.scrollTo(0, 0);
	  });
  }
  
function copyEmail(targetId) {
  const email = document.getElementById(targetId).innerText;
  navigator.clipboard.writeText(email).then(() => {
    const msg = document.getElementById("copy-msg");
    msg.style.display = "inline";
    clearTimeout(window.copyTimer);
    window.copyTimer = setTimeout(() => {
      msg.style.display = "none";
    }, 2000);
  });
}

function openPreview(pdfUrl, description) {
  document.getElementById("pdf-frame").src = pdfUrl;
  document.getElementById("pdf-description").innerText = description;
  document.getElementById("pdf-modal").style.display = "flex";
}

function closePreview() {
  document.getElementById("pdf-modal").style.display = "none";
  document.getElementById("pdf-frame").src = ""; // 리셋
}