$(function () {
	
	
	var musicLists = [
		{
			musicTitle : 'Flies',
			musicUrl : './audio/01.mp3'
		},
		{
			musicTitle : 'The Good Kind',
			musicUrl : './audio/02.mp3'
		},
		{
			musicTitle : 'Romans',
			musicUrl : './audio/03.mp3'
		},
		{
			musicTitle : 'Wrecking Ball',
			musicUrl : './audio/04.mp3'
		},
		{
			musicTitle : 'Shovels',
			musicUrl : './audio/05.mp3'
		},
		{
			musicTitle : 'Who I Was',
			musicUrl : './audio/06.mp3'
		},
		{
			musicTitle : 'Perfection Wasted',
			musicUrl : './audio/07.mp3'
		},
		{
			musicTitle : 'Windburnt Soul',
			musicUrl : './audio/08.mp3'
		},
		{
			musicTitle : 'Cleansing Sea',
			musicUrl : './audio/09.mp3'
		},
		{
			musicTitle : 'Turncoats',
			musicUrl : './audio/10.mp3'
		},
		{
			musicTitle : 'Graces',
			musicUrl : './audio/11.mp3'
		},
		{
			musicTitle : 'Hellion',
			musicUrl : './audio/12.mp3'
		}
	];
	var $musicList = $('#music_list');
	var obj = $musicList.buildMusicList({
		musicList : musicLists
	});
	/* 按钮初始化 */
	var $toTop = $('footer[role="footer"] hgroup'), $play = $('article div.play');
	
	$play.each(function () {
		var $this = $(this),index = $this.attr('data-index');
		$this.click(function () {
			$play = $('article div.play[data-index != "'+ index +'"]').removeClass("playing");
			$this.toggleClass("playing");
			if($this.hasClass("playing")) obj.selectMusic(index);
			else obj.pause();
		});
		
	});
	
	$toTop.click(function () {
		$('body,html').animate({scrollTop:0},3000);
	});
});

/* 播放器方法 */
(function ($) {
	
	$.fn.buildMusicList = function (settings) {
	
		var creatMusicList = function (elem) {
			var musicList = settings.musicList,$playList = $('#play_list');
			
			
			var html = [],playHtml = [];
			$.each(musicList,function (i,node) {
				html.push( '<li data-index="'+ i +'" >'+ node['musicTitle'] +'</li>');
				playHtml.push('<source data-index="'+ i +'"  src="'+ node['musicUrl'] +'" type="audio/mp3">');
			} );
			elem.html(html.join(""));
			$playList.html(playHtml.join(""));
			var $musicList = elem.find('li'),count = $musicList.length,$mpNext = $('#mp_next'),$mpPrevious = $('#mp_previous'),$mpPlay = $('#mp_play'),$mpPause = $('#mp_pause')
				,$player = $('#play_list'),$playList = $player.find('source'),$recardItem = $('#recard_item'),currentSrcIndex = 0;
		
			$musicList.eq(0).addClass('current');
			
			
			/* 选择音乐 */
			var selectMusic = function (index) {
				var $musicList = elem.find('li');
				$musicList.removeClass('current');
				$musicList.eq(index).addClass('current');
			    playerCheck(index);
			};
			/* 旋转动作 */
			var rotateEvent = function (flag) {
				var time = $player[0].duration,currentTime = $player[0].currentTime,rotateFlag = time - currentTime;
				$recardItem.css({
					'-webkit-transform':'rotate('+ ((flag?time:currentTime)/8)*360 +'deg)',
					'-webkit-transition':'all '+ (flag?rotateFlag:0) +'s linear'
				});
			}
			/* 播放动作 */
			var playerClick = function () {
				$player[0].play();
				rotateEvent(true);
			}
			/* 选择音乐动作 */
			var playerCheck = function (index) {
				currentSrc = $playList.eq(index).prop("src");
				$player[0].src = currentSrc;
				rotateReset();
				setTimeout(function () {
					$mpPlay.click();
				},100);
			
			}
			/* 旋转重置 */
			var rotateReset = function () {
				$recardItem.css({
					'-webkit-transform':'rotate(0deg)',
					'-webkit-transition':'all 0s linear'
				});
			};
			/* 播放器按键初始化 */
			$mpPlay.click(function () {
				$mpPlay.hide();
				$mpPause.show();
				playerClick();
			});
			$mpPause.click(function () {
				$mpPause.hide();
				$mpPlay.show();
				$player[0].pause();
				rotateEvent(false);
			});
			$mpNext.click(function () {
				var $index = elem.find('.current').attr('data-index');
				$index = Number($index) + 1 >= count ? 0 : Number($index) + 1;
				selectMusic($index);
			});
			$mpPrevious.click(function () {
				var $index = elem.find('.current').attr('data-index');
				$index = Number($index) - 1 < 0 ? Number(count) - 1 : Number($index) - 1;
				selectMusic($index);
			});
			
			setInterval(function () {
				if($player[0].ended){
					$mpNext.click();
				}
			},1000);
			
			var extendsInterFace = {
				selectMusic : selectMusic,
				pause : function () {$mpPause.click()}
			};
			return extendsInterFace;
		};
		
		
		var $this = $(this);
		return creatMusicList($this);
		
	};
	
}) (jQuery);