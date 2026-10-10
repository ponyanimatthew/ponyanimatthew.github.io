const projects = [
  { title:"Matthew Electronics", color:"#e5484d", status:"Business",
    story:"My business selling phone and electronics accessories. I also built a catalog website so customers can browse what I sell and order on WhatsApp.",
    features:["Samsung LCDs","Chargers","Screen protectors","Silicon cases","Ear pods","WhatsApp catalog website"],
    note:"A real business that keeps growing." },
  { title:"Student Book Finder", color:"#f08a24", status:"Website",
    story:"A website I hand-coded in HTML to help students find the books they need.",
    features:["Hand-coded in HTML","Built entirely on an Android phone","Made for students"],
    note:"A simple tool that helps real students." },
  { title:"Quotes Website", color:"#e5b800", status:"Web app",
    story:"A Flask website full of quotes that inspire people, with memes to make it fun.",
    features:["Love, lifestyle and courage quotes","Memes","Login and sign-up","Google Sign-In","Dark theme"],
    note:"My first full web app with accounts." },
  { title:"My Own Search Engine", color:"#2fa866", status:"In progress",
    story:"My own web search engine, written in Python and Flask. It returns text results only, no images or videos, so it stays fast and light.",
    features:["Python and Flask","Text-only results","Built and tested on my phone with Pydroid 3"],
    note:"Still being built, step by step." },
  { title:"Expense Tracker", color:"#14a8a8", status:"In progress",
    story:"A free web app that helps anyone track where their money goes.",
    features:["Free for everyone","Sign up with email or Google","Settings page with your name, photo and follow buttons"],
    note:"Still being built." },
  { title:"Phone OS (web launcher)", color:"#8e5be8", status:"In progress",
    story:"My own web-based phone interface that I can use on my Android phone, like a custom launcher.",
    features:["Home screen","App drawer","Settings","Built with HTML, CSS and JavaScript"],
    note:"One of my boldest ideas." },
  { title:"My Own AI Chatbot", color:"#e0559f", status:"In progress",
    story:"My goal is to code my own AI. I'm starting with a simple Python chatbot that answers by keywords.",
    features:["Starts as a keyword chatbot in Python","Built on my phone","Later: an API-based assistant"],
    note:"Small start, big plan." },
  { title:"MSCE Exam Prep Platform", color:"#a8693a", status:"Planned",
    story:"An idea for an online platform that helps MSCE students pass their exams.",
    features:["MSCE past papers","Quizzes","Progress tracking","Built with Flask"],
    note:"Planned as a paid business." }
];

const blurbs = [
  "My business selling Samsung LCDs, chargers, screen protectors, silicon cases and ear pods, with a catalog website for WhatsApp orders.",
  "A website I hand-coded in HTML to help students find the books they need.",
  "A Flask site with love, lifestyle and courage quotes, memes, login and sign-up, Google Sign-In and a dark theme.",
  "A Python and Flask search engine that returns text results, built and tested on my Android phone.",
  "A free web app to help people track their money, with accounts and a settings page.",
  "My own web-based phone interface with a home screen, app drawer and settings, built in HTML, CSS and JavaScript.",
  "Starting with a simple Python chatbot, with plans to grow it into a smarter assistant.",
  "An idea for an online platform with past papers, quizzes and progress tracking for MSCE students."
];

const shelf = document.getElementById('shelf');
const overlay = document.getElementById('overlay');
const openBook = document.getElementById('openBook');
const bPage = document.getElementById('bPage');
let current = null;

projects.forEach((p, i) => {
  const b = document.createElement('button');
  b.className = 'book-cover';
  b.style.setProperty('--c', p.color);
  b.setAttribute('aria-label', 'Open ' + p.title);
  b.innerHTML = '<span class="t"></span><span class="d"></span><span class="s"></span>';
  b.querySelector('.t').textContent = p.title;
  b.querySelector('.d').textContent = blurbs[i];
  b.querySelector('.s').textContent = p.status;
  b.addEventListener('click', () => openProject(i));
  shelf.appendChild(b);
});

function openProject(i){
  current = projects[i];
  openBook.style.setProperty('--c', current.color);
  document.getElementById('bKicker').textContent = 'Book ' + (i + 1) + ' of ' + projects.length;
  document.getElementById('bTitle').textContent = current.title;
  document.getElementById('bStatus').textContent = current.status;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  // restart open animation
  openBook.style.animation = 'none'; void openBook.offsetWidth; openBook.style.animation = '';
  bPage.innerHTML =
    '<h4>The story</h4><p>' + esc(current.story) + '</p>' +
    '<h4>What\'s inside</h4><ul>' + current.features.map(f => '<li>' + esc(f) + '</li>').join('') + '</ul>' +
    '<h4>Status</h4><p><b>' + esc(current.status) + '</b>. ' + esc(current.note) + '</p>';
  bPage.scrollTop = 0;
}

function esc(s){ return s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function closeBook(){ overlay.classList.remove('open'); document.body.style.overflow = ''; }

document.getElementById('close').addEventListener('click', closeBook);
overlay.addEventListener('click', e => { if (e.target === overlay) closeBook(); });
document.addEventListener('keydown', e => {
  if (!overlay.classList.contains('open')) return;
  if (e.key === 'Escape') closeBook();
});
