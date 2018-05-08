$(function() {
		var url = "https://ntuaf24.backme.tw/api/projects.json?token=de72b2a1ca3169a389e739c5918e792b";

		var rewards 			= [];
		var rewards_uniq 	= [];

		$('.content-size').on('click', '.item', function(e) {

			item_id = $(e.currentTarget).attr('data-id');
			window.open('https://ntuaf24.backme.tw/checkout/800/'+ item_id +'?locale=zh-TW', '_blank');

		});

		function changeCategory(category) {

			if (category == '全部') {

				$('.item').each(function() {
					$('.item').each(function() {
						$(this).parent().css('display', 'block');
					});
				})
			} else {
				$('.item').each(function() {
					if ( $(this).attr('data-category') == category ) {
						$(this).parent().css('display', 'block');
					} else {
						$(this).parent().css('display', 'none');
					}
				});
			} 

		};

		$('#item-category').on('click', 'li a', function(e){

			e.preventDefault();

			$('#item-category li').removeClass('active');
			$(e.target).parent().addClass('active');
			
			category = $(e.currentTarget)[0].text;

			window.location.hash = category;

			changeCategory(category);

		});

		$.getJSON(url,function( data ){
			data = data[0];

			console.log(data);

			let now_time = Date.now();
			let proj_end = Date.parse(data.end_date);

			if (now_time > proj_end) {
				window.location.href = "https://ntuaf24.backme.tw/shops/800";
			}

			for (i in data.rewards) {
				rewards.push( data.rewards[i].category );

				// inventory = data.rewards[i].quantity_limit - data.rewards[i].wait_count - data.rewards[i].backer_count;
				inventory = data.rewards[i].quantity_limit - data.rewards[i].pledged_count - data.rewards[i].wait_pledged_count;

				if (inventory < 0) {inventory = 0;}

				if (data.rewards[i].quantity_limit == 0) {

					$(".sec1 .content .content-size").append('\
							<div class="col-md-4 col-sm-6 col-xs-6">\
			          <div class="item" data-id="'+ data.rewards[i].id +'" data-category="'+ data.rewards[i].category +'">\
			            <div class="item-pic" style="background-image: url('+ data.rewards[i].avatar.url +');">\
			              <div class="dark-cover">\
			              </div>\
			            </div>\
			            <div class="item-content">\
			              <h4>'+ data.rewards[i].title +'</h4>\
			              <span class="instock "></span>\
			              <span class="price ">NT$ '+ data.rewards[i].price +'</span>\
			              <div id="quick-buy" class="btn quick-buy">\
			                購買\
			              </div>\
			            </div>\
			          </div>\
			        </div>\
						');

				} else {

					$(".sec1 .content .content-size").append(
							'<div class="col-md-4 col-sm-6 col-xs-6">' +
			          '<div class="item" data-id="'+ data.rewards[i].id +'" data-category="'+ data.rewards[i].category +'">' +
			            '<div class="item-limit-label">' +
			              '限量 '+ data.rewards[i].quantity_limit +' 組' +
			            '</div>\
			            <div class="item-pic" style="background-image: url('+ data.rewards[i].avatar.url +');">\
			              <div class="dark-cover">\
			              </div>\
			            </div>\
			            <div class="item-content">\
			              <h4>'+ data.rewards[i].title +'</h4>\
			              <span class="instock ">庫存剩 '+ inventory +' 組</span>\
			              <span class="price ">NT$ '+ data.rewards[i].price +'</span>\
			              <div id="quick-buy" class="btn quick-buy">\
			                購買\
			              </div>\
			            </div>\
			          </div>\
			        </div>\
						');

				}
			}

			for (i in data.rewards) {
				if ( rewards_uniq.indexOf(data.rewards[i].category) == -1 ){
					category = data.rewards[i].category;
					rewards_uniq.push(category);

					$("#item-category").append('<li role="presentation" data-category="'+ category +'""><a href="#">'+ category +'</a></li>');
				}
			}

			if(window.location.hash) {
				var hash = window.location.hash.substring(1);
				var decode = decodeURIComponent(hash);

				console.log(decode)
				changeCategory( decode );

				$('#item-category li').removeClass('active');
				$('#item-category li[data-category="'+ decode +'"]').addClass('active');

			}

			// console.log(rewards_uniq);
		});
		
	});