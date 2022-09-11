$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    togglerButton();
    scrollTop();
    settingShowHide();
    settingButtonToggle();
});

function togglerButton() {
    let windowPage  = $(window);
    let sidebar     = $('#sidebar');

    $('#toggler').click(function () { 
        $('#togglerDekstopIcon').toggleClass('fa-bars fa-xmark');
        $('#togglerMobileIcon').toggleClass('fa-bars fa-xmark');
        function checkWidth() {
            var windowSize = windowPage.width();
        
            if (windowSize >= 950) { // Dekstop
                sidebar.toggleClass('sidebar-toggled').removeClass('sidebar-toggled-responsive');
            }else if (windowSize >= 400 && windowSize <= 949){ // Ipad & Mobile
                sidebar.toggleClass('sidebar-toggled-responsive').removeClass('sidebar-toggled');
            }else{ // Minim Device
                sidebar.toggleClass('sidebar-toggled-responsive').removeClass('sidebar-toggled')
            }
        }

        checkWidth();
        $(windowPage).resize(checkWidth);
    });
}

function scrollTop() {
    $(window).scroll(function(){
        if ($(window).scrollTop() > 100) {
            $('#btnScrollTop').fadeIn();
        } else {
            $('#btnScrollTop').fadeOut();
        }
    });

    $('#btnScrollTop').click(function () {
        $('html, body').animate({scrollTop : 0}, 0);
    });
}

function settingShowHide() {
    $('#btnProfileInformation').click(function () {
        $('#profileInformationContainer').removeClass('d-none');
        $('#accountContainer').addClass('d-none');
        $('#securityContainer').addClass('d-none');
        $('#preferencesContainer').addClass('d-none');
    });

    $('#btnAccountSetting').click(function () {
        $('#profileInformationContainer').addClass('d-none');
        $('#accountContainer').removeClass('d-none');
        $('#securityContainer').addClass('d-none');
        $('#preferencesContainer').addClass('d-none');
    });

    $('#btnSecuritySetting').click(function () {
        $('#profileInformationContainer').addClass('d-none');
        $('#accountContainer').addClass('d-none');
        $('#securityContainer').removeClass('d-none');
        $('#preferencesContainer').addClass('d-none');
    });

    $('#btnPreferences').click(function () {
        $('#profileInformationContainer').addClass('d-none');
        $('#accountContainer').addClass('d-none');
        $('#securityContainer').addClass('d-none');
        $('#preferencesContainer').removeClass('d-none');
    });
}

function settingButtonToggle () {
    // Read, Write, Update File Json
    $.get("/assetdb/setting.json", function (response) {
        $('#btnTransitionSet').click(function () {
            if ($(this).text() == "Aktifkan") {
                $(this).text('Nonaktifkan').toggleClass('btn-primary btn-danger');
                $('body').addClass('transition');
                editSettingJson('0' ,'transition', 'true');
            }else{
                $(this).text('Aktifkan').toggleClass('btn-primary btn-danger');
                $('body').removeClass('transition');
                editSettingJson('0' ,'transition', 'false');
            }
        });

        if (response[0].setId == '0' && response[0].setVal == 'true') {
            $('#btnTransitionSet').text('Nonaktifkan').addClass('btn-danger').removeClass('btn-primary');
            $('body').addClass('transition');
        }else {
            $('#btnTransitionSet').text('Aktifkan').addClass('btn-primary').removeClass('btn-danger');
            $('body').removeClass('transition');
        }
    });
}

// Proses Update File JSON
function editSettingJson(idSet, keySet, valSet) {
    $.ajax({
        type: "POST",
        url: "/user-setting/update",
        data: {
            id : idSet,
            key : keySet,
            val : valSet
        },
        dataType: "json",
        success: function (res) {
            
        }
    });
}

/* Format Rupiah Output*/
function rupiahOutput (bilangan) {
    var	reverse = bilangan.toString().split('').reverse().join(''),
        rupiah 	= reverse.match(/\d{1,3}/g);
        rupiah	= rupiah.join('.').split('').reverse().join('');
    
    // Cetak hasil	
    return "Rp. " + rupiah;
}