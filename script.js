document.getElementById('image1').addEventListener('click', function() {
    checkAnswer('image1');
});

document.getElementById('image2').addEventListener('click', function() {
    checkAnswer('image2');
});

function checkAnswer(selectedImage) {
    const correctImage = 'image1'; // Change to the id of the correct image

    if (selectedImage === correctImage) {
        document.getElementById('result').innerText = 'Correct!';
        document.getElementById('result').style.color = '#2ecc71';
    } else {
        document.getElementById('result').innerText = 'Wrong!';
        document.getElementById('result').style.color = '#e74c3c';
    }
}
