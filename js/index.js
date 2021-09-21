"use strict";

let map;
var get = null;
var set = null;

var configuracoes = {
	//BASE_URL: 'http://localhost/pousadajoaoemaria/',
	//BASE_API: 'http://localhost/pousadajoaoemaria/',
	BASE_URL: 'https://www.pousadajoaoemaria.com/',
	BASE_API: 'https://www.pousadajoaoemaria.com/',
	APLICACAO: 'POUSADA',
	//SALT_SISTEMA: "localhost",
	SALT_SISTEMA: "www.pousadajoaoemaria.com",
	HABILITAR_REGISTRO_USUARIO: true,
	HABILITAR_LOG: true
}
var api = {
	FORMULARIOS: {
		CONTATO: {
			ENDPOINT: configuracoes.BASE_API + 'contato.php'
		},
		RESERVA: {
			ENDPOINT: configuracoes.BASE_API + 'reserva.php'
		}
	}
}

/**
 * @description Gera logs no console do browser
 * @param {string} varLog Objeto a ser enviado para o console do browser quando o log habilitado
 */
function log(varLog) {
	if (configuracoes.HABILITAR_LOG) {
		console.log(varLog);
	}
}

function initMap() {

	var myLatLngMapa = { lat: -19.8713165, lng: -40.3740813 };//Centralização do mapa
	var myZoom = 15;
	var myZoomControl = true;
	var myStreetViewControl = true;

	//Quando estiver em versão mobile
	if (screen.width < 1024) {
		myLatLngMapa = { lat: -19.8717742, lng: -40.3643596 };
		myZoom = 13;
		myZoomControl = false;
		myStreetViewControl = false;
	} else if (screen.width < 1280) {

	} else {

	}


	var map = new google.maps.Map(document.getElementById("map"), {
		center: myLatLngMapa,
		zoom: myZoom,
		zoomControl: myZoomControl,
		mapTypeControl: false,
		scaleControl: true,
		streetViewControl: myStreetViewControl,
		rotateControl: false,
		fullscreenControl: false

		/* Alterar as Cores dos elementos do mapa
		,styles: [
			{ elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
			{ elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
			{ elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
			{
				featureType: 'administrative.locality',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#d59563' }]
			},
			{
				featureType: 'poi',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#d59563' }]
			},
			{
				featureType: 'poi.park',
				elementType: 'geometry',
				stylers: [{ color: '#263c3f' }]
			},
			{
				featureType: 'poi.park',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#6b9a76' }]
			},
			{
				featureType: 'road',
				elementType: 'geometry',
				stylers: [{ color: '#38414e' }]
			},
			{
				featureType: 'road',
				elementType: 'geometry.stroke',
				stylers: [{ color: '#212a37' }]
			},
			{
				featureType: 'road',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#9ca5b3' }]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry',
				stylers: [{ color: '#746855' }]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry.stroke',
				stylers: [{ color: '#1f2835' }]
			},
			{
				featureType: 'road.highway',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#f3d19c' }]
			},
			{
				featureType: 'transit',
				elementType: 'geometry',
				stylers: [{ color: '#2f3948' }]
			},
			{
				featureType: 'transit.station',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#d59563' }]
			},
			{
				featureType: 'water',
				elementType: 'geometry',
				stylers: [{ color: '#17263c' }]
			},
			{
				featureType: 'water',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#515c6d' }]
			},
			{
				featureType: 'water',
				elementType: 'labels.text.stroke',
				stylers: [{ color: '#17263c' }]
			}
		]*/
	});
	var myLatLngPousada = { lat: -19.8724745, lng: -40.3654957 };// Local
	var infoPousada = new google.maps.InfoWindow({
		content: `
				<div id="content" class="left-align" >
					<div id="siteNotice">
						<img src="https://pousadajoaoemaria.com/img/logo_publica.jpg" alt="Pousada João e Maria" width="128" height="128" longdesc="https://pousadajoaoemaria.com/img/logo_publica.jpg" />
						<br/><a href="https://wa.me/5527997042277" target="new" class="a"><img src="https://pousadajoaoemaria.com/img/icon_whatsapp.jpg" alt="Whasapp" width="32" height="32" longdesc="https://pousadajoaoemaria.com/img/icon_whatsapp.jpg" /> (27) 99704-2277</a>
						<br/><a href="https://www.google.com/maps/dir//Pousada+Jo%C3%A3o+e+Maria+-+Rodovia+Pedro+Cutini,+Ibira%C3%A7u+-+ES,+29670-000/@-19.8717742,-40.3643596,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0xb79476052b4003:0xff683001155dd816!2m2!1d-40.3643596!2d-19.8717742" target="new" class="a"><img src="https://pousadajoaoemaria.com/img/icon_googlemaps.jpg" alt="Google Maps" width="32" height="32" longdesc="https://pousadajoaoemaria.com/img/icon_googlemaps.jpg" /> Clique aqui </a> e veja como chegar.<br/><strong>Rodovia Pedro Cutini, Ibiraçu - Espírito Santo, 29670-000, Brasil</strong>
					</div>
				</div>
				`
	});
	var markerPousada = new google.maps.Marker({
		position: myLatLngPousada,
		map: map,
		title: 'Rodovia Pedro Cutini, Ibiraçu - ES, 29670-000'
	});
	markerPousada.addListener('click', function () {
		infoPousada.open(map, markerPousada);
	});

	var myLatLngPortal = { lat: -19.865440, lng: -40.383146 };// Local
	var infoPortal = new google.maps.InfoWindow({
		content: `
				<div id="content" class="left-align" >
					<div id="siteNotice">
						<img src="https://pousadajoaoemaria.com/img/portal_detalhe_maps.jpg" alt="Portal Torii Ibiraçu" width="128" height="128" longdesc="Portal Torii ibiraçu" />
						<br/><a href="https://www.google.com/maps/place/Portal+Torii+Ibira%C3%A7u/@-19.868419,-40.3799033,15.8z/data=!4m5!3m4!1s0xb7956970c6f8ef:0x19817862fed916da!8m2!3d-19.8650904!4d-40.383056" target="new" class="a"><img src="https://pousadajoaoemaria.com/img/icon_googlemaps.jpg" alt="Google Maps" width="32" height="32" longdesc="Como chegar" /> Clique aqui </a> e veja como chegar.<br/><strong>Rodovia Gov. Mário Covas, Ibiraçu - Espírito Santo, 29670-000, Brasil</strong>
					</div>
				</div>
				`
	});
	var markerPortal = new google.maps.Marker({
		position: myLatLngPortal,
		icon: configuracoes.BASE_URL + 'img/portal_maps.png',
		map: map,
		title: 'Portal Torii Ibiraçu'
	});
	markerPortal.addListener('click', function () {
		infoPortal.open(map, markerPortal);
	});

	var myLatLngMosteiro = { lat: -19.8901755, lng: - 40.3783619 };// Local
	var infoMosteiro = new google.maps.InfoWindow({
		content: `
				<div id="content" class="left-align" >
					<div id="siteNotice">
						<img src="https://pousadajoaoemaria.com/img/mosteiro_detalhe_maps.jpg" alt="Mosteiro Zen Morro da Vargem" width="128" height="128" longdesc="Mosteiro Zen Morro da Vargem" />
						<br/><a href="https://www.google.com/maps/place/Mosteiro+Zen+Morro+da+Vargem/@-19.8839075,-40.3858618,14.8z/data=!4m5!3m4!1s0xb7944a95555555:0x9a5e7c2c72f4c4fb!8m2!3d-19.8903951!4d-40.3778082" target="new" class="a"><img src="https://pousadajoaoemaria.com/img/icon_googlemaps.jpg" alt="Google Maps" width="32" height="32" longdesc="Como chegar" /> Clique aqui </a> e veja como chegar.<br/><strong>BR 101, Km 217, s/n Zona Rural, Ibiraçu - ES, 29670-000</strong>
					</div>
				</div>
				`
	});
	var markerMosteiro = new google.maps.Marker({
		position: myLatLngMosteiro,
		icon: configuracoes.BASE_URL + 'img/mosteiro_maps.png',
		map: map,
		title: 'Mosteiro Zen Morro da Vargem'
	});
	markerMosteiro.addListener('click', function () {
		infoMosteiro.open(map, markerMosteiro);
	});

	var myLatLngPesca = { lat: -19.8721052, lng: -40.3664498 };// Local
	var infoPesca= new google.maps.InfoWindow({
		content: `
				<div id="content" class="left-align" >
					<div id="siteNotice">
						<img src="https://pousadajoaoemaria.com/img/pesca_detalhe_maps.jpg" alt="Pesque Pague Restaurante e Churrascaria Lagoa do Vale" width="128" height="128" longdesc="Pesque Pague Restaurante e Churrascaria Lagoa do Vale" />
						<br/><a href="https://www.google.com/maps/place/Pesque+Pague+Restaurante+e+Churrascaria+Lagoa+do+Vale/@-19.8720017,-40.3645897,17.3z/data=!4m5!3m4!1s0x0:0x7be0673853579bc9!8m2!3d-19.8718779!4d-40.3647003" target="new" class="a"><img src="https://pousadajoaoemaria.com/img/icon_googlemaps.jpg" alt="Google Maps" width="32" height="32" longdesc="Como chegar" /> Clique aqui </a> e veja como chegar.<br/><strong>Rodovia Estadual Pedro Cutini, Ibiraçu - ES, 29670-000</strong>
					</div>
				</div>
				`
	});
	var markerPesca = new google.maps.Marker({
		position: myLatLngPesca,
		icon: configuracoes.BASE_URL + 'img/pesca_maps.png',
		map: map,
		title: 'Pesque Pague Restaurante e Churrascaria Lagoa do Vale'
	});
	markerPesca.addListener('click', function () {
		infoPesca.open(map, markerPesca);
	});

	var icons = {
		portal: {
			name: 'Portal',
			icon: configuracoes.BASE_URL + 'img/portal_maps.png'
		},
		mosteiro: {
			name: 'Mosteiro',
			icon: configuracoes.BASE_URL + 'img/mosteiro_maps.png'
		},
		lagoa: {
			name: 'Pesca',
			icon: configuracoes.BASE_URL + 'img/pesca_maps.png'
		}
	};

	var legend = document.getElementById('legend');	
	for (var key in icons) {
		var type = icons[key];
		var name = type.name;
		var icon = type.icon;
		var div = document.createElement('div');
		div.innerHTML = '<img src="' + icon + '"> ' + name;
		legend.appendChild(div);
	}
	var legenda = document.getElementById('legenda');
	for (var key in icons) {
		var type = icons[key];
		var name = type.name;
		var icon = type.icon;
		var div = document.createElement('div');
		div.className = 'col s3'
		div.innerHTML = '<img src="' + icon + '"> ' + name;
		legenda.appendChild(div);
	}

	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
}

