// Survey questions
var questions = [
    "You enjoy spending time at home more than a night out.",
    "You carefully plan events rather than act on impulse.",
    "You strongly value the opinions of others while making a decision.",
    "A friend should drop everything to help a friend in need.",
    "It is best to confront and talk with a friend if conflict arises.",
    "Dogs are superior to cats.",
    "You enjoy spending my time in nature.",
    "Live music is the best form of entertainment.",
    "A sense of humor is the most important quality in a friend.",
    "Nothing beats a good road trip."
];

var choices = [
    '1 (Strongly Disagree)',
    '2',
    '3',
    '4',
    '5 (Strongly Agree)'
];

$(document).ready(function () {
    var questionDiv = $('#questions');
    var i = 0;

    questions.forEach(function (question) {
        i++;

        var item = $('<div class="question">');
        var headline = $('<h4>').text('Question ' + i);
        var questionText = $('<p>').text(question);
        var dropDown = $('<div class="form-group">');
        var select = $('<select class="form-control selector">');

        choices.forEach(function (choice) {
            var option = $('<option>').text(choice);
            select.append(option);
        });
        select.attr('id', 'select' + i);

        dropDown.append(select);
        item.append(headline, questionText, dropDown);
        var br = $('<br>');
        questionDiv.append(item, br);
    });


    $('#submitForm').on('click', function (event) {

        event.preventDefault();


        var userName = $('#name').val();
        var photoLink = $('#photoLink').val();
        console.log("name " + userName + " url " + photoLink);

        if (userName.length > 0 && photoLink.length > 0) {
            var answers = [];


            Object.keys($('.selector')).forEach(function (key) {
                if (answers.length < questions.length) {

                    answers.push($('.selector')[key].value.charAt(0));
                }
            });


            var userInput = {
                name: userName,
                photo: photoLink,
                answers: answers
            };


            $.post('/api/friends', userInput, function (data) {

                if (data) {

                    $('#modalContent').empty();
                    $('#name').val('');
                    $('#photoLink').val('');


                    data.forEach(function (profile) {
                        var profileDiv = $('<div class="profile">');
                        var name = profile.name;
                        var photoURL = profile.photo;

                        var nameHeader = $('<h3>').text(name);

                        var photo = $('<img>').attr('src', photoURL);
                        profileDiv.append(nameHeader, photo);


                        $('#modalContent').append(profileDiv);
                    });

                    if (data.length > 1) {

                        $('.modal-title').text('Your best matches!');
                    } else {

                        $('.modal-title').text('Your best match!');
                    };


                    $('#matchModal').modal();
                }
            });

        } else {
            $('#errorModal').modal();

            setTimeout(function () {
                $('#errorModal').modal('hide');
            }, 2000);
        }
    });
});