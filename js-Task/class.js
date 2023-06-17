// MainClass
class MyClass {
    constructor() {
        this.text = '';
        this.onresult = null;

        this.accessToken = null;
        this.refreshToken = null;
        this.tokenExpiration = null;

        this.audioUrl = 'https://enagramm.com/API/TTS/SynthesizeTextAudioPath';
        this.getTokenUrl = 'https://enagramm.com/API/Account/Login'
        this.refreshTokenUrl = 'https://enagramm.com/API/Account/RefreshToken'
    }

    // determine index by punctuation Mark priorities
    subText(text, startIndex, lastIndex) {
        const punctuationMarks = ['.', '!', '?', ';', ',', ' '];

        let subText = text.substring(startIndex, lastIndex)
        for (let i = 0; i < punctuationMarks.length; i++) {
            let mark = punctuationMarks[i]
            if (subText.includes(mark)) {
                let middleIndex = subText.indexOf(mark)
                return middleIndex
            }
        }
    }
    async _refreshToken() {
        try {
            const response = await fetch(
                this.refreshTokenUrl,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        AccessToken: this.accessToken,
                        RefreshToken: this.refreshToken,
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                this.accessToken = data.AccessToken;
                this.refreshToken = data.RefreshToken;

            } else {
                throw new Error("Failed to refresh tokens");
            }
        } catch (error) {
            throw new Error("Failed to refresh tokens");
        }
    }
    async _getToken() {
        try {
            const response = await fetch(this.getTokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: 'levan.lashauri1@gmail.com',
                    Password: 'Demo_1234'
                })
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('Failed to retrieve token');
            }
        } catch (error) {
            throw new Error('Failed to retrieve token');
        }
    }
    async _setTokensInfo() {
        const token = await this._getToken();
        this.accessToken = token.AccessToken;
        this.refreshToken = token.RefreshToken;
        this.tokenExpiration = Date.now() + 30 * 60 * 1000;
    }
    // check token experation data
    async _checkTokenExpiration() {
        if (this.accessToken && Date.now() >= this.tokenExpiration) {
            if (!this.refreshToken) {
                console.error("Access token has expired and no refresh token available");
                return;
            }

            try {
                await this._refreshToken()
            } catch (error) {
                console.error("Token refresh error:", error.message);
            }
        }
    }

    // audio url request
    async _sendRequest(text, audioUrls) {
        await this._checkTokenExpiration()
        const model = {
            Language: 'en',
            Text: text,
            Voice: 0,
            IterationCount: audioUrls.length + 1
        };
        try {
            const response = await fetch(this.audioUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                },
                body: JSON.stringify(model)
            });
            if (response.ok) {
                const data = await response.json();
                const sourceUrl = data.AudioFilePath;
                audioUrls.push(sourceUrl);

                this.onresult({ sourceUrl }); // to showcase sources after every request
            } else {
                console.error('Server request error:', response.status);
            }
        } catch (error) {
            console.error('Server request error:', error.message);
        }
    }
    async start() {
        try {

            await this._setTokensInfo()
            const upperBound = 230;
            const lowerBound = 150
            const audioUrls = []; // Array to store the audio URLs
            let startIndex = 0;
            let splitIndex = 0
            let currentSubText = '' // current version of text after cuting initial one 
            while (true) {

                if (this.text.length <= lowerBound) {
                    await this._sendRequest(this.text, audioUrls)
                    break;

                }
                else if (this.text.length > lowerBound && this.text.length < upperBound) {
                    splitIndex = this.subText(this.text, lowerBound, this.text.length)

                }
                else {
                    splitIndex = this.subText(this.text, lowerBound, upperBound)
                }

                currentSubText = this.text.substring(startIndex, startIndex + lowerBound + splitIndex)
                this.text = this.text.substring(startIndex + lowerBound + splitIndex + 1)

                await this._sendRequest(currentSubText, audioUrls)


            }

            // if (this.onresult) {
            //     this.onresult({ audioUrls });
            // }

        } catch (error) {
            console.error('Token retrieval error:', error.message);
        }
    }
}

// Example usage
const cl = new MyClass();
cl.text = 'The wind whispers enchanting melodies, rustling leaves in harmonious rhythm. Imagination takes flight, soaring high on the wings of creativity, exploring uncharted realms of possibility. Time dances gracefully, weaving together the threads of precious moments. Embrace the unfolding adventure, for every step holds the promise of new discoveries. Follow the guidance of your heart, and let your spirit radiate with boundless light.';
cl.onresult = function (result) {
    var MyResult = result.sourceUrl;
    console.log(MyResult)
}
cl.start();
