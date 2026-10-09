let teclas = document.querySelectorAll(".tecla");
const destaqueImagem = document.getElementById("imagem-destaque");
const destaqueContainer = document.getElementById("destaque-som");



function atualizarDestaque(tecla) {
    if (!destaqueImagem) return;

    const imagem = tecla.querySelector("img");
    if (!imagem) return;

    destaqueImagem.src = imagem.src;
    destaqueImagem.alt = imagem.alt || "Imagem do som em destaque";

    if (destaqueContainer) {
        destaqueContainer.classList.add("visible");
    }
}

function pararAudiosAtuais() {
    document.querySelectorAll("audio").forEach((audio) => {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}

function reproduzirTecla(tecla) {
    const instrumento = tecla.classList[1];
    const audio = document.querySelector(`#som_${instrumento}`);

    if (!audio) return;

    pararAudiosAtuais();
    audio.currentTime = 0;
    audio.play().catch(() => {});

    atualizarDestaque(tecla);
    teclas.forEach((botao) => botao.classList.remove("ativa"));
    tecla.classList.add("ativa");
}

teclas.forEach((tecla) => {
    tecla.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        reproduzirTecla(tecla);
    });

    tecla.addEventListener("keydown", (event) => {
        if (event.code === "Enter" || event.code === "Space" || event.code === "NumpadEnter") {
            reproduzirTecla(tecla);
            tecla.classList.add("ativa");
        }
    });

    tecla.addEventListener("keyup", () => {
        tecla.classList.remove("ativa");
    });
});

function mudarTamanho(){
    const menu = document.querySelector(".menu");
    if (!menu) return;

    if(window.innerWidth >= 768){
        menu.style.display = 'block';
        menu.style.width = '100%';
    }
    else{
        menu.style.display = 'none';
        menu.style.width = '200px';
    }
}