$(() => {
    $("#btn-register").on("click", (e) => {
        e.preventDefault();
        const name = $("#name").val();
        const username = $("#username").val();
        const email = $("#email").val();
        const password = $("#password").val();

        const user = {
            name,
            username,
            email,
            password,
        };
        if (name !== "" && username !== "" && email !== "" && password !== "") {
            $.ajax({
                url: "http://localhost:20617/user/register",
                type: "POST",
                data: user,
            }).done((data) => {
                if (data.result === "redirect") {
                    window.location.replace(data.url);
                }
            });
        } else {
            alert("error!");
        }
    });

    $('#btn-login').on('click', (e) => {
        e.preventDefault();
        const username = $("#username").val();
        const password = $("#password").val();

        const user = {
            username,
            password,
        }
        if (username !== "" && password !== "") {
            $.ajax({
                url: "http://localhost:20617/user",
                type: "POST",
                data: user,
            }).done((data) => {
                if (data.result === "redirect") {
                    window.location.replace(data.url);
                }
            });
        } else {
            alert("error!");
        }

    })

    $('#logout').on('click',(e)=>{
        window.location.replace('http://localhost:20617/');
        alert("Đăng xuất thành công")
    })

    $('#search').on('click',(e)=>{
        e.preventDefault();
        const search = $("#searchval").val();

        if (search !== "") {
            $.ajax({
                url: `http://localhost:20617/movie/search/${search}`,
                type: "POST",
                data: {search:search},
            }).done((data) => {
                if (data.result === "redirect") {
                    window.location.replace(data.url);
                }
            });
        }
    })
    $('#search-cast').on('click',(e)=>{
        e.preventDefault();
        const search = $("#searchval").val();

        if (search !== "") {
            $.ajax({
                url: `http://localhost:20617/cast/search/${search}`,
                type: "POST",
                data: {search:search},
            }).done((data) => {
                if (data.result === "redirect") {
                    window.location.replace(data.url);
                }
            });
        }
    })

    $('#btn-fav').on('click',(e)=>{
        e.preventDefault();
        const search = $("#btn-fav").val();

        if (search !== "") {
            $.ajax({
                url: `http://localhost:20617/movie/favorite/${search}`,
                type: "POST",
                data: {search:search},
            }).done((data) => {
                
            });
        }
    })

});
