! function () {
    function t() {
        j = document.getElementById("_remote"), w = document.getElementById("remote-toggle-mobile"), C = document.getElementById("clear-text"), k = document.getElementById("clear-button-mobile"), x = document.getElementById("job-title-search"), L = document.getElementById("close-icon"), E = 0, B = [{
            id: "department_id"
        }, {
            id: "work_type_id"
        }, {
            id: "city_id"
        }, {
            id: "job-title-search"
        }];
        var t = e();
        r(), c(t), a(), l(), p(), _(t), h()
    }

    function e() {
        var t = {
                location: [],
                department: [],
                jobType: [],
                title: "",
                isRemoteLocation: !1
            },
            e = decodeURI(window.location.search).substring(1);
        e = e.split("&");
        for (var o = 0; o < e.length; o++) {
            var i = e[o].split("=");
            if (i.length > 1) {
                var l = i[0],
                    a = i[1];
                "object" != typeof t[l] && "boolean" != typeof t[l] || (a = JSON.parse(a)), t[l] = a
            }
        }
        return t
    }

    function o() {
        $("select").val("").change(), x.value = "", n("none"), E = 0, s(!1), _(), $(".select2-container").removeClass("form-control-highlight"), $("#job-title-search").removeClass("form-control-highlight"), L.style.display = "none"
    }

    function i() {
        var t = $("#job-title-search").val(),
            e = $("#_remote, #remote-toggle-mobile").prop("checked");
        t || E || e ? (t ? ($("#job-title-search").addClass("form-control-highlight"), L.style.display = "inline") : ($("#job-title-search").removeClass("form-control-highlight"), L.style.display = "none"), n("inline-block")) : (n("none"), L.style.display = "none", $("#job-title-search").removeClass("form-control-highlight"), $("#job-title-search").removeClass("form-control-highlight"))
    }

    function l() {
        B.forEach(function (t) {
            var e = $("#" + t.id);
            "job-title-search" !== t.id && e.find(":selected").length > 0 && (E += e.find(":selected").length, $("#" + t.id).next(".select2-container").addClass("form-control-highlight")), i()
        })
    }

    function a() {
        B.forEach(function (t) {
            var e = $("#" + t.id);
            "job-title-search" === t.id ? e.on("input", function () {
                i()
            }) : ("city_id" === t.id && e.on("select2:open", function () {
                0 === e.find(":selected").length && $('input[aria-controls="select2-city_id-results"]').prop("placeholder", e.attr("data-search-text"))
            }), e.on("select2:select", function () {
                E++, e.find(":selected").length > 0 && ($("#" + t.id).next(".select2-container").addClass("form-control-highlight"), i())
            }), e.on("select2:unselect", function () {
                E--, i(), 0 === e.find(":selected").length && $("#" + t.id).next(".select2-container").removeClass("form-control-highlight"), e.on("select2:opening", function (t) {
                    t.preventDefault(), e.off("select2:opening")
                })
            }))
        })
    }

    function n(t) {
        C.style.display = t, k.style.display = t
    }

    function d(t) {
        var e = $("#" + t),
            o = e.parent();
        e.select2({
            closeOnSelect: !0,
            allowClear: !0,
            multiple: !0,
            dropdownParent: o,
            templateSelection: function () {
                var t = e.find(":selected").length;
                return e.attr("data-selected-text") + " (" + t + ")"
            },
            templateResult: function (t) {
                var e = '<span class="icon-tick"><svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.18005 6.17997L5.18005 9.32997L14.1501 0.869974C14.4801 0.539973 15.0201 0.569974 15.3501 0.899974C15.68011.22997 15.6501 1.76997 15.3201 2.09997L5.72005 11.13C5.39005 11.46 4.85005 11.43 4.52005 11.1L0.950052 7.31997C0.6200526.98997 0.650052 6.44997 0.980052 6.11997C1.34005 5.81997 1.85005 5.81997 2.18005 6.17997Z" fill="#183247"/></svg>',
                    o = $("<div><label></label>" + e + "</div>");
                return o.find("label")[0].textContent = t.text, o
            }
        })
    }

    function r() {
        var t = [{
                id: "city_id"
            }, {
                id: "department_id"
            }, {
                id: "work_type_id"
            }],
            e = {};
        $("#city_id > option").each(function () {
            return e[this.text] ? $(this).remove() : e[this.text] = this.text
        }), t.forEach(function (t) {
            d(t.id)
        })
    }

    function c(t) {
        var e = {
            location: "#city_id",
            department: "#department_id",
            jobType: "#work_type_id"
        };
        for (var o in t) e[o] ? $(e[o]).val(t[o]).trigger("change") : "title" !== o ? "isRemoteLocation" === o && $("#_remote, #remote-toggle-mobile").prop("checked", t.isRemoteLocation) : $("#job-title-search").val(t.title)
    }

    function s(t) {
        $("#_remote, #remote-toggle-mobile").prop("checked", t), p()
    }

    function h() {
        $("#city_id, #department_id, #work_type_id").on("change", function () {
            _()
        }), $("#_remote, #remote-toggle-mobile").on("click", function (t) {
            s(t.target.checked)
        }), $("#job-title-search").keyup(function () {
            y && clearTimeout(y), y = setTimeout(function () {
                _()
            }, 400)
        }), (C || k) && (C.addEventListener("click", o), k.addEventListener("click", o)), document.getElementById("close-icon").addEventListener("click", function () {
            x.value = "", $("#job-title-search").removeClass("form-control-highlight"), L.style.display = "none", _(), i()
        })
    }

    function p() {
        j && j.checked || w && w.checked ? ($("#city_id").next(".select2-container").addClass("hide-location"), $("#city_id").val("")) : ($("#city_id").next(".select2-container").removeClass("hide-location"), $("#city_id").find(":selected").length ? $("#city_id").next(".select2-container").addClass("form-control-highlight") : $("#city_id").next(".select2-container").removeClass("form-control-highlight")), $("#city_id").trigger("change")
    }

    function f() {
        var t = {};
        return t.location = $("#city_id").select2("val"), t.department = $("#department_id").select2("val"), t.jobType = $("#work_type_id").select2("val"), t.title = $("#job-title-search").val(), t.isRemoteLocation = $("#_remote, #remote-toggle-mobile").is(":checked"), t
    }

    function m(t) {
        var e = "?";
        for (var o in t) {
            e += o + "=" + ("object" == typeof t[o] ? JSON.stringify(t[o]) : t[o]) + "&"
        }
        e = e.slice(0, -1), window.history.pushState({
            path: e
        }, "", e)
    }

    function g(t, e, o) {
        o.length && -1 === o.indexOf($(t).attr(e)) && $(t).removeClass("hide show").addClass("hide")
    }

    function u(t) {
        t.department && t.department.length > 0 && $('[data-portal-id="job-role-list"] li[data-portal-role^="_role"]').each(function (e, o) {
            var i = $(o).attr("data-portal-role").replace("_role_", ""); - 1 === t.department.indexOf(i) && $('[data-portal-id="job-role-list"] li[data-portal-role="_role_' + i + '"]').removeClass("hide show").addClass("hide")
        }), $('[data-portal-id="job-role-list"] a.heading.show').each(function (e, o) {
            g(o, "data-portal-location", t.location), g(o, "data-portal-job-type", t.jobType)
        })
    }

    function b() {
        $('[data-portal-id="job-role-list"] li[data-portal-role^="_role"].show').each(function (t, e) {
            var o = $(e).find("a.show").length;
            $(e).find('[data-portal-id="jobs-count"], [data-portal-id="mobile-jobs-count"]').html(o), o > 1 ? ($(e).find('[data-portal-job-count="multiple-job"]').show(), $(e).find('[data-portal-job-count="single-job"]').hide()) : ($(e).find('[data-portal-job-count="single-job"]').show(), $(e).find('[data-portal-job-count="multiple-job"]').hide())
        })
    }

    function v() {
        $('[data-portal-id="jobs_list"] li[data-portal-role^="_role"].show').length ? ($('[data-portal-id="no_data"]').hide(), $('[data-portal-id="jobs_list"]').show()) : ($('[data-portal-id="jobs_list"]').hide(), $('[data-portal-id="no_data"]').show())
    }

    function _(t) {
        if (t || (t = f(), m(t)), $('[data-portal-id="job-role-list"] li[data-portal-role^="_role"]').removeClass("hide show").addClass("show"), $('[data-portal-id="job-role-list"] a.heading').removeClass("hide show").addClass("show"), $('[data-portal-id="jobs_list"]').show(), u(t), t.isRemoteLocation && $('[data-portal-id="job-role-list"] a.heading[data-portal-remote-location="false"]').removeClass("hide show").addClass("hide"), t.title) {
            var e = t.title.toLocaleLowerCase().replace(" ", "");
            $('[data-portal-id="job-role-list"] li[data-portal-role^="_role"].show a.heading.show').each(function (t, o) {
                -1 === $(o).attr("data-portal-title").indexOf(e) && $(o).removeClass("hide show").addClass("hide")
            })
        }
        $('[data-portal-id="job-role-list"] li[data-portal-role^="_role"]').each(function (t, e) {
            !$(e).find("a.show").length && $(e).removeClass("hide show").addClass("hide")
        }), i(), b(), v()
    }
    var y, j, w, C, k, x, L, E, B = [{
        id: "department_id"
    }, {
        id: "work_type_id"
    }, {
        id: "city_id"
    }, {
        id: "job-title-search"
    }];
    t()
}();

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}