function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formInputUrl = document.getElementById('url').value
    let formInputText = document.getElementById('text').value

    if (formInputUrl && formInputText) {
        alert('Please fill one field only!');
        return;
    }
    if (formInputUrl.replace(/\s/g, "") == "" && formInputText.replace(/\s/g, "") == "") {
        alert('please fill at least one field!');
        return;
    }
    if (formInputUrl) {
        if (!Client.checkUrl(formInputUrl)) {
            alert('Invalid url!');
            return;
        }
    }
    document.querySelector('.loader').style.display = 'block';
    fetch('http://localhost:8081/sentiment', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formInputUrl, text: formInputText }),
    })
        .then(res => res.json())
        .then(function (res) {
            
            let results = document.getElementById('results');
            results.innerHTML = '';
            for (var i in res.data) {
                results.innerHTML += '<br>' + i +  ': ' + res.data[i];
            }
            
            document.querySelector('.loader').style.display = 'none';
        })
}

export { handleSubmit }