const list_container = document.getElementById("list-container")
const audio = document.getElementById("audio")
const play_btn = document.getElementById("play-btn")
const prev_btn = document.getElementById("prev-btn")
const next_btn = document.getElementById("next-btn")
const cover_card_img = document.getElementById("cover-card-img")
const volume_up_btn = document.getElementById("volume-up")
const volume_down_btn = document.getElementById("volume-down")
const title_card = document.getElementById("title-card")

let is_playing = false;
let index = 1;
const canciones = [

{
	id: 1,
	title: "Cae el sol",
	audio: "audio/Airbag - Cae el sol _ letra.mp3",
	cover: "img/1.jpg",
	artist: "Aibarg",
},
{
	id: 2,
	title: "Noches de insomnio",
	audio: "audio/noches de insomnio ; airbag _ LETRA.mp3",
	cover: "img/2.jpg",
	artist: "Airbag",
},
{
	id: 3,
	title: "Esta noche",
	audio: "audio/Esta noche.mp3",
	cover: "img/3.jpg",
	artist: "Airbag",
},
{
	id: 4,
	title: "Saturno",
	audio: "audio/Pablo Alborán - Saturno (Videoclip Oficial).mp3",
	cover: "img/4.jpg",
	artist: "Pablo Alboran",
},
{
	id: 5,
	title: "Colapso",
	audio: "audio/Kevin Kaarl -Colapso [Letra].mp3",
	cover: "img/5.jpg",
	artist: "Kevin Kaarl",
},

];
canciones.forEach((e)  => {
	list_container.insertAdjacentHTML(
	"beforeend" ,
	`
	<div class="list-item" id ="${e.id}">
	<img class="cover" src="${e.cover}" alt="${e.title}"/>
	<div class="song-data">
	<div>${e.title}</div>
	<div>${e.artist}</div>
	</div>
	</div> `
	 );
});

const play_card = (obj_audio) =>{
	cover_card_img.src = obj_audio.cover;
	title_card.innerHTML = obj_audio.title;
	is_playing = true;
	play_btn.innerHTML ="pausa";
	index = obj_audio.id;
};
const play_audio = (id) => {
	const res = canciones.find((e) => e.id == id);
	if (res) {
		audio.src = res.audio;
		audio.play();
		play_card(res);
		is_playing = true;
		play_btn.innerHTML="pausa";

	}
};
const animation_active = ( ) => {
	if (is_playing) {
		cover_card_img.style.animationPlayState = "running";
	}
	else {
		cover_card_img.style.animationPlayState = "paused";
	}
};


list_container.addEventListener("click", (e) =>{
	if (e.target.matches(".list-item")) {
		play_audio(e.target.id);
	}else if (e.target.matches(".cover")) {
		play_audio(e.target.parentNode.id);
	}else if (e.target.matches(".song-data")) {
		play_audio(e.target.parentNode.id);
	}else if (e.target.matches(".song-data div")) {
		play_audio(e.target.parentNode.parentNode.id);
	}
});

play_btn.addEventListener("click", () =>{
	if (is_playing) {
		audio.pause();
		is_playing = false;
		play_btn.innerHTML = "play";
	} else {
		is_playing = true;
		play_btn.innerHTML ="pausa";
		audio.play();
	}
	animation_active();
});


window.addEventListener("load", ()=>{
	const progress =document.getElementById("progress-bar");
	progress.max=audio.duration;
	progress.min=0;
	window.setInterval(()=>{
		progress.value=audio.currentTime;
	},1000);

	progress.addEventListener("change",()=>{
		audio.currentTime=progress.value;
	});
});

next_btn.addEventListener("click",()=>{
	if (index<canciones.length) {
		index++;
		play_audio(index);
	}
});
prev_btn.addEventListener("click",()=>{
	if (index>0) {
		index--;
		play_audio(index);
	}
});
volume_up_btn.addEventListener("click",() => {
	audio.volume=audio.volume+0.1;
});

volume_down_btn.addEventListener("click",() => { 
    audio.volume=audio.volume-0.1;
});

