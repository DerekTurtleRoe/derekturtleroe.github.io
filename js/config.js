window._skel_config = {
prefix: 'css/style',
pollOnce: true,
resetCSS: true,
useOrientation: false,
breakpoints: {
'mobile': {
range: '-480',
lockViewport: true,
containers: 'fluid',
grid: {
collapse: true
}
},
'desktop': {
range: '481-',
containers: 1200
}
}
};
jQuery(window).load(function() {
jQuery.fn.n33_formerize=function(){var _fakes=new Array(),_form = jQuery(this);_form.find('input[type=text],textarea').each(function() { var e = jQuery(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = jQuery(this); var x = jQuery(jQuery('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = jQuery(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = jQuery(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { jQuery(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); jQuery(this).find('select').val(jQuery('option:first').val()); jQuery(this).find('input,textarea').each(function() { var e = jQuery(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
var settings = {
resizeSpeed:	600,
fadeSpeed:		300,
sizeFactor:		11.5,
sizeMin:		15,
sizeMax:		20
};
var	_window = jQuery(window),
_main = jQuery('#main'),
_panels = _main.find('.panel'),
_body = jQuery('body'),
_hbw = jQuery('html,body,window'),
_footer = jQuery('#footer'),
_wrapper = jQuery('#wrapper'),
_nav = jQuery('#nav'), _nav_links = _nav.find('a'),
_jumplinks = jQuery('.jumplink');
var	panels = [],
activePanelId = null,
firstPanelId = null,
isLocked = false,
isTouch = !!('ontouchstart' in window),
isLegacyIE = (navigator.userAgent.match(/MSIE ([0-9]+)\./) && RegExp.$1 <= 9);
if (isTouch)
{
settings.fadeSpeed = 0;
settings.resizeSpeed = 0;
_nav_links.find('span').remove();
}
if (isLegacyIE || skel.isActive('desktop'))
{
_body.h5u_resize = function() {
var factor = (_window.width() * _window.height()) / (1440 * 900);
_body.css('font-size', Math.min(Math.max(Math.floor(factor * settings.sizeFactor), settings.sizeMin), settings.sizeMax) + 'pt');
_main.height(panels[activePanelId].outerHeight());
_body.h5u_reposition();
};
_body.h5u_reposition = function() {
if (isTouch && (window.orientation == 0 || window.orientation == 180))
_wrapper.css('padding-top', Math.max(((_window.height() - (panels[activePanelId].outerHeight() + _footer.outerHeight())) / 2) - _nav.height(), 30) + 'px');
else
_wrapper.css('padding-top', (((_window.height() - panels[firstPanelId].height()) / 2) - _nav.height()) + 'px');
};
_panels.each(function(i) {
var t = jQuery(this), id = t.attr('id');
panels[id] = t;
if (i == 0)
{
firstPanelId = id;
activePanelId = id;
}
else
t.hide();
t.h5u_activate = function() {
if (isLocked
||	activePanelId == id)
return false;
isLocked = true;
_nav_links.removeClass('active');
_nav_links.filter('[href="#' + id + '"]').addClass('active');
var x = parseInt(_wrapper.css('padding-top')) +
panels[id].outerHeight() +
_nav.outerHeight() +
_footer.outerHeight();
if (x > _window.height())
_wrapper.addClass('tall');
else
_wrapper.removeClass('tall');
_footer.fadeTo(settings.fadeSpeed, 0.0001);
panels[activePanelId].fadeOut(settings.fadeSpeed, function() {
activePanelId = id;
_hbw.animate({
scrollTop: 0
}, settings.resizeSpeed, 'swing');
_body.h5u_reposition();
_main.animate({
height: panels[activePanelId].outerHeight()
}, settings.resizeSpeed, 'swing', function() {
_footer.fadeTo(settings.fadeSpeed, 1.0);
panels[activePanelId].fadeIn(settings.fadeSpeed, function() {
isLocked = false;
});
});
});
};
});
_nav_links.add(_jumplinks).click(function(e) {
var t = jQuery(this), href = t.attr('href'), id;
if (href.substring(0,1) == '#')
{
e.preventDefault();
e.stopPropagation();
id = href.substring(1);
if (id in panels)
panels[id].h5u_activate();
}
});
_window
.resize(function() {
if (!isLocked)
_body.h5u_resize();
});
if (isLegacyIE)
jQuery('form').n33_formerize();
_window
.trigger('resize');
_wrapper
.fadeTo(400, 1.0);
}
});