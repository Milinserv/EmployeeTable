$(document).ready(function () {
    $("#addUserForm").click(function () {
        const gender = document.querySelector('input[name="gender"]:checked')?.value;

        const data = {
            'last_name': $('#last_name').val(),
            'first_name': $('#first_name').val(),
            'middle_name': $('#middle_name').val(),
            'date_of_birth': $('#date_of_birth').val(),
            'gender': gender === 'false' ? 0 : 1
        };

        $.ajax({
            url: "src/index.php?action=createUser",
            type: "POST",
            data: {
                'user': data
            },
            success: function (res) {
                const data = JSON.parse(res);
                const stateDiv = $('#stateCreateUser');

                data.state === 'success'
                    ? stateDiv.append('<h5 class="text-success">Пользователь создан</h5>')
                    : stateDiv.append('<h5 class="text-danger">Ошибка создания пользователя</h5>')
                data.state === 'success' && setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        });
    });
});

function changeUser(id) {
    $('#changeUserForm').click(function (){
        const gender = document.querySelector('input[name="gender"]:checked')?.value;

        const data = {
            'id': id,
            'last_name': $('#last_name_change').val(),
            'first_name': $('#first_name_change').val(),
            'middle_name': $('#middle_name_change').val(),
            'date_of_birth': $('#date_of_birth_change').val(),
            'gender': gender === 'false' ? 0 : 1
        };
        $.ajax({
            url: "src/index.php?action=changeUser",
            type: "POST",
            data: {
                'user': data
            },
            success: function (res) {
                const data = JSON.parse(res);
                const stateDiv = $('#stateChangeUser');

                data.state === 'success'
                    ? stateDiv.append('<h5 class="text-success">Пользователь изменен</h5>')
                    : stateDiv.append('<h5 class="text-danger">Ошибка изменения пользователя</h5>')
                data.state === 'success' && setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        });
    })
}
function deleteUser(id) {
    $("#delete").click(function (){
        $.ajax({
            url: "src/index.php?action=deleteUser",
            type: "POST",
            data: {
                'user': id
            },
            success: function (res) {
                const data = JSON.parse(res);
                const stateDiv = $('#stateDeleteUser');

                data.state === 'success'
                    ? stateDiv.append('<h5 class="text-success">Пользователь удален</h5>')
                    : stateDiv.append('<h5 class="text-danger">Ошибка удаления пользователя</h5>')
                data.state === 'success' && setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        });
    });
}


