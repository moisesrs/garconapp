$('.collection-item').on('click', function(){
	var $badge = $('.badge', this);
	if ($badge.length == 0) {
		$badge = $('<span class="badge brow-text">0</span>').appendTo(this);
	}

	$badge.text(parseInt($badge.text()) + 1);

	var produto = this.firstChild.textContent;
	Materialize.toast(produto + ' adicionado', 1000);

});

$('#confirmar').on('click', function() {

	var texto = '';

	$('.badge').parent().each(function(){
	var produto = this.firstChild.textContent;
	var quantidade = this.lastChild.textContent;

    texto += produto + ' : ' + quantidade + '<br>';
	})

	//$('#resumo').text('Os Produtos selecionados são: <p>' + texto);
	$('#resumo').html('Os Produtos selecionados são: <br>' + texto) ;
});

$('.modal-trigger').leanModal();


$('.collection').on('click', '.badge', function(){

	//$(this).remove();
	//$(this).text(parseInt($(this).text()) - 2);

	var num = parseInt($(this).text(),10);
    if (num >= 1) {
        $(this).text(num - 2);
    } else {
        $(this).remove();
    }
	return false;
});


$('.acao-limpar').on('click', function(){
	$('#numero-mesa').val('');
	$('.badge').remove();
});


$('.scan-qrcode').click(function(){
	cordova.plugins.barcodeScanner.scan(
		function(resultado){
			if (resultado.text) {
				Materialize.toast('Mesa : ' + resultado.text, 2000);
				$('#numero-mesa').val(resultado.text);
		    }
	    },
	    function(erro){
		Materialize.toast('Erro : ' + erro, 2000, 'red-tex');
	    }
    );
});


$('.acao-finalizar').click(function(){
	$.ajax({
		url: 'http://cozinhapp.sergiolopes.org/novo-pedido',
		data: {
			mesa: $('#numero-mesa').val(),
			pedido: $('#resumo').text()
		},
		success: function(resposta) {
			Materialize.toast(resposta, 2000);

			$('#numero-mesa').val('');
			$('#badge').remove();
		},
		error: function(erro){
			Materialize.toast(erro.responseText, 3000, 'red-text');
		} 
	});

	navigator.vibrate(3000);
});