(function ($) {
	$(function () {
		var input = {
			NOME: $('#Nome'),
			NOME_RESERVA: $('#nome-reserva'),
			EMAIL: $('#email'),
			EMAIL_RESERVA: $('#email-reserva'),
			DDD: $('#DDD'),
			DDD_RESERVA: $('#ddd-reserva'),
			TELEFONE: $('#Telefone'),
			TELEFONE_RESERVA: $('#telefone-reserva'),
			ASSUNTO: $('#assunto'),
			MENSAGEM: $('#mensagem'),
			ENTRADA: $('#Entrada'),
			SAIDA: $('#Saida'),
			ADULTOS: $('#adultos'),
			CRIANCAS: $('#criancas'),
			OBSERVACOES: $('#obs')
		}
		$('#btn-enviar-reserva').click(function (e) {
			log('O botão ENVIAR RESERVA foi clicado');

			var atende = true;

			e.preventDefault();
			var botao = $(e.target);

			log(input.NOME_RESERVA.val());
			log(input.EMAIL_RESERVA.val());
			log(input.DDD_RESERVA.val() + ' ' + input.TELEFONE_RESERVA.val());
			log(input.ENTRADA.val());
			log(input.SAIDA.val());
			log(input.ADULTOS.val());
			log(input.CRIANCAS.val());
			log(input.OBSERVACOES.val());

			if (!input.NOME_RESERVA.val()) {
				log('NOME VAZIO!');
				input.NOME_RESERVA.addClass('invalid');
				var msg = '<H2>Informe o seu nome.</H2>';
				M.toast({
					html: msg,
					classes: 'card-panel  red accent-4 white-text'
				});

				atende = false;
			} else {
				input.NOME_RESERVA.removeClass('invalid');
			}
			if (!input.EMAIL_RESERVA.val()) {
				log('E-MAIL VAZIO!');
				input.EMAIL_RESERVA.addClass('invalid');
				var msg = '<H2>Informe o e-mail.</H2>';
				M.toast({
					html: msg,
					classes: 'card-panel  red accent-4 white-text'
				});

				atende = false;
			} else {
				input.EMAIL_RESERVA.removeClass('invalid');
			}
			if (!input.ENTRADA.val()) {
				log('ENTRADA VAZIA!');
				input.ENTRADA.addClass('invalid');
				var msg = '<H2>Informe a entrada.</H2>';
				M.toast({
					html: msg,
					classes: 'card-panel  red accent-4 white-text'
				});

				atende = false;
			} else {
				input.ENTRADA.removeClass('invalid');

			}
			if (!input.SAIDA.val()) {
				log('SAÍDA VAZIA!');
				input.SAIDA.addClass('invalid');
				var msg = '<H2>Informe a saída.</H2>';
				M.toast({
					html: msg,
					classes: 'card-panel  red accent-4 white-text'
				});

				atende = false;
			} else {
				input.SAIDA.removeClass('invalid');
			}
			if (!input.DDD.val() && input.TELEFONE.val()) {
				log('DDD OU TELEFONE VAZIO!');
				input.DDD.addClass('invalid');
				var msg = '<H2>Informe o telefone com o DDD.</H2>';
				M.toast({
					html: msg,
					classes: 'card-panel  red accent-4 white-text'
				});

				atende = false;
			} else {
				input.DDD.removeClass('invalid');
				
			}

			if (!input.ADULTOS.val()) {
				log('ADULTOS VAZIO!');
				input.ADULTOS.addClass('invalid');
				var msg = '<H2>Informe a quantidade de adultos.</H2>';
				M.toast({
					html: msg,
					classes: 'card-panel  red accent-4 white-text'
				});

				atende = false;
			} else {
				input.ADULTOS.removeClass('invalid');
				
			}


			if (atende) {
				log('Atendeu!');
				input.NOME_RESERVA.removeClass('invalid');
				input.EMAIL_RESERVA.removeClass('invalid');
				input.ENTRADA.removeClass('invalid');
				input.SAIDA.removeClass('invalid');
				input.ADULTOS.removeClass('invalid');

				set = {
					requisicao: 'reserva',
					nome: input.NOME_RESERVA.val(),
					email: input.EMAIL_RESERVA.val(),
					ddd: input.DDD_RESERVA.val(),
					telefone: input.TELEFONE_RESERVA.val(),
					entrada: input.ENTRADA.val(),
					saida: input.SAIDA.val(),
					adultos: input.ADULTOS.val(),
					criancas: input.CRIANCAS.val(),
					obs: input.OBSERVACOES.val(),
					chave: configuracoes.SALT_SISTEMA
				};

				log(JSON.stringify(set));

				$.ajax({ //Função AJAX
					url: api.FORMULARIOS.RESERVA.ENDPOINT,
					type: "post", //Método de envio
					data: JSON.stringify(set), //Dados
					beforeSend: function () {//antes de requisitar
					},
					success: function (result) { //Sucesso no AJAX
						log(' # resut');
						log(result);
						if (result.sucesso) {
							var msg = '<h2>Sua solicitação de reserva foi enviada!</h2>';
							M.toast({
								html: msg,
								classes: 'card-panel  green darken-1 white-text'
							});

							location.reload(false);

						} else {
							var msg = '<h2>' + result.mensagem + '</h2>';
							M.toast({
								html: msg,
								classes: 'card-panel  red accent-4 white-text'
							});
						}
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						log(' # XMLHttpRequest');
						log(XMLHttpRequest);
						log(' # textStatus');
						log(textStatus);
						log(' # errorThrown');
						log(errorThrown);
						var msg = '<h2>' + errorThrown + '</h2>';
						M.toast({
							html: msg,
							classes: 'card-panel  red accent-4 white-text'
						});

					},
					complete: function (jqXHR, textStatus) {
						log(' # jqXHR');
						log(jqXHR);
						log(' # textStatus');
						log(textStatus);

					}
				}).done(function (data) {
					log(' # done');
					log(data);

				}); //AJAX API
			}

		});
		$('#btn-enviar-form-contato').click(function (e) {
			log('O botão ENVIAR foi clicado');

			var atende = true;

			e.preventDefault();
			var botao = $(e.target);

			log(input.NOME.val());
			log(input.EMAIL.val());
			log(input.DDD.val() + ' ' + input.TELEFONE.val());
			log(input.ASSUNTO.val());
			log(input.MENSAGEM.val());

			if (!input.NOME.val()) {
				log('NOME VAZIO!');
				input.NOME.addClass('invalid');
				var msg = '<H2>Informe o seu nome.</H2>';
				M.toast({
					html: msg,
					classes: 'card-panel  red accent-4 white-text'
				});

				atende = false;
			} else {
				input.NOME.removeClass('invalid');
			}
			if (!input.EMAIL.val()) {
				log('E-MAIL VAZIO!');
				input.EMAIL.addClass('invalid');
				var msg = '<H2>Informe o e-mail.</H2>';
				M.toast({
					html: msg,
					classes: 'card-panel  red accent-4 white-text'
				});

				atende = false;
			} else {
				input.EMAIL.removeClass('invalid');
			}
			if (!input.ASSUNTO.val()) {
				log('ASSUNTO VAZIO!');
				input.ASSUNTO.addClass('invalid');
				var msg = '<H2>Informe o assunto.</H2>';
				M.toast({
					html: msg,
					classes: 'card-panel  red accent-4 white-text'
				});

				atende = false;
			} else {
				input.ASSUNTO.removeClass('invalid');
			}
			if (!input.MENSAGEM.val()) {
				log('MENSAGEM VAZIA!');
				input.MENSAGEM.addClass('invalid');
				var msg = '<H2>Informe a mensagem.</H2>';
				M.toast({
					html: msg,
					classes: 'card-panel  red accent-4 white-text'
				});

				atende = false;
			} else {
				input.MENSAGEM.removeClass('invalid');
			}
			if (!input.DDD.val() && input.TELEFONE.val()) {
				log('DDD OU TELEFONE VAZIO!');
				input.MENSAGEM.addClass('invalid');
				var msg = '<H2>Informe o telefone com o DDD.</H2>';
				M.toast({
					html: msg,
					classes: 'card-panel  red accent-4 white-text'
				});

				atende = false;
			} else {
				input.MENSAGEM.removeClass('invalid');
			}


			if (atende) {
				log('Atendeu!');
				input.NOME.removeClass('invalid');
				input.EMAIL.removeClass('invalid');
				input.ASSUNTO.removeClass('invalid');
				input.MENSAGEM.removeClass('invalid');

				set = {
					requisicao: 'contato',
					nome: input.NOME.val(),
					email: input.EMAIL.val(),
					ddd: input.DDD.val(),
					telefone: input.TELEFONE.val(),
					assunto: input.ASSUNTO.val(),
					mensagem: input.MENSAGEM.val(),
					chave: configuracoes.SALT_SISTEMA
				};

				log(JSON.stringify(set));

				$.ajax({ //Função AJAX
					url: api.FORMULARIOS.CONTATO.ENDPOINT,
					type: "post", //Método de envio
					data: JSON.stringify(set), //Dados
					beforeSend: function () {//antes de requisitar
					},
					success: function (result) { //Sucesso no AJAX
						log(' # resut');
						log(result);
						if (result.sucesso){
							var msg = '<h2>Sua mensagem foi enviada!</h2>';
							M.toast({
								html: msg,
								classes: 'card-panel  green darken-1 white-text'
							});

							location.reload(false);

						}else{
							var msg = '<h2>' + result.mensagem + '</h2>';
							M.toast({
								html: msg,
								classes: 'card-panel  red accent-4 white-text'
							});
						}
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						log(' # XMLHttpRequest');
						log(XMLHttpRequest);
						log(' # textStatus');
						log(textStatus);
						log(' # errorThrown');
						log(errorThrown);
						var msg = '<h2>' + errorThrown + '</h2>';
						M.toast({
							html: msg,
							classes: 'card-panel  red accent-4 white-text'
						});

					},
					complete: function (jqXHR, textStatus) {
						log(' # jqXHR');
						log(jqXHR);
						log(' # textStatus');
						log(textStatus);

					}
				}).done(function (data) {
					log(' # done');
					log(data);

				}); //AJAX API
			}

		});



	}); // end of document ready
})(jQuery); // end of jQuery name space