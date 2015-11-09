$(document).ready(function() {
	/*num*/
	$("body").on("click", ".box-num .ui-btn", function() {
		var $this = $(this);
		var $text = $this.siblings(".ui-input-text").find("input");
		var num = parseInt($text.val());
		if ($this.find(".left").length == 1) {
			num--;
			if (num == 0) {
				alert("删除");
				return false;
			} else {
				$text.val(num);
			}
		} else if ($this.find(".right").length == 1) {
			num++;
			$text.val(num);
		}
	});
	/*返回顶部*/
	$(window).on("scroll", function(){
		if($("body").scrollTop() > 0){
			$("#goTop").show();
		}
	});
	$("body").on("click", "#goTop", function(){
		$("body").scrollTop(0);
		$(this).fadeOut();
	});
	/*筛选*/
	$("body").on("click", ".box-nav a,.box-nav span", function(e){
		var $this = $(this);
		var $next = $this.siblings("ul");
		if($next.length == 1){
			if($next.is(":hidden")){
				$next.slideDown();
			}else{
				$next.slideUp();
			}
		}else{
			$this.closest(".item").find("span").text($this.text()).addClass("color-f30");
			e.preventDefault();
		}
	});
	/*tabs*/
	$(".ui-tabs .ui-tabs-nav a:eq(0)").trigger("click");
	//轮播图
	(function(){
		var $banner = $(".banner ul");
		var $num = $banner.next(".num");
		var $bannerItem = $banner.find("li");
		$num.text("1/" + $bannerItem.length);
		$bannerItem.width($bannerItem.width());
		$banner.width($bannerItem.length * $bannerItem.width());
		window.addEventListener("load", function(){
			$banner.closest(".banner").height($banner.height());
		});
		$bannerItem.each(function(e){
			$(this).data("data-index", (e + 1)); 
		});
		
		//向左滑
		$("body").on("swipeleft", ".banner li", function(e){
			if(!$banner.is(":animated")){
				var $this = $(this);
				var index = $this.index();
				var width = $this.width();
				$banner.animate({
					"left": -width + "px"
				}, 1000, function(){
					$this.appendTo($banner);
					$banner.css("left", 0);
					$num.text($this.data("data-index") + 1 + "/" + $bannerItem.length);
				});
			}
		});
		//向右滑
		$("body").on("swiperight", ".banner li", function(e){
			if(!$banner.is(":animated")){
				var $this = $(this);
				var index = $this.index();
				var width = $this.width();
				$banner.css("left", -width + "px");
				$banner.find("li:last-child").prependTo($banner);
				$banner.animate({
					"left": "0px"
				}, 1000, function(){
					var num = $this.data("data-index") - 1 == 0 ? 3 : ($this.data("data-index") - 1);
					$num.text(num + "/" + $bannerItem.length);
				});
			}
		});
	})();
});