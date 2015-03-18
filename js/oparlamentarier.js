jQuery(document).ready(function($) {
	$.extend({
  		getUrlVars: function(){
    		var vars = [], hash;
		    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		    for(var i = 0; i < hashes.length; i++)
		    {
		      hash = hashes[i].split('=');
		      vars.push(hash[0]);
		      vars[hash[0]] = hash[1];
		    }
		    return vars;
	  	},
	  	getUrlVar: function(name){
	    	return $.getUrlVars()[name];
	  	}
	});

	if ($('#root').length) {
		console.log('called');
		$.ajax({
			url: 'https://politik-bei-uns.de/oparl/body',
			dataType: 'json',
		})
		.done(function(data) {
			bodies = [];
			console.log(data);
			list = document.createElement("ul");
			$.each(data, function(index, val) {
				val = val.replace('?html=1', '');
				$.ajax({
					url: val,
					dataType: 'json',
				})
				.done(function(data) {
					bodies.push(data);
					console.log(bodies);
					$(list).append('<li><a href ="body?id=' + index + '">' + data.name +'</a></li>');
					localStorage["body"] = JSON.stringify(bodies);
				})
				.fail(function() {
					console.log("error: could not load from body");
				})
			});
			$('.rat').append(list);
			console.log(bodies);
		})
		.fail(function() {
			console.log("error: couldn't load from politik bei uns");
		});
	}

	if ($('#body').length) {
		var bodies = JSON.parse(localStorage.getItem("body"));
		var url = bodies[$.getUrlVar('id')].person;
		$.ajax({
			url: url,
			dataType: 'json',
		})
		.done(function(member) {
			list = document.createElement("ul");
			$.each(member, function(index, val) {
				$.ajax({
					url: val,
					dataType: 'json'
				})
				.done(function() {
					$(list).append('<li><a href ="body?id=' + indexn + '">' + val +'</a></li>');
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				});
				
				
			});
			$('.container').append(list)
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	}
});