module.exports = {
    baseUrl : "http://localhost:3000/",
    
    browsers: {
        defaultChrome: {
            automationProtocol: "devtools",

            desiredCapabilities: {
                browserName: "chrome",
            },
            windowSize: "1280x2000"
        },
        hamburgerChrome: {
            automationProtocol: "devtools",

            desiredCapabilities: {
                browserName: "chrome",
            },
            windowSize: "575x1000"
        },

        noHamburgerChrome: {
            automationProtocol: "devtools",

            desiredCapabilities: {
                browserName: "chrome",
            },
            windowSize: "576x1000"
        },

        adaptiveChrome1: {
            automationProtocol: "devtools",

            desiredCapabilities: {
                browserName: "chrome",
            },
            windowSize: "400x2000"
        },

        adaptiveChrome2: {
            automationProtocol: "devtools",

            desiredCapabilities: {
                browserName: "chrome",
            },
            windowSize: "1024x2000"
        },

        adaptiveChrome3: {
            automationProtocol: "devtools",

            desiredCapabilities: {
                browserName: "chrome",
            },
            windowSize: "1366x2000"
        },

        adaptiveChrome4: {
            automationProtocol: "devtools",

            desiredCapabilities: {
                browserName: "chrome",
            },
            windowSize: "1920x2000"
        },
    },

    plugins: {
        "html-reporter/hermione": {
            path: "hermione-html-report",
        },
    },
}